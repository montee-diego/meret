import { createPortal } from "react-dom";
import { FocusTrap } from "@accessibility/FocusTrap";
import type { Dispatch, FC, ReactNode, SetStateAction } from "react";
import type { ITrack } from "@global/types";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  setContent: Dispatch<SetStateAction<ITrack | null>>;
}

export const Modal: FC<IProps> = ({ children, setContent }) => {
  const handleClose = () => setContent(null);

  return createPortal(
    <div className={style.Container} onClick={handleClose}>
      <FocusTrap active={true} className={style.Content} cancelEvent={handleClose}>
        {children}
      </FocusTrap>
    </div>,
    document.body
  );
};
