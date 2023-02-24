import type { ITrack } from "@global/types";
import { Fragment } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Cover from "@components/Cover";
import ButtonIcon from "@components/ButtonIcon";
import Style from "./index.module.css";

interface IBasics {
  closeDialog: () => void;
}

interface ITrackOnly extends IBasics {
  title?: never;
  track: ITrack;
}

interface ITitleOnly extends IBasics {
  title: string;
  track?: never;
}

export default function DialogTitle({ title, track, closeDialog }: ITrackOnly | ITitleOnly) {
  return (
    <div className={Style.Container}>
      {track && (
        <Fragment>
          <Cover cover={track.cover} size={"50px"} />

          <div className={Style.Title}>
            <p>{track.title}</p>
            <p>{track.artist}</p>
          </div>
        </Fragment>
      )}

      {title && (
        <div className={Style.Title}>
          <h3>{title}</h3>
        </div>
      )}

      <ButtonIcon onClick={closeDialog} aria-label="close modal">
        <Icon icon={faXmark} size={"xl"} />
      </ButtonIcon>
    </div>
  );
}
