import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faCirclePlay,
  faCirclePause,
} from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
import style from "./index.module.css";

interface IProps {
  handleControls: {
    Play: () => void;
    Prev: () => void;
    Next: () => void;
  };
  isPlaying: boolean;
}

export const AudioControls: FC<IProps> = ({ handleControls, isPlaying }) => {
  return (
    <div className={style.Container}>
      <button className={style.Button} onClick={handleControls.Prev} aria-label="Previous">
        <FontAwesomeIcon size="2x" icon={faBackwardStep} fixedWidth />
      </button>

      <button className={style.Button} onClick={handleControls.Play} aria-label="Play/Pause">
        <FontAwesomeIcon size="3x" icon={isPlaying ? faCirclePause : faCirclePlay} />
      </button>

      <button className={style.Button} onClick={handleControls.Next} aria-label="Next">
        <FontAwesomeIcon size="2x" icon={faForwardStep} fixedWidth />
      </button>
    </div>
  );
};
