import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "@components/index";
import type { FC } from "react";
import style from "./index.module.css";

export const User: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  const handleUserMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleLogIn = () => signIn("google");
  const handleLogOut = () => signOut();

  return (
    <div className={style.MenuButton}>
      <ButtonIcon onClick={handleUserMenu}>
        {session ? (
          <img src={`${session.user?.image}`} alt="" />
        ) : (
          <FontAwesomeIcon size="xl" icon={faCircleUser} />
        )}
      </ButtonIcon>

      <div className={style.Menu + (isMenuOpen ? " " + style.Open : "")}>
        {session ? (
          <div>
            <p>{session.user?.name}</p>
            <button className={style.Button} onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        ) : (
          <button className={style.Button} onClick={handleLogIn}>
            Log In
          </button>
        )}
      </div>
    </div>
  );
};
