import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "@context/AudioPlayer";
import type { FC } from "react";
import type { ITrack } from "@global/types";
import { Cover } from "@components/index";
import style from "./index.module.css";

interface IProps {
  track: ITrack;
}

export const Track: FC<IProps> = ({ track }) => {
  const { setPlaylist } = useAudioPlayer();

  const handlePlay = () => setPlaylist([track]);

  return (
    <div className={style.Container}>
      <Cover colors={[]} cover={track.cover} />

      <button className={style.Button} aria-label="Play" onClick={handlePlay}>
        <FontAwesomeIcon icon={faPlay} transform="right-1" />
      </button>

      <div className={style.Data}>
        <p className={style.Title}>{track.title}</p>
        <p className={style.Artist}>{track.artist}</p>
      </div>

      <div className={style.Metadata}>
        <p>{track.genres.join(", ")}</p>
        <p>{track.date}</p>
        <p className={style.Length}>{track.length}</p>
      </div>

      <button className={style.Menu} aria-label="Track menu">
        <FontAwesomeIcon icon={faEllipsisVertical} size="xl" fixedWidth />
      </button>
    </div>
  );
};
