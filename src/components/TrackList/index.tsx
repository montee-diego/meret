import type { FC } from "react";
import type { ITrack } from "@global/types";
import { Loading, Track } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isLoading: boolean;
  tracks: ITrack[];
}

export const TrackList: FC<IProps> = ({ isLoading, tracks }) => {
  if (isLoading) return <Loading />;

  return (
    <div className={style.Container}>
      {tracks.map((track) => <Track track={track} key={track._id} />)}
    </div>
  );
};
