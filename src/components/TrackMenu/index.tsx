import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, Cover } from "@components/index";
import type { Dispatch, FC, SetStateAction } from "react";
import type { ITrack } from "@global/types";
import style from "./index.module.css";

interface IProps {
  content: ITrack | null;
  setContent: Dispatch<SetStateAction<ITrack | null>>;
}

export const TrackMenu: FC<IProps> = ({ content, setContent }) => {
  const handleClose = () => setContent(null);

  return (
    <div className={style.Container}>
      <div className={style.Track}>
        <Cover cover={`${content?.cover}`} size={"50px"} />

        <div className={style.Data}>
          <p>{content?.title}</p>
          <p>{content?.artist}</p>
        </div>

        <ButtonIcon onClick={handleClose} label={"close modal"}>
          <FontAwesomeIcon icon={faXmark} size={"xl"} />
        </ButtonIcon>
      </div>
      <p>Action 1</p>

      <a href="#">Action 2</a>
      <a href="#">Action 3</a>
    </div>
  );
};
