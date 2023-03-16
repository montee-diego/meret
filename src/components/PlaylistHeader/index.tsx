import type { MouseEvent } from "react";
import type { IPlaylist } from "@global/types";
import { Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import { formatDate, formatTrackCount } from "@utils/display";
import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import DeletePlaylist from "@components/Dialog/DeletePlaylist";
import Login from "@components/Dialog/Login";
import RenamePlaylist from "@components/Dialog/RenamePlaylist";
import SubscribePlaylist from "@components/Dialog/SubscribePlaylist";
import Style from "./index.module.css";

interface IProps {
  playlist: IPlaylist;
}

export default function PlaylistHeader({ playlist }: IProps) {
  const [toggleMenu, PlaylistMenu] = useMenu();
  const [openLogin, closeLogin, LoginModal] = useModal();
  const [openRename, closeRename, RenameModal] = useModal();
  const [openDelete, closeDelete, DeleteModal] = useModal();
  const [openSubscribe, closeSubscribe, SubscribeModal] = useModal();

  const { status } = useSession();
  const { _id, _updatedAt, author, name, user, total } = playlist;

  function handleMenu(e: MouseEvent<HTMLButtonElement>) {
    if (status === "authenticated") {
      toggleMenu(e);
    } else {
      openLogin();
    }
  }

  useEffect(() => {
    const menuBtn = document.querySelector("#pls-menu");

    if (menuBtn instanceof HTMLButtonElement) {
      menuBtn.disabled = false;
    }
  }, [playlist]);

  return (
    <Fragment>
      <div className={Style.Container}>
        <div className={Style.Title}>
          <h2>{name}</h2>
          <ButtonIcon id="pls-menu" onClick={handleMenu} aria-label="playlist menu">
            <Icon icon={faEllipsisVertical} size="xl" />
          </ButtonIcon>

          <PlaylistMenu>
            {user.isAuthor ? (
              <div>
                <Button onClick={openRename} align="left">
                  Rename
                </Button>
                <Button onClick={openDelete} align="left">
                  Delete
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={openSubscribe} align="left">
                  {user.isSub ? "Unsubscribe" : "Subscribe"}
                </Button>
              </div>
            )}
          </PlaylistMenu>
        </div>

        <div className={Style.Subtitle}>
          <div className={Style.Author}>
            <div className={Style.Image}>
              <Image src={author.image} alt="U" sizes="64px" fill />
            </div>
            <p>{author.name}</p>
          </div>

          <div className={Style.Total}>
            <p>{formatTrackCount(total)}</p>
          </div>

          <div className={Style.Updated}>
            <p>Updated: {formatDate(_updatedAt)}</p>
          </div>
        </div>
      </div>

      <LoginModal>
        <Login closeDialog={closeLogin} />
      </LoginModal>

      <RenameModal>
        <RenamePlaylist data={{ _id, name }} closeDialog={closeRename} />
      </RenameModal>

      <DeleteModal>
        <DeletePlaylist data={{ _id, name }} closeDialog={closeDelete} />
      </DeleteModal>

      <SubscribeModal>
        <SubscribePlaylist data={{ _id, name, user }} closeDialog={closeSubscribe} />
      </SubscribeModal>
    </Fragment>
  );
}
