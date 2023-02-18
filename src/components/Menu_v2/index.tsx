import type { SyntheticEvent, ReactNode } from "react";

import { FocusTrap } from "@accessibility/FocusTrap";
import css from "./index.module.css";

interface IProps {
  children: ReactNode;
  style: {};
  toggleOpen: () => void;
}

export default function Menu({ children, style, toggleOpen }: IProps) {
  function handleClick(e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();

    if (tagName === "a" || tagName === "button") {
      toggleOpen();
    }
  }

  return (
    <>
      <FocusTrap active className={css.Menu} style={style} cancelEvent={toggleOpen}>
        <div className={css.List} onClick={handleClick}>
          {children}
        </div>
      </FocusTrap>
    </>
  );
}
