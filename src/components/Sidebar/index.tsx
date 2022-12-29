import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { ButtonIcon, Search } from "@components/index";
import Link from "next/link";
import type { FC, Dispatch, SetStateAction } from "react";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  const handleNavClose = () => setIsNavOpen(false);

  const setActiveClass = (href: string): string => {
    return pathname === href ? style.Active : "";
  };

  return (
    <div className={style.Container + (isNavOpen ? " " + style.View : "")}>
      <FocusTrap
        active={isNavOpen}
        className={style.Menu + (isNavOpen ? " " + style.Open : "")}
        cancelEvent={handleNavClose}
      >
        <div className={style.Logo}>
          <h1>Meret</h1>
          <ButtonIcon onClick={handleNavClose} label={"close sidebar"}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </ButtonIcon>
        </div>

        <Search setIsNavOpen={setIsNavOpen} />

        <div className={style.Links}>
          <Link href="/" className={setActiveClass("/")}>
            Home
          </Link>
          <Link href="/discover" className={setActiveClass("/discover")}>
            Discover
          </Link>
        </div>

        <details className={style.Playlists}>
          <summary>
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
            <span>Playlists</span>
          </summary>
          <div className={style.PlaylistsContent}>
            {session ? (
              <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
              </ul>
            ) : (
              <button>
                <strong>Log In</strong> to view playlists
              </button>
            )}
          </div>
        </details>
      </FocusTrap>
    </div>
  );
};
