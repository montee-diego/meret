import type { ButtonHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";

import css from "./index.module.css";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default forwardRef<HTMLButtonElement, IProps>(function ButtonIcon(props, ref) {
  const { children } = props;

  return (
    <button {...props} className={css.Button} ref={ref}>
      {children}
    </button>
  );
});
