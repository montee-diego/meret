import type { FocusEvent, SyntheticEvent } from "react";
import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

// SSR
import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";

// CSR
import { useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@context/User";
import { useModal } from "@hooks/useModal";
import { ButtonIcon, ButtonText, ConfirmDialog, Menu, Modal, TrackList } from "@components/index";
import { formatDate } from "@global/utils";
import Image from "next/image";
import style from "@styles/playlist.module.css";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  const { status } = useSession();
  const { playlists } = useUser();
  const [delModal, toggleDelModal] = useModal();
  const [renModal, toggleRenModal] = useModal();
  const [subModal, toggleSubModal] = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const input = useRef<HTMLInputElement | null>(null);

  const handleUserMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogIn = () => signIn("google");
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(":focus-within")) {
      setIsMenuOpen(false);
    }
  };

  async function handleDelete({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await playlists.delete(playlist._id, true);

    if (response === "OK") {
      toggleDelModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  async function handleRename({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    const name = input.current?.value;

    if (!name || !name.length || name === playlist.name) {
      return;
    }

    currentTarget.disabled = true;
    const response = await playlists.rename(playlist._id, name);

    if (response === "OK") {
      toggleRenModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  async function handleSub({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await playlists.subscribe(playlist._id);

    if (response === "OK") {
      toggleSubModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  async function handleUnsub({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await playlists.unsubscribe(playlist._id);

    if (response === "OK") {
      toggleSubModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  return (
    <section data-scroll="false">
      <div className={style.Container}>
        <div className={style.Title} onBlur={handleFocus}>
          <ButtonIcon onClick={handleUserMenu} label="rename playlist">
            <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
          </ButtonIcon>
          <h2>{playlist.name}</h2>

          <Menu align="left" isOpen={isMenuOpen}>
            {status === "authenticated" ? (
              playlist.user?.isAuthor ? (
                <div>
                  <ButtonText onClick={toggleRenModal} align="left">
                    Rename
                  </ButtonText>
                  <ButtonText onClick={toggleDelModal} align="left">
                    Delete
                  </ButtonText>
                </div>
              ) : (
                <div>
                  <ButtonText onClick={toggleSubModal} align="left">
                    {playlist.user?.isSub ? "Unsubscribe" : "Subscribe"}
                  </ButtonText>
                </div>
              )
            ) : (
              <div>
                <ButtonText onClick={handleLogIn} align="left">
                  Log In
                </ButtonText>
              </div>
            )}
          </Menu>
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

      <TrackList scroll="true" tracks={playlist.tracks} isAuthor={playlist.user?.isAuthor} />

      {delModal && (
        <Modal toggleOpen={toggleDelModal}>
          <ConfirmDialog onConfirm={handleDelete} onCancel={toggleDelModal} title="Delete Playlist">
            <p>
              Are you sure you want to delete playlist "<b>{playlist.name}</b>"? This action cannot
              be undone.
            </p>
          </ConfirmDialog>
        </Modal>
      )}

      {renModal && (
        <Modal toggleOpen={toggleRenModal}>
          <ConfirmDialog onConfirm={handleRename} onCancel={toggleRenModal} title="Rename Playlist">
            <>
              <p>Enter a new name for this playlist</p>
              <input type="text" defaultValue={playlist.name} ref={input} />
            </>
          </ConfirmDialog>
        </Modal>
      )}

      {subModal && (
        <Modal toggleOpen={toggleSubModal}>
          {playlist.user?.isSub ? (
            <ConfirmDialog onConfirm={handleUnsub} onCancel={toggleSubModal} title="Unsubscribe">
              <p>
                Are you sure you want to unsubscribe from playlist "<b>{playlist.name}</b>
                "? You can always subscribe again later.
              </p>
            </ConfirmDialog>
          ) : (
            <ConfirmDialog onConfirm={handleSub} onCancel={toggleSubModal} title="Subscribe">
              <p>
                Are you sure you want to subscribe to playlist "<b>{playlist.name}</b>"? It will be
                added to your profile.
              </p>
            </ConfirmDialog>
          )}
        </Modal>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { pid } = query;
  const token = await getToken({ req });
  const response = await sanityClient.fetch(queryPlaylist(), {
    id: pid || "",
    user: token?.id || "",
  });

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      playlist: response,
    },
  };
};
