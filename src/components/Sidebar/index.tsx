import type { FC, Dispatch, SetStateAction } from "react";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const handleClose = () => setIsNavOpen(false);

  return (
    <>
      <nav className={style.Container + (isNavOpen ? " " + style.Open : "")}>
        <h1 onClick={handleClose}>Meret</h1>
      </nav>

      <div
        className={style.Overlay + (isNavOpen ? " " + style.OverlayShow : "")}
        onClick={handleClose}
      ></div>
    </>
  );
};
