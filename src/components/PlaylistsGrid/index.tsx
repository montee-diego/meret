import type { ReactNode } from "react";
import type { IPlaylistCard } from "@global/types";
import Link from "next/link";

import { formatTrackCount } from "@global/utils";
import Cover from "@components/Cover";
import css from "./index.module.css";

interface IProps {
  children: ReactNode;
  playlists: IPlaylistCard[];
}

export default function PlaylistsGrid({ children, playlists }: IProps) {
  return (
    <div>
      {children}
      <div className={css.Container}>
        {playlists.map((playlist) => (
          <Link className={css.Item} href={`/playlist/${playlist._id}`} key={playlist._id}>
            <Cover cover={playlist.cover} size="100%" />

            <div className={css.Details}>
              <h4>{playlist.name}</h4>
              <p>{formatTrackCount(playlist.total)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
