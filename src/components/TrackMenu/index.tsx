import type { FC } from "react";
import type { ITrack } from "@global/types";

import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, ButtonText, Cover, UserPlaylists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isAuthor?: boolean;
  track: ITrack | null;
  toggleOpen: () => void;
}

export const TrackMenu: FC<IProps> = ({ isAuthor, track, toggleOpen }) => {
  const { status } = useSession();

  const handleLogIn = () => signIn("google");
  const handleAddToPlaylist = () => track;

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

      <div className={style.Playlists} tabIndex={-1}>
        {status === "authenticated" ? (
          <UserPlaylists onAdd={handleAddToPlaylist} />
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
        <ButtonText onClick={() => {}} align="center">
          Play
        </ButtonText>
        <ButtonText onClick={() => {}} align="center">
          Queue
        </ButtonText>
        {isAuthor && (
          <ButtonText onClick={() => {}} align="center">
            Delete
          </ButtonText>
        )}
      </div>
    </div>
  );
};
