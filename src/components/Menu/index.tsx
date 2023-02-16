import type { MouseEvent, ReactNode } from "react";

import css from "./index.module.css";

interface IProps {
  align: "left" | "right";
  children: ReactNode;
  isOpen: boolean;
}

export default function Menu({ align, children, isOpen }: IProps) {
  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  return (
    <div className={css.Menu} onMouseDown={handleMouse} data-open={isOpen} data-align={align}>
      {children}
    </div>
  );
}
