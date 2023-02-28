import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";

import Style from "./index.module.css";

interface IProps {
  controls: {
    Play: () => void;
    Prev: () => void;
    Next: () => void;
  };
  isPlaying: boolean;
}

export default function AudioControls({ controls, isPlaying }: IProps) {
  const { Prev, Play, Next } = controls;

  return (
    <div className={Style.Container}>
      <button className={Style.Button} onClick={Prev} aria-label="previous">
        <Icon size="2x" icon={faBackwardStep} fixedWidth />
      </button>

      <button className={Style.Button} onClick={Play} aria-label="play/pause">
        <Icon size="3x" icon={isPlaying ? faCirclePause : faCirclePlay} />
      </button>

      <button className={Style.Button} onClick={Next} aria-label="next">
        <Icon size="2x" icon={faForwardStep} fixedWidth />
      </button>
    </div>
  );
}
