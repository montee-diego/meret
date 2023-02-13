import type { FC, Dispatch, SetStateAction } from "react";

import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useMeret } from "@context/Meret";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { Accordion, Button, ButtonLink, PlaylistsMenu } from "@components/index";
import Input from "@components/Input";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { push } = useRouter();
  const { status } = useSession();
  const { data } = useMeret();

  const handleNavClose = () => setIsNavOpen(false);
  const handleLogIn = () => signIn("google");

  function handleSubmit(input: string): void {
    push(`/search?query=${input}`);
    setIsNavOpen(false);
  }

  return (
    <div className={style.Container} data-open={isNavOpen}>
      <FocusTrap active={isNavOpen} className={style.Menu} cancelEvent={handleNavClose}>
        <div className={style.Logo}>
          <h1>Meret</h1>
          <Button onClick={handleNavClose} label="close sidebar">
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Button>
        </div>

        <div className={style.Search}>
          <Input onSubmit={handleSubmit} placeholder="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Input>
        </div>

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
