import type { FC, SyntheticEvent } from "react";
import type { ITrack } from "@global/types";

import { useRef, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonText } from "@components/index";
import style from "./index.module.css";

interface IProps {
  onAdd?: () => ITrack | null;
}

export const UserPlaylists: FC<IProps> = ({ onAdd }) => {
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

    console.log(status);

    if (status === "success") {
      if (input.current) {
        input.current.value = "";
      }
    }

    setIsLoading(false);
  };
  const handleAddTrack = async (id: string) => {
    if (!onAdd) {
      return;
    }

    const track = onAdd();
    const status = await playlists.addItem(id, `${track?._id}`);

    if (status === "success") {
    }
  };

  if (status === "authenticated" && playlists.fetchError) {
    return (
      <div>
        <p>error</p>
      </div>
    );
  }

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
              <li key={playlist._id} data-id={playlist._id}>
                {onAdd ? (
                  <ButtonText onClick={() => handleAddTrack(playlist._id)} align="left">
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
