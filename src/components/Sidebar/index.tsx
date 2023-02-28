import type { Dispatch, SyntheticEvent, SetStateAction } from "react";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";

import { useMeret } from "@context/Meret";
import { useModal } from "@hooks/useModal";
import FocusTrap from "@accessibility/FocusTrap";
import Accordion from "@components/Accordion";
import Button from "@components/Button";
import ButtonIcon from "@components/ButtonIcon";
import ButtonLink from "@components/ButtonLink";
import CreatePlaylist from "@components/CreatePlaylist";
import Input from "@components/Input";
import Login from "@components/Dialog/Login";
import Style from "./index.module.css";

interface IProps {
  navState: {
    isNavOpen: boolean;
    setIsNavOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export default function Sidebar({ navState }: IProps) {
  const [openLogin, closeLogin, LoginModal] = useModal();
  const { push } = useRouter();
  const { status } = useSession();
  const { data } = useMeret();
  const { isNavOpen, setIsNavOpen } = navState;

  const handleNavClose = () => setIsNavOpen(false);

  function handleSubmit(input: string): void {
    push(`/search?query=${input}`);
    setIsNavOpen(false);
  }

  function handleAutoClose(e: SyntheticEvent) {
    const target = e.target as HTMLElement;

    if (target.tagName.toLowerCase() === "a") {
      setIsNavOpen(false);
    }
  }

  function handleLogin(e: SyntheticEvent) {
    setIsNavOpen(false);
    openLogin();
  }

  return (
    <Fragment>
      <div className={Style.Container} onClick={handleAutoClose} data-open={isNavOpen}>
        <FocusTrap active={isNavOpen} className={Style.Menu} cancelEvent={handleNavClose}>
          <div className={Style.Logo}>
            <h1>Meret</h1>
            <ButtonIcon onClick={handleNavClose} aria-label="close sidebar">
              <Icon icon={faXmark} size="xl" />
            </ButtonIcon>
          </div>

          <div className={Style.Search}>
            <Input onSubmit={handleSubmit} placeholder="Search">
              <Icon icon={faMagnifyingGlass} />
            </Input>
          </div>

          <div className={Style.Navigate}>
            <ButtonLink href="/" align="left">
              Home
            </ButtonLink>
            <Accordion summary="Discover">
              <ul className={Style.List}>
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
            <div className={Style.UserPlaylists}>
              <Accordion summary="Playlists">
                <CreatePlaylist />

                <ul className={Style.List}>
                  {data.playlists.map(({ _id, name }) => (
                    <li key={_id}>
                      <ButtonLink href={`/playlist/${_id}`} align="left">
                        {name}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              </Accordion>

              <Accordion summary="Subscriptions">
                <ul className={Style.List}>
                  {data.subscriptions.map(({ _id, name }) => (
                    <li key={_id}>
                      <ButtonLink href={`/playlist/${_id}`} align="left">
                        {name}
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              </Accordion>
            </div>
          ) : (
            <div className={Style.LoginBtn}>
              <Button onClick={handleLogin} align="center">
                Log In to view Playlists
              </Button>
            </div>
          )}
        </FocusTrap>
      </div>

      <LoginModal>
        <Login closeDialog={closeLogin} />
      </LoginModal>
    </Fragment>
  );
}
