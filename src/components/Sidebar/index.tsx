import type { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { useMeret } from "@context/Meret";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { Button, ButtonLink } from "@components/index";
import Accordion from "@components/Accordion";
import PlaylistCreate from "@components/PlaylistCreate";
import Input from "@components/Input";
import css from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({ isNavOpen, setIsNavOpen }: IProps) {
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
    <div className={css.Container} data-open={isNavOpen}>
      <FocusTrap active={isNavOpen} className={css.Menu} cancelEvent={handleNavClose}>
        <div className={css.Logo}>
          <h1>Meret</h1>
          <Button onClick={handleNavClose} label="close sidebar">
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </Button>
        </div>

        <div className={css.Search}>
          <Input onSubmit={handleSubmit} placeholder="Search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Input>
        </div>

        <div className={css.Navigate}>
          <ButtonLink href="/" align="left">
            Home
          </ButtonLink>
          <Accordion summary="Discover">
            <ul className={css.List}>
              <li>
                <ButtonLink href="/discover/songs" align="left">
                  Songs
                </ButtonLink>
              </li>
              <li>
                <ButtonLink href="/discover/playlists" align="left">
                  Playlists
                </ButtonLink>
              </li>
            </ul>
          </Accordion>
        </div>

        {status === "authenticated" ? (
          <div className={css.UserPlaylists}>
            <Accordion summary="Playlists">
              <PlaylistCreate />

              <ul className={css.List}>
                {data.playlists.map((playlist) => (
                  <li key={playlist._id}>
                    <ButtonLink href={`/playlist/${playlist._id}`} align="left">
                      {playlist.name}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion summary="Subscriptions">
              <ul className={css.List}>
                {data.subscriptions.map((playlist) => (
                  <li key={playlist._id}>
                    <ButtonLink href={`/playlist/${playlist._id}`} align="left">
                      {playlist.name}
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
        ) : (
          <div className={css.LogInBtn}>
            <ButtonLink onClick={handleLogIn} align="center">
              Log In to view Playlists
            </ButtonLink>
          </div>
        )}
      </FocusTrap>
    </div>
  );
}
