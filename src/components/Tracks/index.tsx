import type { FC } from "react";
import type { IPlaylist, ITrack } from "@global/types";

import { useState } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import { useModal } from "@hooks/useModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { formatTime } from "@global/utils";
import { Cover, Modal, TracksMenu } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isAuthor?: boolean;
  tracks: ITrack[];
}

type Data = { playlist: IPlaylist; tracks?: never } | { playlist?: never; tracks: ITrack[] };

export type Selected = {
  index: number;
  track: ITrack;
};

interface ITrackList {
  onMenu: (data: Selected | null) => void;
  onPlay: (data: Selected) => void;
  tracks: ITrack[];
}

const TrackList: FC<ITrackList> = ({ onMenu, onPlay, tracks }) => {
  return (
    <>
      {tracks.map((track, index) => (
        <div className={style.Container} key={track._key || track._id}>
          <Cover cover={track.cover} size="3rem" />

          <button onClick={() => onPlay({ track, index })} aria-label="play">
            <FontAwesomeIcon size="lg" icon={faPlay} transform="right-1 up-0.5" />
          </button>

          <div className={style.Data}>
            <p>{track.title}</p>
            <p>{track.artist}</p>
          </div>

          <div className={style.Metadata}>
            <p>{track.genres.join(", ")}</p>
            <p>{track.date}</p>
            <p className={style.Length}>{formatTime(track.length)}</p>
          </div>

          <button onClick={() => onMenu({ track, index })} aria-label="track menu">
            <FontAwesomeIcon size="xl" icon={faEllipsisVertical} />
          </button>
        </div>
      ))}
    </>
  );
};

export const Tracks: FC<Data> = ({ playlist, tracks }) => {
  const [selected, setSelected] = useState<Selected | null>(null);
  const [trackModal, toggleTrackModal] = useModal();
  const { player } = useAudioPlayer();
  const { isAuthor } = playlist?.user || {};

  function handleModal(data: Selected | null): void {
    setSelected(data);
    toggleTrackModal();
  }

  function handlePlay(data: Selected): void {
    if (selected) {
      player.setData({
        index: playlist ? selected.index : 0,
        isSync: false,
        playlistId: playlist ? playlist._id : null,
        tracks: playlist ? playlist.tracks : [selected.track],
      });
    } else {
      player.setData({
        index: playlist ? data.index : 0,
        isSync: false,
        playlistId: playlist ? playlist._id : null,
        tracks: playlist ? playlist.tracks : [data.track],
      });
    }
  }

  return (
    <>
      {playlist && <TrackList onMenu={handleModal} onPlay={handlePlay} tracks={playlist.tracks} />}

      {tracks && <TrackList onMenu={handleModal} onPlay={handlePlay} tracks={tracks} />}

      {trackModal && selected && (
        <Modal toggleOpen={() => handleModal(null)}>
          <TracksMenu
            selected={selected}
            toggleOpen={() => handleModal(null)}
            isAuthor={isAuthor}
            handlePlay={handlePlay}
          />
        </Modal>
      )}
    </>
  );
};
