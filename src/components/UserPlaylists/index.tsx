import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import type { FC, FormEvent } from "react";
import style from "./index.module.css";

export const UserPlaylists: FC = () => {
  const { playlists } = useUser();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <form className={style.Form} onSubmit={handleSubmit}>
        <input type="text" size={2} placeholder="Create Playlist" required />
        <button type="submit" tabIndex={-1} aria-label="create playlist">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </form>
      <ul className={style.List}>
        {playlists.map((playlist) => (
          <li>
            <a href={`/playlist/${playlist.id}`}>{playlist.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
