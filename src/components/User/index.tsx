import { Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import Button from "@components/Button";
import ButtonLink from "@components/ButtonLink";
import Login from "@components/Dialog/Login";
import Style from "./index.module.css";

const ThemeToggle = dynamic(() => import("@components/ThemeToggle"), {
  ssr: false,
});

export default function User() {
  const [toggleUserMenu, UserMenu] = useMenu();
  const [openLogin, closeLogin, LoginModal] = useModal();
  const { data: session } = useSession();

  return (
    <Fragment>
      <button className={Style.Button} onClick={toggleUserMenu} aria-label="toggle user menu">
        {session && session.user.image ? (
          <div className={Style.ProfileImage}>
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
            <div className={Style.User}>
              <p>{session.user.name}</p>
              <span>{session.user.email}</span>
            </div>

            <div>
              <ThemeToggle />
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
            <ThemeToggle />
            <Button onClick={openLogin} align="left">
              Log In
            </Button>
          </div>
        )}
      </UserMenu>

      <LoginModal>
        <Login closeDialog={closeLogin} />
      </LoginModal>
    </Fragment>
  );
}
