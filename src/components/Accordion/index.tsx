import type { FC, ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  summary: string;
}

export const Accordion: FC<IProps> = ({ children, summary }) => {
  return (
    <details className={style.Container}>
      <summary>
        <span>{summary}</span>
        <FontAwesomeIcon className={style.Arrow} icon={faChevronDown} size="sm" />
      </summary>

      <div className={style.Content}>{children}</div>
    </details>
  );
};
