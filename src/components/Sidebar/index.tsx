import type { FC, Dispatch, SetStateAction } from "react";

import { signIn, useSession } from "next-auth/react";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import {
  Accordion,
  ButtonIcon,
  ButtonText,
  Playlists,
  Search,
  UserPlaylists,
} from "@components/index";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { status } = useSession();
  const { playlists } = useUser();

  const handleNavClose = () => setIsNavOpen(false);
  const handleLogIn = () => signIn("google");

  return (
    <div className={style.Container} data-open={isNavOpen}>
      <FocusTrap active={isNavOpen} className={style.Menu} cancelEvent={handleNavClose}>
        <div className={style.Logo}>
          <h1>Meret</h1>
          <ButtonIcon onClick={handleNavClose} label="close sidebar">
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </ButtonIcon>
        </div>

        <Search setIsNavOpen={setIsNavOpen} />

        <div className={style.Links}>
          <ButtonText href="/" align="left">
            Home
          </ButtonText>
          <ButtonText href="/discover" align="left">
            Discover
          </ButtonText>
        </div>

        {status === "authenticated" ? (
          <div className={style.UserData}>
            <Accordion summary="Playlists">
              <UserPlaylists />
            </Accordion>

            <Accordion summary="Subscriptions">
              <Playlists playlists={playlists.subs} />
            </Accordion>
          </div>
        ) : (
          <div className={style.LogInBtn}>
            <ButtonText onClick={handleLogIn} align="center">
              Log In to view Playlists
            </ButtonText>
          </div>
        )}
      </FocusTrap>
    </div>
  );
};
