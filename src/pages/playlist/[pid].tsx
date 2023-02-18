import type { SyntheticEvent } from "react";
import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

// SSR
import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";

// CSR
import { useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useMeret } from "@context/Meret";
import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import { formatDate, formatTrackCount } from "@global/utils";
import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import ConfirmDialog from "@components/ConfirmDialog";
import Image from "next/image";

import style from "@styles/playlist.module.css";

import Playlist from "@components/Playlist";
import ModalTitle from "@components/ModalTitle";

interface IProps {
  playlist: IPlaylist;
}

export default function PlaylistPage({ playlist }: IProps) {
  const { status } = useSession();
  const { meret } = useMeret();
  const [toggleDelModal, DeleteModal] = useModal();
  const [toggleRenModal, RenameModal] = useModal();
  const [toggleSubModal, SubscriptionModal] = useModal();
  const [togglePlaylistMenu, PlaylistMenu] = useMenu();
  const input = useRef<HTMLInputElement | null>(null);

  const handleLogIn = () => signIn("google");

  async function handleDelete({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await meret.delete(playlist._id, true);

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
    const response = await meret.rename(playlist._id, name);

    if (response === "OK") {
      toggleRenModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  async function handleSub({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await meret.subscribe(playlist._id);

    if (response === "OK") {
      toggleSubModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  async function handleUnsub({ currentTarget }: SyntheticEvent<HTMLButtonElement>) {
    currentTarget.disabled = true;
    const response = await meret.unsubscribe(playlist._id);

    if (response === "OK") {
      toggleSubModal();
    } else {
      currentTarget.disabled = false;
    }
  }

  return (
    <section data-scroll="false">
      <div className={style.Container}>
        <div className={style.Title}>
          <ButtonIcon onClick={togglePlaylistMenu} aria-label="playlist menu">
            <Icon icon={faEllipsisVertical} size="xl" />
          </ButtonIcon>
          <h2>{playlist.name}</h2>

          <PlaylistMenu align="left">
            {status === "authenticated" ? (
              playlist.user?.isAuthor ? (
                <>
                  <Button onClick={toggleRenModal} align="left">
                    Rename
                  </Button>
                  <Button onClick={toggleDelModal} align="left">
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={toggleSubModal} align="left">
                    {playlist.user?.isSub ? "Unsubscribe" : "Subscribe"}
                  </Button>
                </>
              )
            ) : (
              <>
                <Button onClick={handleLogIn} align="left">
                  Log In
                </Button>
              </>
            )}
          </PlaylistMenu>
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
            <p>{formatTrackCount(playlist.total)}</p>
          </div>

          <div className={style.Updated}>
            <p>Updated: {formatDate(playlist._updatedAt)}</p>
          </div>
        </div>
      </div>

      <Playlist playlist={playlist} />
      {/* <List scroll="true" view="list">
        <Tracks playlist={playlist} />
      </List> */}

      {/* DeleteModal is the way it should be done for all the modals */}
      <DeleteModal>
        <ModalTitle title="Delete Playlist" toggleOpen={toggleDelModal} />
        <ConfirmDialog onConfirm={handleDelete} onCancel={toggleDelModal}>
          <p>
            Are you sure you want to delete playlist "<b>{playlist.name}</b>"? This action cannot be
            undone.
          </p>
        </ConfirmDialog>
      </DeleteModal>

      <RenameModal>
        <ModalTitle title="Rename Playlist" toggleOpen={toggleRenModal} />
        <ConfirmDialog onConfirm={handleRename} onCancel={toggleRenModal}>
          <>
            <p>Enter a new name for this playlist</p>
            <input type="text" defaultValue={playlist.name} ref={input} />
          </>
        </ConfirmDialog>
      </RenameModal>

      <SubscriptionModal>
        {playlist.user?.isSub ? (
          <>
            <ModalTitle title="Unsubscribe" toggleOpen={toggleSubModal} />
            <ConfirmDialog onConfirm={handleUnsub} onCancel={toggleSubModal}>
              <p>
                Are you sure you want to unsubscribe from playlist "<b>{playlist.name}</b>
                "? You can always subscribe again later.
              </p>
            </ConfirmDialog>
          </>
        ) : (
          <>
            <ModalTitle title="Subscribe" toggleOpen={toggleSubModal} />
            <ConfirmDialog onConfirm={handleSub} onCancel={toggleSubModal}>
              <p>
                Are you sure you want to subscribe to playlist "<b>{playlist.name}</b>"? It will be
                added to your profile.
              </p>
            </ConfirmDialog>
          </>
        )}
      </SubscriptionModal>
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
