import type { FC } from "react";
import type { ITrack } from "@global/types";
import { Track } from "@components/index";
import style from "./index.module.css";

interface IProps {
  tracks: ITrack[];
}

export const TrackList: FC<IProps> = ({ tracks }) => {
  return (
    <section className={style.Container}>
      {tracks.map((track) => (
        <Track track={track} key={track._id} />
      ))}
    </section>
  );
};
