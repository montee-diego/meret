import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowRightToBracket as faSide } from "@fortawesome/free-solid-svg-icons";
import { useAudioPlayer } from "@context/AudioPlayer";
import { ButtonIcon, ThemeToggle } from "@components/index";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IProps> = ({ setIsNavOpen }) => {
  const { playerOpen, setPlayerOpen } = useAudioPlayer();

  const handleNavState = () => setIsNavOpen(true);
  const handlePlayerState = () => setPlayerOpen(!playerOpen);

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
        <FontAwesomeIcon icon={faSide} size="xl" flip={playerOpen ? undefined : "horizontal"} />
      </ButtonIcon>
    </header>
  );
};
