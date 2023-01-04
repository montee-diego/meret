import type { FC, ReactNode } from "react";

import { createPortal } from "react-dom";
import { FocusTrap } from "@accessibility/FocusTrap";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  toggleOpen: () => void;
}

export const Modal: FC<IProps> = ({ children, toggleOpen }) => {
  return createPortal(
    <div className={style.Container}>
      <FocusTrap active={true} className={style.Content} cancelEvent={toggleOpen}>
        {children}
      </FocusTrap>
    </div>,
    document.body
  );
};
