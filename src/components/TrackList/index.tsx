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
  const { isOpen, toggleOpen } = useModal();

  const openModal = (track: ITrack) => {
    setSelected(track);
    toggleOpen();
  };

  return (
    <>
      <div className={style.Container}>
        {tracks.map((track) => (
          <Track track={track} openMenu={openModal} key={track._key || track._id} />
        ))}
      </div>

      {isOpen && (
        <Modal toggleOpen={toggleOpen}>
          <TrackMenu track={selected} toggleOpen={toggleOpen} />
        </Modal>
      )}
    </>
  );
};
