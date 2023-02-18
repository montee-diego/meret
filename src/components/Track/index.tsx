import type { MouseEvent } from "react";
import type { IPlaylistTrack, ISelected, ITrack } from "@global/types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "@global/utils";
import ButtonIcon from "@components/ButtonIcon";
import Cover from "@components/Cover";
import css from "./index.module.css";

interface IProps {
  index: number;
  onPlay: (data: ISelected) => void;
  onMenu: (e: MouseEvent<HTMLButtonElement>, track: ISelected) => void;
  track: IPlaylistTrack | ITrack;
}

export default function Track({ index, onPlay, onMenu, track }: IProps) {
  return (
    <div className={css.Container}>
      <Cover cover={track.cover} size="3rem" />

      <ButtonIcon onClick={() => onPlay({ track, index })} aria-label="play">
        <Icon size="lg" icon={faPlay} transform="right-1 up-0.5" />
      </ButtonIcon>

      <div className={css.Data}>
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>

      <div className={css.Metadata}>
        <p>{track.genres.join(", ")}</p>
        <p>{track.date}</p>
        <p className={css.Length}>{formatTime(track.length)}</p>
      </div>

      <ButtonIcon onClick={(e) => onMenu(e, { track, index })} aria-label="track menu">
        <Icon size="xl" icon={faEllipsisVertical} />
      </ButtonIcon>
    </div>
  );
}
