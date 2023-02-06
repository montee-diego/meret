import type { FC } from "react";
import type { ITrack } from "@global/types";

import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@context/User";
import { ButtonIcon, ButtonText, Cover, UserPlaylists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isAuthor?: boolean;
  track: ITrack | null;
  toggleOpen: () => void;
}

export const TrackMenu: FC<IProps> = ({ isAuthor, track, toggleOpen }) => {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);
  const { status } = useSession();
  const { playlists } = useUser();
  const router = useRouter();

  const toggleConfirm = () => setIsConfirm(!isConfirm);
  const handleLogIn = () => signIn("google");
  const handleAddToPlaylist = () => track;

  async function handleDelete() {
    const pid = router.query.id as string;
    const key = `${track?._key}`;
    const response = await playlists.removeItem(pid, key);

    if (response === "success") {
      console.log("Removed OK");
      router.replace(router.asPath, "", {
        scroll: false,
      });
    }
  }

  return (
    <div className={style.Container}>
      <div className={style.Track}>
        <Cover cover={`${track?.cover}`} size={"50px"} />

        <div className={style.Data}>
          <p>{track?.title}</p>
          <p>{track?.artist}</p>
        </div>

        <ButtonIcon onClick={toggleOpen} label="close modal">
          <FontAwesomeIcon icon={faXmark} size={"xl"} />
        </ButtonIcon>
      </div>

      {isAuthor && (
        <div className={style.Delete}>
          <ButtonText onClick={() => setIsConfirm(true)} align="left">
            Delete from Playlist
          </ButtonText>
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
            <UserPlaylists onAdd={handleAddToPlaylist} />
          )
        ) : (
          <div className={style.LogIn}>
            <div className={style.LogInBtn}>
              <ButtonText onClick={handleLogIn} align="center">
                Log In to edit Playlists
              </ButtonText>
            </div>
          </div>
        )}
      </div>

      <div className={style.QuickActions}>
        {isConfirm ? (
          <>
            <ButtonText onClick={handleDelete} align="center">
              Confirm
            </ButtonText>
            <ButtonText onClick={toggleConfirm} align="center">
              Cancel
            </ButtonText>
          </>
        ) : (
          <>
            <ButtonText onClick={() => {}} align="center">
              Play
            </ButtonText>
            <ButtonText onClick={() => {}} align="center">
              Queue
            </ButtonText>
          </>
        )}
      </div>
    </div>
  );
};
