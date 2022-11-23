import type { FC } from "react";
import { useTheme } from "@context/Theme";
import style from "./index.module.css";

export const Header: FC = () => {
  const { setTheme } = useTheme();

  return (
    <header className={style.Container}>
      <h1>Meret</h1>

      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
    </header>
  );
};
