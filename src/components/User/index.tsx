import type { FC, FocusEvent, MouseEvent } from "react";

import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import style from "./index.module.css";

export const User: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleUserMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogIn = () => signIn("google");
  const handleLogOut = () => signOut();
  const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.matches(":focus-within")) {
      setIsMenuOpen(false);
    }
  };
  const handleMouse = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className={style.Container} onBlur={handleFocus}>
      <button className={style.Button} onClick={handleUserMenu} aria-label="toggle user menu">
        {session ? (
          <div className={style.ProfileImage}>
            <Image src={`${session.user?.image}`} alt="U" sizes="64px" fill />
          </div>
        ) : (
          <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: "2rem" }} />
        )}

        <FontAwesomeIcon size="xs" icon={faChevronDown} transform="down-3" />
      </button>

      <div className={style.Menu + (isMenuOpen ? " " + style.Open : "")} onMouseDown={handleMouse}>
        {session ? (
          <>
            <div className={style.Name}>
              <p>{session.user?.name}</p>
            </div>

            <div className={style.Actions}>
              <Link className={style.LinkButton} href="/profile">
                Profile
              </Link>
              <button className={style.LinkButton} onClick={handleLogOut}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <div className={style.Actions}>
            <button className={style.LinkButton} onClick={handleLogIn}>
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
