import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";

import Style from "./index.module.css";

interface IProps {
  handleControls: {
    Play: () => void;
    Prev: () => void;
    Next: () => void;
  };
  isPlaying: boolean;
}

export default function AudioControls({ handleControls, isPlaying }: IProps) {
  return (
    <div className={Style.Container}>
      <button className={Style.Button} onClick={handleControls.Prev} aria-label="previous">
        <FontAwesomeIcon size="2x" icon={faBackwardStep} fixedWidth />
      </button>

      <button className={Style.Button} onClick={handleControls.Play} aria-label="play/pause">
        <FontAwesomeIcon size="3x" icon={isPlaying ? faCirclePause : faCirclePlay} />
      </button>

      <button className={Style.Button} onClick={handleControls.Next} aria-label="next">
        <FontAwesomeIcon size="2x" icon={faForwardStep} fixedWidth />
      </button>
    </div>
  );
}
