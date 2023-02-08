import type { FC, SyntheticEvent } from "react";

import { useRef, useState } from "react";
import { useMeret } from "@context/Meret";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Playlists } from "@components/index";
import style from "./index.module.css";

interface IProps {
  getTrackId?: () => string;
}

export const UserPlaylists: FC<IProps> = ({ getTrackId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data, meret } = useMeret();
  const input = useRef<HTMLInputElement | null>(null);

  async function handleCreate(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = input.current?.value;

    if (isLoading || !name || name === "") {
      return;
    }

    setIsLoading(true);
    const response = await meret.create(name);

    if (response === "OK" && input.current) {
      input.current.value = "";
    }

    setIsLoading(false);
  }

  function handleAddToPlaylist(pid: string): void {
    if (!getTrackId || typeof pid !== "string") {
      return;
    }

    meret.addItem(pid, getTrackId());
  }

  return (
    <>
      <form className={style.Form} onSubmit={handleCreate}>
        <input type="text" placeholder="Create Playlist" size={2} ref={input} />
        <button type="submit" tabIndex={-1} aria-label="create playlist">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} size="lg" spin />
          ) : (
            <FontAwesomeIcon icon={faPlus} size="lg" />
          )}
        </button>
      </form>

      <Playlists playlists={data.playlists} onClick={getTrackId && handleAddToPlaylist} />
    </>
  );
};
