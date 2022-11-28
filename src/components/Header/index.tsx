import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@context/Theme";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const { setTheme } = useTheme();

  const handleNavState = () => setIsNavOpen(true);
  const handleThemeState = () => setTheme((theme) => (theme == "light" ? "dark" : "light"));

  return (
    <header className={style.Container}>
      <div className={style.Title}>
        <button className={style.Burger} onClick={handleNavState}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        <h1>*title goes here*</h1>
      </div>

      <button onClick={handleThemeState}>Theme</button>
    </header>
  );
};
