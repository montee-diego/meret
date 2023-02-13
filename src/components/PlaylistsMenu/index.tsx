import type { FC } from "react";
import type { IPlaylistMin } from "@global/types";

import { useState } from "react";
import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { ButtonLink } from "@components/index";
import Input from "@components/Input";
import style from "./index.module.css";

interface IProps {
  getTrackId?: () => string;
  showInput?: boolean;
  playlists: IPlaylistMin[];
}

export const PlaylistsMenu: FC<IProps> = ({ getTrackId, showInput, playlists }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { meret } = useMeret();
  const { player } = useAudioPlayer();

  async function handleCreate(input: string) {
    if (isLoading) return;

    setIsLoading(true);
    const response = await meret.create(input);
    setIsLoading(false);
  }

  async function handleAddToPlaylist(pid: string) {
    if (!getTrackId || typeof pid !== "string") {
      return;
    }

    const response = await meret.addItem(pid, getTrackId());

    if (response === "OK") {
      player.syncPlaylist(pid, player.data.index);
    }
  }

  return (
    <>
      {showInput && (
        <Input onSubmit={handleCreate} placeholder="Create Playlist">
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} size="lg" spin />
          ) : (
            <FontAwesomeIcon icon={faPlus} size="lg" />
          )}
        </Input>
      )}

      <ul className={style.List}>
        {playlists.map((playlist) => (
          <li key={playlist._id}>
            {getTrackId ? (
              <ButtonLink onClick={() => handleAddToPlaylist(playlist._id)} align="left">
                {playlist.name}
              </ButtonLink>
            ) : (
              <ButtonLink href={`/playlist/${playlist._id}`} align="left">
                {playlist.name}
              </ButtonLink>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};
