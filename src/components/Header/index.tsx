import type { FC, Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket as faSide } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "@context/AudioPlayer";
import { Button, User } from "@components/index";
import dynamic from "next/dynamic";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggle = dynamic(() => import("@components/ThemeToggle"), {
  ssr: false,
});

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const { player } = useAudioPlayer();

  const handleNavState = () => setIsNavOpen(true);
  const handlePlayerState = () => player.setIsOpen(!player.isOpen);

  return (
    <header className={style.Container}>
      <div className={style.Title}>
        <Button onClick={handleNavState} label="open sidebar">
          <FontAwesomeIcon icon={faBars} size="xl" />
        </Button>
        <h2>Home</h2>
      </div>

      <div className={style.Actions}>
        <ThemeToggle />
        <Button onClick={handlePlayerState} label="toggle audio player">
          <FontAwesomeIcon
            icon={faSide}
            size="xl"
            flip={player.isOpen ? undefined : "horizontal"}
          />
        </Button>
        <User />
      </div>
    </header>
  );
};
