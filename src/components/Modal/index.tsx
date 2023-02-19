import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import FocusTrap from "@accessibility/FocusTrap";
import css from "./index.module.css";

interface IProps {
  children: ReactNode;
  toggleOpen: () => void;
}

export default function Modal({ children, toggleOpen }: IProps) {
  return createPortal(
    <div className={css.Container}>
      <FocusTrap active className={css.Content} cancelEvent={toggleOpen}>
        {children}
      </FocusTrap>
    </div>,
    document.body
  );
}
