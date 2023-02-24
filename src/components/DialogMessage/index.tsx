import type { ReactNode } from "react";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
}

export default function DialogMessage({ children }: IProps) {
  return (
    <p className={Style.Message}>
      {children}
    </p>
  );
}
