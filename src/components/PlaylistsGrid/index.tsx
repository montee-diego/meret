import type { IPlaylistCard } from "@global/types";
import Link from "next/link";

import { formatTrackCount } from "@utils/display";
import Cover from "@components/Cover";
import Style from "./index.module.css";

interface IProps {
  playlists: IPlaylistCard[];
}

export default function PlaylistsGrid({ playlists }: IProps) {
  return (
    <div className={Style.Container}>
      {playlists.map(({ _id, cover, name, total }) => (
        <Link className={Style.Item} href={`/playlist/${_id}`} key={_id}>
          <Cover cover={cover} size="100%" />

          <div className={Style.Details}>
            <h4>{name}</h4>
            <p>{formatTrackCount(total)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
