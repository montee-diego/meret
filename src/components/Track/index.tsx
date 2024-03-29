import type { MouseEvent } from "react";
import type { ISelected } from "@global/types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { formatTime } from "@utils/display";
import ButtonIcon from "@components/ButtonIcon";
import Cover from "@components/Cover";
import Style from "./index.module.css";

interface IProps {
  data: ISelected;
  menu: (e: MouseEvent<HTMLButtonElement>, track: ISelected) => void;
  play: (data: ISelected) => void;
}

export default function Track({ data, play, menu }: IProps) {
  const { track } = data;

  return (
    <fieldset data-key={track._key}>
      <div className={Style.Container}>
        <Cover cover={track.cover} size="3rem" />

        <ButtonIcon onClick={() => play(data)} aria-label="play">
          <Icon size="lg" icon={faPlay} transform="right-1 up-0.5" />
        </ButtonIcon>

        <div className={Style.Data}>
          <p>{track.title}</p>
          <p>{track.artist}</p>
        </div>

        <div className={Style.Metadata}>
          <p>{track.genre}</p>
          <p>{track.date}</p>
          <p className={Style.Length}>{formatTime(track.length)}</p>
        </div>

        <ButtonIcon onClick={(e) => menu(e, data)} aria-label="track menu">
          <Icon size="xl" icon={faEllipsisVertical} />
        </ButtonIcon>
      </div>
    </fieldset>
  );
}
