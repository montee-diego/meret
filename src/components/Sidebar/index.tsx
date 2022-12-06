import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, Search } from "@components/index";
import Link from "next/link";
import type { FC, Dispatch, SetStateAction } from "react";
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

        <div className={style.Links}>
          <Link href="/">Home</Link>
          <Link href="/artists">Artists</Link>
        </div>

        <details className={style.Playlists}>
          <summary>
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
            Playlists
          </summary>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </details>
      </nav>

      <div
        className={style.Overlay + (isNavOpen ? " " + style.OverlayShow : "")}
        onClick={handleNavState}
      ></div>
    </>
  );
};
