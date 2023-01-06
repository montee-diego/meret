import type { FC, Dispatch, SetStateAction } from "react";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FocusTrap } from "@accessibility/FocusTrap";
import { ButtonIcon, ButtonText, Search, UserPlaylists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isNavOpen: boolean;
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar: FC<IProps> = ({ isNavOpen, setIsNavOpen }) => {
  const { status } = useSession();
  const { playlists } = useUser();

  const handleNavClose = () => setIsNavOpen(false);

  const fetchPlaylists = async () => {
    const status = await playlists.fetch();

    if (status === "success") {
      // do something
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPlaylists();
    }
  }, [status]);

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

        <details className={style.Playlists}>
          <summary>
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
            <span>Playlists</span>
          </summary>

          <div className={style.PlaylistsContent}>
            <UserPlaylists />
          </div>
        </details>
      </FocusTrap>
    </div>
  );
};
