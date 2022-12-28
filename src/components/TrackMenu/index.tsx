import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "@components/ButtonIcon";
import type { Dispatch, FC, SetStateAction } from "react";
import type { ITrack } from "@global/types";

interface IProps {
  content: ITrack | null;
  setContent: Dispatch<SetStateAction<ITrack | null>>;
}

export const TrackMenu: FC<IProps> = ({ content, setContent }) => {
  const handleClose = () => setContent(null);

  return (
    <div>
      <p>trackMenu</p>
      <ButtonIcon onClick={handleClose} label={"close modal"}>
        <FontAwesomeIcon icon={faXmark} size={"xl"} />
      </ButtonIcon>
      <a href="#">link</a>
      <a href="#">link</a>
    </div>
  );
};
