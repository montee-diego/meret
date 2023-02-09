import type { FC } from "react";
import type { ITrack } from "@global/types";

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
  isPlaylist?: boolean;
  tracks: ITrack[];
}

export const Tracks: FC<IProps> = ({ isAuthor, isPlaylist, tracks }) => {
  const [selected, setSelected] = useState<ITrack | null>(null);
  const [trackModal, toggleTrackModal] = useModal();
  const { player } = useAudioPlayer();

  function handleModal(track: ITrack | null): void {
    setSelected(track);
    toggleTrackModal();
  }

  function handlePlay(track: ITrack, index: number): void {
    player.setPlaylist(isPlaylist ? tracks : [track]);
    player.setIndex(isPlaylist ? index : 0);
  }

  return (
    <>
      {tracks.map((track, index) => (
        <div className={style.Container} key={track._key || track._id}>
          <Cover cover={track.cover} size="3rem" />

          <button onClick={() => handlePlay(track, index)} aria-label="play">
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

          <button aria-label="track menu" onClick={() => handleModal(track)}>
            <FontAwesomeIcon size="xl" icon={faEllipsisVertical} />
          </button>
        </div>
      ))}

      {trackModal && selected && (
        <Modal toggleOpen={() => handleModal(null)}>
          <TracksMenu track={selected} toggleOpen={() => handleModal(null)} isAuthor={isAuthor} />
        </Modal>
      )}
    </>
  );
};
