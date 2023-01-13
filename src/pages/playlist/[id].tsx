import type { FocusEvent, MouseEvent } from "react";
import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@context/User";
import { useModal } from "@hooks/useModal";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";
import { ButtonIcon, ButtonText, ConfirmDialog, Modal, TrackList } from "@components/index";
import Image from "next/image";
import style from "@styles/playlist.module.css";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  const router = useRouter();
  const renInput = useRef<HTMLInputElement | null>(null);
  const { playlists } = useUser();
  const [delModal, toggleDelModal] = useModal();
  const [renModal, toggleRenModal] = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleUserMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(":focus-within")) {
      setIsMenuOpen(false);
    }
  };
  const handleMouse = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

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

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat().format(date);
  };

  return (
    <section>
      <div className={style.Container}>
        <div className={style.Title} onBlur={handleFocus}>
          <ButtonIcon onClick={handleUserMenu} label="rename playlist">
            <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
          </ButtonIcon>
          <h2>{playlist.name}</h2>

          <div className={style.Menu} onMouseDown={handleMouse} data-open={isMenuOpen}>
            <div>
              <ButtonText onClick={toggleRenModal} align="left">
                Rename
              </ButtonText>
              <ButtonText onClick={toggleDelModal} align="left">
                Delete
              </ButtonText>
            </div>
          </div>
        </div>

        <div className={style.Subtitle}>
          <span>By</span>
          <div className={style.Author}>
            <div className={style.Image}>
              <Image src={playlist.author.image} alt="U" sizes="64px" fill />
            </div>
            <p>{playlist.author.name}</p>
          </div>

          <div className={style.Total}>
            <p>{playlist.total === 1 ? `${playlist.total} Track` : `${playlist.total} Tracks`}</p>
          </div>

          <div className={style.Updated}>
            <p>Updated: {formatDate(playlist._updatedAt)}</p>
          </div>
        </div>
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
