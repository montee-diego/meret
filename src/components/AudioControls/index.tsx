import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
import style from "./index.module.css";

export const AudioControls: FC = () => {
  return (
    <div className={style.Container}>
      <button className={style.Button}>
        <FontAwesomeIcon size="2x" icon={faBackwardStep} />
      </button>
      <button className={style.Button}>
        <FontAwesomeIcon size="2x" icon={faPlay} />
      </button>
      <button className={style.Button}>
        <FontAwesomeIcon size="2x" icon={faForwardStep} />
      </button>
    </div>
  );
};
