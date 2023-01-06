import type { FC, SyntheticEvent } from "react";

import { useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonText } from "@components/index";
import style from "./index.module.css";

interface IProps {
  onClick?: () => void;
}

export const UserPlaylists: FC<IProps> = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status } = useSession();
  const { playlists } = useUser();
  const input = useRef<HTMLInputElement | null>(null);

  const handleLogIn = () => signIn("google");
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.current?.value === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    const status = await playlists.create(`${input.current?.value}`);

    if (status === "success") {
      if (input.current) {
        input.current.value = "";
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {status === "authenticated" ? (
        <>
          <form className={style.Form} onSubmit={handleSubmit}>
            <input type="text" placeholder="Create Playlist" size={2} ref={input} />
            <button type="submit" tabIndex={-1} aria-label="create playlist">
              {isLoading ? (
                <FontAwesomeIcon icon={faSpinner} size="lg" spin />
              ) : (
                <FontAwesomeIcon icon={faPlus} size="lg" />
              )}
            </button>
          </form>

          <ul className={style.List}>
            {playlists.data.map((playlist) => (
              <li key={playlist._id}>
                {onClick ? (
                  <ButtonText onClick={onClick} align="left">
                    {playlist.name}
                  </ButtonText>
                ) : (
                  <ButtonText href={`/playlist/${playlist._id}`} align="left">
                    {playlist.name}
                  </ButtonText>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <ButtonText onClick={handleLogIn} align="left">
          <strong>Log In</strong> to view playlists
        </ButtonText>
      )}
    </>
  );
};
