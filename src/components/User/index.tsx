import { Fragment } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { useMenu } from "@hooks/useMenu";
import Button from "@components/Button";
import ButtonLink from "@components/ButtonLink";
import style from "./index.module.css";

export default function User() {
  const [toggleUserMenu, UserMenu] = useMenu();
  const { data: session } = useSession();

  const handleLogIn = () => signIn("google");
  const handleLogOut = () => signOut();

  return (
    <Fragment>
      <button className={style.Button} onClick={toggleUserMenu} aria-label="toggle user menu">
        {session ? (
          <div className={style.ProfileImage}>
            <Image src={`${session.user?.image}`} alt="U" sizes="64px" fill />
          </div>
        ) : (
          <Icon icon={faCircleUser} style={{ fontSize: "2rem" }} />
        )}

        <Icon size="xs" icon={faChevronDown} transform="down-3" />
      </button>

      <UserMenu>
        {session ? (
          <Fragment>
            <div className={style.User}>
              <p>{session.user.name}</p>
              <span>{session.user.email}</span>
            </div>

            <div>
              <ButtonLink href="/profile" align="left">
                Profile
              </ButtonLink>
              <Button onClick={handleLogOut} align="left" aria-label="log out">
                Log Out
              </Button>
            </div>
          </Fragment>
        ) : (
          <div>
            <Button onClick={handleLogIn} align="left" aria-label="log in">
              Log In
            </Button>
          </div>
        )}
      </UserMenu>
    </Fragment>
  );
}
