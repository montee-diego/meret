import type { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import style from "./index.module.css";

export const Loading: FC = () => {
  return (
    <div className={style.Icon}>
      <FontAwesomeIcon icon={faCompactDisc} size="3x" spin />
    </div>
  );
};
