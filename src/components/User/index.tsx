import type { FocusEvent } from "react";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import Button from "@components/Button";
import ButtonLink from "@components/ButtonLink";
import Menu from "@components/Menu";
import style from "./index.module.css";

export default function User() {
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

  return (
    <div className={style.Container} onBlur={handleFocus}>
      <button className={style.Button} onClick={handleUserMenu} aria-label="toggle user menu">
        {session ? (
          <div className={style.ProfileImage}>
            <Image src={`${session.user?.image}`} alt="U" sizes="64px" fill />
          </div>
        ) : (
          <Icon icon={faCircleUser} style={{ fontSize: "2rem" }} />
        )}

        <Icon size="xs" icon={faChevronDown} transform="down-3" />
      </button>

      <Menu align="right" isOpen={isMenuOpen}>
        {session ? (
          <>
            <div className={style.Name}>
              <p>{session.user?.name}</p>
            </div>

            <div className={style.Actions}>
              <ButtonLink href="/profile" align="left">
                Profile
              </ButtonLink>
              <Button onClick={handleLogOut} align="left">
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <div className={style.Actions}>
            <Button onClick={handleLogIn} align="left">
              Log In
            </Button>
          </div>
        )}
      </Menu>
    </div>
  );
}
