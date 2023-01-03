import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useUser } from "@context/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import type { FC, SyntheticEvent } from "react";
import style from "./index.module.css";

export const UserPlaylists: FC = () => {
  const { playlists, setPlaylists } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const input = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.current?.value === "" || isLoading) {
      return;
    }

    setIsLoading(true);

    const request = fetch("/api/playlist/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: input.current?.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setPlaylists((prevPlaylists) => [...prevPlaylists, data]);

        if (input.current) {
          input.current.value = "";
        }
      });

    toast.promise(request, {
      loading: "Creating playlist...",
      success: "Playlist created!",
      error: "Failed to create playlist",
    });
  };

  return (
    <>
      <form className={style.Form} onSubmit={handleSubmit}>
        <input type="text" placeholder="Create Playlist" size={2} ref={input} />
        <button type="submit" tabIndex={-1} aria-label="create playlist">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
        </button>
      </form>
      <ul className={style.List}>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            <Link href={`/playlist/${playlist._id}`}>{playlist.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
