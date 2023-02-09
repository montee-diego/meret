import type { FC, Dispatch, SetStateAction } from "react";

import { signIn, useSession } from "next-auth/react";
import { useMeret } from "@context/Meret";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { Accordion, Button, ButtonLink, Search, PlaylistsMenu } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { status } = useSession();
  const { data } = useMeret();

  const handleNavClose = () => setIsNavOpen(false);
  const handleLogIn = () => signIn("google");

  return (
    <div className={style.Container} data-open={isNavOpen}>
      <FocusTrap active={isNavOpen} className={style.Menu} cancelEvent={handleNavClose}>
        <div className={style.Logo}>
          <h1>Meret</h1>
          <Button onClick={handleNavClose} label="close sidebar">
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Button>
        </div>

        <Search setIsNavOpen={setIsNavOpen} />

        <div className={style.Links}>
          <ButtonLink href="/" align="left">
            Home
          </ButtonLink>
          <Accordion summary="Discover">
            <ButtonLink href="/discover/songs" align="left">
              Songs
            </ButtonLink>
            <ButtonLink href="/discover/playlists" align="left">
              Playlists
            </ButtonLink>
          </Accordion>
        </div>

        {status === "authenticated" ? (
          <div className={style.UserData}>
            <Accordion summary="Playlists">
              <PlaylistsMenu playlists={data.playlists} showInput />
            </Accordion>

            <Accordion summary="Subscriptions">
              <PlaylistsMenu playlists={data.subscriptions} />
            </Accordion>
          </div>
        ) : (
          <div className={style.LogInBtn}>
            <ButtonLink onClick={handleLogIn} align="center">
              Log In to view Playlists
            </ButtonLink>
          </div>
        )}
      </FocusTrap>
    </div>
  );
};
