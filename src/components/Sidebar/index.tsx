import type { FC, Dispatch, SetStateAction } from "react";

import { useSession } from "next-auth/react";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { ButtonIcon, ButtonText, Playlists, Search, UserPlaylists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { status } = useSession();
  const { playlists } = useUser();

  const handleNavClose = () => setIsNavOpen(false);

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
            <details className={style.Playlists}>
              <summary>
                <span>Playlists</span>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </summary>

              <div className={style.PlaylistsContent}>
                <UserPlaylists />
              </div>
            </details>

            <details className={style.Playlists}>
              <summary>
                <span>Subscriptions</span>
                <FontAwesomeIcon icon={faChevronDown} size="sm" />
              </summary>

              <div className={style.PlaylistsContent}>
                <Playlists playlists={playlists.subs} />
              </div>
            </details>
          </div>
        ) : (
          <div className={style.LogInStatus}>
            <p>Log in to view your playlists and subscriptions.</p>
          </div>
        )}
      </FocusTrap>
    </div>
  );
};
