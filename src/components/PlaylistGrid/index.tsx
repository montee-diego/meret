import type { FC } from "react";
import type { IPlaylist } from "@global/types";

import { PlaylistCard } from "@components/index";
import style from "./index.module.css";

interface IProps {
  playlists: IPlaylist[];
  title?: string;
}

export const PlaylistGrid: FC<IProps> = ({ playlists, title }) => {
  return (
    <div className={style.Container}>
      {title && <h3>{title}</h3>}
      <div className={style.Content}>
        {playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist._id} />
        ))}
      </div>
    </div>
  );
};
