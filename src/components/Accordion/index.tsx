import type { ReactNode } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  summary: string;
}

export default function Accordion({ children, summary }: IProps) {
  return (
    <details className={Style.Container}>
      <summary className={Style.Summary}>
        <span>{summary}</span>
        <Icon className={Style.Icon} icon={faChevronDown} size="sm" />
      </summary>

      <div className={Style.Content}>{children}</div>
    </details>
  );
}
