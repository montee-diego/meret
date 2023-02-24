import type { ReactNode } from "react";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
}

export default function DialogActions({ children }: IProps) {
  return (
    <div className={Style.Actions}>
      {children}
    </div>
  );
}
