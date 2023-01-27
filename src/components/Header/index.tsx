import type { FC, Dispatch, SetStateAction } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket as faSide } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "@context/AudioPlayer";
import { ButtonIcon, User } from "@components/index";
import dynamic from "next/dynamic";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggle = dynamic(() => import("@components/ThemeToggle"), {
  ssr: false,
});

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const { playerOpen, setPlayerOpen } = useAudioPlayer();

  const handleNavState = () => setIsNavOpen(true);
  const handlePlayerState = () => setPlayerOpen(!playerOpen);

  return (
    <header className={style.Container}>
      <div className={style.Title}>
        <ButtonIcon onClick={handleNavState} label="open sidebar">
          <FontAwesomeIcon icon={faBars} size="xl" />
        </ButtonIcon>
        <h2>Home</h2>
      </div>

      <div className={style.Actions}>
        <ThemeToggle />
        <ButtonIcon onClick={handlePlayerState} label="toggle audio player">
          <FontAwesomeIcon icon={faSide} size="xl" flip={playerOpen ? undefined : "horizontal"} />
        </ButtonIcon>
        <User />
      </div>
    </header>
  );
};
