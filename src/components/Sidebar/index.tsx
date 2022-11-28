import type { FC, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
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
        <div className={style.Title}>
          <h1>Meret</h1>
          <button className={style.Close} onClick={handleNavState}>
            <FontAwesomeIcon icon={faXmark} size="2x" />
          </button>
        </div>
      </nav>

      <div
        className={style.Overlay + (isNavOpen ? " " + style.OverlayShow : "")}
        onClick={handleNavState}
      ></div>
    </>
  );
};
