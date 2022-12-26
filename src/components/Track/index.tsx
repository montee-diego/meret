import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "@context/AudioPlayer";
import { formatTime } from "@global/utils";
import { Cover } from "@components/index";
import type { FC } from "react";
import type { ITrack } from "@global/types";
import style from "./index.module.css";

interface IProps {
  track: ITrack;
}

export const Track: FC<IProps> = ({ track }) => {
  const { setPlaylist } = useAudioPlayer();

  const handlePlay = () => setPlaylist([track]);

  return (
    <div className={style.Container}>
      <Cover cover={track.cover} size="3rem" />

      <button className={style.Button} onClick={handlePlay} aria-label="play">
        <FontAwesomeIcon size="lg" icon={faPlay} transform="right-1 up-0.5" />
      </button>

      <div className={style.Data}>
        <p className={style.Title}>{track.title}</p>
        <p className={style.Artist}>{track.artist}</p>
      </div>

      <div className={style.Metadata}>
        <p>{track.genres.join(", ")}</p>
        <p>{track.date}</p>
        <p className={style.Length}>{formatTime(track.length)}</p>
      </div>

      <button className={style.Button} aria-label="open track menu">
        <FontAwesomeIcon size="xl" icon={faEllipsisVertical} fixedWidth />
      </button>
    </div>
  );
};
