import type { SyntheticEvent, ReactNode } from "react";
import { forwardRef } from "react";

import FocusTrap from "@accessibility/FocusTrap";
import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  style: {};
  toggleOpen: () => void;
}

export default forwardRef<HTMLDivElement, IProps>(function Menu(props, ref) {
  const { children, style, toggleOpen } = props;

  function handleClick(e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();

    if (tagName === "a" || tagName === "button") {
      toggleOpen();
    }
  }

  return (
    <div className={Style.Container} style={style} ref={ref}>
      <FocusTrap active className={Style.Menu} cancelEvent={toggleOpen} onClick={handleClick}>
        {children}
      </FocusTrap>
    </div>
  );
});
