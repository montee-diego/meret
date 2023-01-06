import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@context/User";
import { useModal } from "@hooks/useModal";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";
import { ButtonIcon, ConfirmDialog, Modal } from "@components/index";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  const router = useRouter();
  const { playlists } = useUser();
  const { isOpen, toggleOpen } = useModal();

  const handleDelete = async () => {
    const status = await playlists.delete(playlist._id);

    if (status === "success") {
      router.replace("/");
    }
  };

  return (
    <section>
      <p>{playlist.name}</p>
      <ButtonIcon onClick={toggleOpen} label="delete playlist">
        <FontAwesomeIcon icon={faTrash} size="xl" />
      </ButtonIcon>

      {isOpen && (
        <Modal toggleOpen={toggleOpen}>
          <ConfirmDialog onConfirm={handleDelete} onCancel={toggleOpen}>
            Are you sure you want to delete playlist "{playlist.name}"? This action cannot be
            undone.
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
