import type { FC } from "react";
import type { ITrack } from "@global/types";

import { useState } from "react";
import { useModal } from "@hooks/useModal";
import { Modal, Track, TrackMenu } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isAuthor?: boolean;
  scroll?: string;
  title?: string;
  tracks: ITrack[];
}

export const TrackList: FC<IProps> = ({ isAuthor, scroll, title, tracks }) => {
  const [selected, setSelected] = useState<ITrack | null>(null);
  const [trackModal, toggleTrackModal] = useModal();

  const openModal = (track: ITrack) => {
    setSelected(track);
    toggleTrackModal();
  };

  return (
    <div className={style.Container} data-scroll={scroll}>
      {title && <h3>{title}</h3>}
      <div className={style.Content}>
        {tracks.map((track) => (
          <Track track={track} openMenu={openModal} key={track._key || track._id} />
        ))}
      </div>

      {trackModal && (
        <Modal toggleOpen={toggleTrackModal}>
          <TrackMenu track={selected} toggleOpen={toggleTrackModal} isAuthor={isAuthor} />
        </Modal>
      )}
    </div>
  );
};
