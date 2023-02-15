import type { ReactNode } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import css from "./index.module.css";

interface IProps {
  children: ReactNode;
  summary: string;
}

export default function Accordion({ children, summary }: IProps) {
  return (
    <details className={css.Container}>
      <summary className={css.Summary}>
        <span>{summary}</span>
        <Icon className={css.Icon} icon={faChevronDown} size="sm" />
      </summary>

      <div className={css.Content}>{children}</div>
    </details>
  );
}
