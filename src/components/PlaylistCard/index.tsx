import type { FC } from "react";
import type { IPlaylist } from "@global/types";

import { Cover } from "@components/index";
import Link from "next/link";
import style from "./index.module.css";

interface IProps {
  playlist: IPlaylist;
}

export const PlaylistCard: FC<IProps> = ({ playlist }) => {
  return (
    <Link className={style.Container} href={`/playlist/${playlist._id}`}>
      <Cover cover={playlist.cover} size="100%" />

      <div className={style.Details}>
        <h4>{playlist.name}</h4>
        <p>
          {playlist.total}
          {playlist.total === 1 ? " track" : " tracks"}
        </p>
      </div>
    </Link>
  );
};
