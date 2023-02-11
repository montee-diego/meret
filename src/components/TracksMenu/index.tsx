import type { FC } from "react";
import type { Selected } from "../Tracks";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import { Button, ButtonLink, Cover, PlaylistsMenu } from "@components/index";
import style from "./index.module.css";

interface IProps {
  handlePlay: (data: Selected) => void;
  isAuthor?: boolean;
  selected: Selected;
  toggleOpen: () => void;
}

export const TracksMenu: FC<IProps> = ({ handlePlay, isAuthor, selected, toggleOpen }) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { status } = useSession();
  const { data, meret } = useMeret();
  const { player } = useAudioPlayer();
  const { track } = selected;
  const router = useRouter();

  const toggleConfirm = () => setIsConfirm(!isConfirm);
  const handleLogIn = () => signIn("google");

  async function handleDelete() {
    const response = await meret.deleteItem(track?._key);
    const pid = router.query.pid;

    if (response === "OK") {
      player.syncPlaylist(typeof pid === "string" ? pid : "", selected.index);
    }

    toggleOpen();
  }

  return (
    <div className={style.Container}>
      <div className={style.Track}>
        <Cover cover={`${track.cover}`} size={"50px"} />

        <div className={style.Data}>
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>

        <Button onClick={toggleOpen} label="close modal">
          <FontAwesomeIcon icon={faXmark} size={"xl"} />
        </Button>
      </div>

      {isAuthor && (
        <div className={style.Delete}>
          <ButtonLink onClick={() => setIsConfirm(true)} align="left">
            Delete from Playlist
          </ButtonLink>
        </div>
      )}

      <div className={style.Playlists} tabIndex={-1} data-collapse={isConfirm}>
        {status === "authenticated" ? (
          isConfirm ? (
            <p className={style.DeleteMsg}>
              Are you sure you want to delete the currently selected track? This action cannot be
              undone.
            </p>
          ) : (
            <PlaylistsMenu playlists={data.playlists} getTrackId={() => track._id} showInput />
          )
        ) : (
          <div className={style.LogIn}>
            <div className={style.LogInBtn}>
              <ButtonLink onClick={handleLogIn} align="center">
                Log In to edit Playlists
              </ButtonLink>
            </div>
          </div>
        )}
      </div>

      <div className={style.QuickActions}>
        {isConfirm ? (
          <>
            <ButtonLink onClick={handleDelete} align="center">
              Confirm
            </ButtonLink>
            <ButtonLink onClick={toggleConfirm} align="center">
              Cancel
            </ButtonLink>
          </>
        ) : (
          <>
            <ButtonLink onClick={() => handlePlay(selected)} align="center">
              Play
            </ButtonLink>
            <ButtonLink onClick={() => {}} align="center">
              Queue
            </ButtonLink>
          </>
        )}
      </div>
    </div>
  );
};
