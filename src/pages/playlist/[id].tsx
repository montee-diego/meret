import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

import { useRef } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@context/User";
import { useModal } from "@hooks/useModal";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";
import { ButtonIcon, ConfirmDialog, Modal, TrackList } from "@components/index";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  const router = useRouter();
  const renInput = useRef<HTMLInputElement | null>(null);
  const { playlists } = useUser();
  const [delModal, toggleDelModal] = useModal();
  const [renModal, toggleRenModal] = useModal();

  const handleDelete = async () => {
    const status = await playlists.delete(playlist._id);

    if (status === "success") {
      router.replace("/");
    }
  };

  const handleRename = async () => {
    if (
      !renInput.current ||
      renInput.current.value === "" ||
      renInput.current.value === playlist.name
    ) {
      return;
    }

    const status = await playlists.rename(playlist._id, `${renInput.current?.value}`);

    if (status === "success") {
      router.replace(router.asPath, "", {
        scroll: false,
      });
    }
  };

  return (
    <section>
      <div>
        <p>{playlist.name}</p>

        <ButtonIcon onClick={toggleRenModal} label="rename playlist">
          <FontAwesomeIcon icon={faPen} size="xl" />
        </ButtonIcon>

        <ButtonIcon onClick={toggleDelModal} label="delete playlist">
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </ButtonIcon>
      </div>

      <TrackList tracks={playlist.tracks} />

      {delModal && (
        <Modal toggleOpen={toggleDelModal}>
          <ConfirmDialog onConfirm={handleDelete} onCancel={toggleDelModal} title="Delete Playlist">
            <p>
              Are you sure you want to delete playlist "<strong>{playlist.name}</strong>"? This
              action cannot be undone.
            </p>
          </ConfirmDialog>
        </Modal>
      )}

      {renModal && (
        <Modal toggleOpen={toggleRenModal}>
          <ConfirmDialog onConfirm={handleRename} onCancel={toggleRenModal} title="Rename Playlist">
            <>
              <p>Enter a new name for this playlist</p>
              <input type="text" defaultValue={playlist.name} ref={renInput} />
            </>
          </ConfirmDialog>
        </Modal>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await sanityClient.fetch(queryPlaylist(id));

  if (!response.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      playlist: response[0],
    },
  };
};
