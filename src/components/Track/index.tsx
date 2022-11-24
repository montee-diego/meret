import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
import type { ITrack } from "@global/types";
import { Cover } from "@components/index";
import style from "./index.module.css";

interface IProps {
  track: ITrack;
}

export const Track: FC<IProps> = ({ track }) => {
  return (
    <div className={style.Container}>
      <Cover colors={[]} cover={track.cover} />

      <button className={style.Button} aria-label="Play">
        <FontAwesomeIcon icon={faPlay} transform="right-1" />
      </button>

      <p>{track.title}</p>
      <p>{track.artist}</p>

      {/* <button className={style.Button} aria-label="Add to playlist">
        <FontAwesomeIcon icon={faPlus} />
      </button> */}
    </div>
  );
};
