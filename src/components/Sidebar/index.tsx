import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, Search } from "@components/index";
import Link from "next/link";
import type { FC, Dispatch, SetStateAction, FocusEvent, KeyboardEvent } from "react";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { pathname } = useRouter();
  const { data: session } = useSession();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const handleNavState = () => setIsNavOpen(false);

  const handleKey = (event: KeyboardEvent) => {
    if (event.code === "Escape" && isNavOpen) {
      setIsNavOpen(false);
    }
  };

  const handleFocus = ({ currentTarget }: FocusEvent<HTMLElement>) => {
    if (!currentTarget.matches(":focus-within")) {
      setIsNavOpen(false);
    }
  };

  const setActiveClass = (href: string): string => {
    return pathname === href ? style.Active : "";
  };

  useEffect(() => {
    if (isNavOpen) {
      if (closeRef.current) closeRef.current.focus();
    } else {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    }
  }, [isNavOpen]);

  return (
    <>
      <nav
        className={style.Container + (isNavOpen ? " " + style.Open : "")}
        onKeyDown={handleKey}
        onBlur={handleFocus}
        tabIndex={-1}
      >
        <div className={style.Logo}>
          <h1>Meret</h1>
          <ButtonIcon onClick={handleNavState} label={"close sidebar"} ref={closeRef}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </ButtonIcon>
        </div>

        <Search setIsNavOpen={setIsNavOpen} />

        <div className={style.Links}>
          <Link href="/" className={setActiveClass("/")}>
            Home
          </Link>
          <Link href="/artists" className={setActiveClass("/artists")}>
            Artists
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
      </nav>

      <div
        className={style.Overlay + (isNavOpen ? " " + style.OverlayShow : "")}
        onClick={handleNavState}
      ></div>
    </>
  );
};
