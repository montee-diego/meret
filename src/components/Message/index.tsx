import type { ReactNode } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
}

export default function Message({ children }: IProps) {
  return (
    <div className={Style.Container}>
      <div className={Style.Content}>
        <Icon icon={faCircleInfo} />
        <p>{children}</p>
      </div>
    </div>
  );
}
