import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import FocusTrap from "@accessibility/FocusTrap";
import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: IProps) {
  return createPortal(
    <div className={Style.Container}>
      <FocusTrap active className={Style.Content} cancelEvent={closeModal}>
        {children}
      </FocusTrap>
    </div>,
    document.body
  );
}
