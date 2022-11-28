import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ThemeToggle } from "@components/index";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const handleNavState = () => setIsNavOpen(true);

  return (
    <header className={style.Container}>
      <div className={style.Title}>
        <button className={style.Burger} onClick={handleNavState}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </button>
        <h2>Home</h2>
      </div>

      <ThemeToggle />
    </header>
  );
};
