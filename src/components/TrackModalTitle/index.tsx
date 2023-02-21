import type { ITrack } from "@global/types";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import Cover from "@components/Cover";
import ButtonIcon from "@components/ButtonIcon";
import css from "./index.module.css";

interface IProps {
  track: ITrack;
  toggleOpen: () => void;
}

export default function TrackModalTitle({ track, toggleOpen }: IProps) {
  return (
    <div className={css.Track}>
      <Cover cover={track.cover} size={"50px"} />

      <div className={css.Data}>
        <p>{track.title}</p>
        <p>{track.artist}</p>
      </div>

      <ButtonIcon onClick={toggleOpen} aria-label="close modal">
        <Icon icon={faXmark} size={"xl"} />
      </ButtonIcon>
    </div>
  );
}
