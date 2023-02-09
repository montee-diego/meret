import type { ReactNode } from "react";

import { forwardRef } from "react";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  label: string;
  onClick: () => void;
}

export const Button = forwardRef<HTMLButtonElement, IProps>(function Button(props, ref) {
  const { children, label, onClick } = props;

  return (
    <button className={style.Button} onClick={onClick} aria-label={label} ref={ref}>
      {children}
    </button>
  );
});
