import type { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket as faSide } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

import ButtonIcon from "@components/ButtonIcon";
import User from "@components/User";
import Style from "./index.module.css";

interface IProps {
  navState: {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  };
  playerState: {
    isPlayerOpen: boolean;
    setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
  };
}

const ThemeToggle = dynamic(() => import("@components/ThemeToggle"), {
  ssr: false,
});

export default function Header({ navState, playerState }: IProps) {
  const { setIsNavOpen } = navState;
  const { isPlayerOpen, setIsPlayerOpen } = playerState;

  const handleNavOpen = () => setIsNavOpen(true);
  const handlePlayerToggle = () => setIsPlayerOpen(!isPlayerOpen);

  return (
    <header className={Style.Container}>
      <div className={Style.Title}>
        <ButtonIcon onClick={handleNavOpen} aria-label="open sidebar">
          <Icon icon={faBars} size="xl" />
        </ButtonIcon>
        <h2>Home</h2>
      </div>

      <div className={Style.Actions}>
        <ThemeToggle />
        <ButtonIcon onClick={handlePlayerToggle} aria-label="toggle audio player">
          <Icon icon={faSide} size="xl" flip={isPlayerOpen ? undefined : "horizontal"} />
        </ButtonIcon>
        <User />
      </div>
    </header>
  );
}
