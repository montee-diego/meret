import type { FC, MouseEvent, ReactNode } from "react";

import style from "./index.module.css";

interface IProps {
  align: "left" | "right";
  children: ReactNode;
  isOpen: boolean;
}

export const Menu: FC<IProps> = ({ align, children, isOpen }) => {
  function handleMouse(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
  }

  return (
    <div className={style.Menu} onMouseDown={handleMouse} data-open={isOpen} data-align={align}>
      {children}
    </div>
  );
};
