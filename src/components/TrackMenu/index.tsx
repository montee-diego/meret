import type { FC } from "react";
import type { ITrack } from "@global/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, Cover, UserPlaylists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  track: ITrack | null;
  toggleOpen: () => void;
}

export const TrackMenu: FC<IProps> = ({ track, toggleOpen }) => {
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

      <div className={style.Actions}>
        <p>Action 1</p>

        <a href="#">Action 2</a>
        <a href="#">Action 3</a>
        <UserPlaylists />
      </div>
    </div>
  );
};
