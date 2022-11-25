import type { FC, Dispatch, SetStateAction } from "react";
import { useTheme } from "@context/Theme";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const { setTheme } = useTheme();

  return (
    <header className={style.Container}>
      <h1 onClick={() => setIsNavOpen(true)}>*title goes here*</h1>

      <button onClick={() => setTheme("light")}>light</button>
      <button onClick={() => setTheme("dark")}>dark</button>
    </header>
  );
};
