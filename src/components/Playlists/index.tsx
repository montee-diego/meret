import type { IPlaylistCard } from "@global/types";
import Link from "next/link";

import { formatTrackCount } from "@global/utils";
import Cover from "@components/Cover";
import css from "./index.module.css";

interface IProps {
  playlists: IPlaylistCard[];
}

export default function Playlists({ playlists }: IProps) {
  return (
    <>
      {playlists.map((playlist) => (
        <Link className={css.Container} href={`/playlist/${playlist._id}`} key={playlist._id}>
          <Cover cover={playlist.cover} size="100%" />

          <div className={css.Details}>
            <h4>{playlist.name}</h4>
            <p>{formatTrackCount(playlist.total)}</p>
          </div>
        </Link>
      ))}
    </>
  );
}
