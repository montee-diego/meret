import { useModal } from "src/hooks/useModal";
import { Modal, Track, TrackMenu } from "@components/index";
import type { FC } from "react";
import type { ITrack } from "@global/types";
import style from "./index.module.css";

interface IProps {
  tracks: ITrack[];
}

export const TrackList: FC<IProps> = ({ tracks }) => {
  const { content, setContent } = useModal();

  return (
    <>
      <div className={style.Container}>
        {tracks.map((track) => (
          <Track track={track} setContent={setContent} key={track._id} />
        ))}
      </div>

      {content && (
        <Modal setContent={setContent}>
          <TrackMenu content={content} setContent={setContent} />
        </Modal>
      )}
    </>
  );
};
