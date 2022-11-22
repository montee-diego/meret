import type { FC } from "react";
import style from "./index.module.css";

export const Header: FC = () => {
  return (
    <header className={style.Container}>
      <h1>Meret</h1>
    </header>
  );
};
