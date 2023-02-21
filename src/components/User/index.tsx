import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import Button from "@components/Button";
import ButtonLink from "@components/ButtonLink";
import Login from "@components/Login";
import style from "./index.module.css";

export default function User() {
  const [toggleUserMenu, UserMenu] = useMenu();
  const [toggleLoginModal, LoginModal] = useModal();
  const { data: session } = useSession();

  return (
    <Fragment>
      <button className={style.Button} onClick={toggleUserMenu} aria-label="toggle user menu">
        {session && session.user.image ? (
          <div className={style.ProfileImage}>
            <Image src={session.user.image} alt="U" sizes="64px" fill />
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
              <Button onClick={() => signOut()} align="left">
                Log Out
              </Button>
            </div>
          </Fragment>
        ) : (
          <div>
            <Button onClick={toggleLoginModal} align="left">
              Log In
            </Button>
          </div>
        )}
      </UserMenu>

      <LoginModal>
        <Login toggleOpen={toggleLoginModal} />
      </LoginModal>
    </Fragment>
  );
}
