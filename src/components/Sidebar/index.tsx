import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, Search } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const handleNavState = () => setIsNavOpen(false);

  return (
    <>
      <nav className={style.Container + (isNavOpen ? " " + style.Open : "")}>
        <div className={style.Logo}>
          <h1>Meret</h1>
          <ButtonIcon onClick={handleNavState}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </ButtonIcon>
        </div>

        <Search />
      </nav>

      <div
        className={style.Overlay + (isNavOpen ? " " + style.OverlayShow : "")}
        onClick={handleNavState}
      ></div>
    </>
  );
};
