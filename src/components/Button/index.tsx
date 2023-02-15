import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import css from "./index.module.css";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  align: "left" | "center" | "right";
  children: ReactNode;
}

export default forwardRef<HTMLButtonElement, IProps>(function Button(props, ref) {
  const { align, children } = props;

  return (
    <button {...props} className={css.Button} data-align={align} ref={ref}>
      {children}
    </button>
  );
});
