import { forwardRef } from "react";

import type { FC, ReactNode } from "react";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  label: string;
  onClick: () => void;
}

export const ButtonIcon = forwardRef<HTMLButtonElement, IProps>(function ButtonIcon(props, ref) {
  const { children, label, onClick } = props;

  return (
    <button className={style.Button} onClick={onClick} aria-label={label} ref={ref}>
      {children}
    </button>
  );
});
