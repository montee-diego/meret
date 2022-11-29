import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, ThemeToggle } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isPlayerOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IProps> = ({ isPlayerOpen, setIsNavOpen, setIsPlayerOpen }) => {
  const handleNavState = () => setIsNavOpen(true);
  const handlePlayerState = () => setIsPlayerOpen((isPlayerOpen) => !isPlayerOpen);

  return (
    <header className={style.Container}>
      <div className={style.Title}>
        <ButtonIcon onClick={handleNavState}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </ButtonIcon>
        <h2>Home</h2>
      </div>

      <ThemeToggle />
      <ButtonIcon onClick={handlePlayerState}>
        {isPlayerOpen}
        <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" flip={!isPlayerOpen ? "horizontal" : undefined} />
      </ButtonIcon>
    </header>
  );
};
