import type { FC } from "react";
import type { ITrack } from "@global/types";

import { useState } from "react";
import { useModal } from "@hooks/useModal";
import { Modal, Track, TrackMenu } from "@components/index";
import style from "./index.module.css";

interface IProps {
  tracks: ITrack[];
}

export const TrackList: FC<IProps> = ({ tracks }) => {
  const [selected, setSelected] = useState<ITrack | null>(null);
  const [trackModal, toggleTrackModal] = useModal();

  const openModal = (track: ITrack) => {
    setSelected(track);
    toggleTrackModal();
  };

  return (
    <div className={style.Container}>
      {tracks.map((track) => (
        <Track track={track} openMenu={openModal} key={track._key || track._id} />
      ))}

      {trackModal && (
        <Modal toggleOpen={toggleTrackModal}>
          <TrackMenu track={selected} toggleOpen={toggleTrackModal} />
        </Modal>
      )}
    </div>
  );
};
