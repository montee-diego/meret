import type { ReactNode } from "react";
import type { IPlaylistCard } from "@global/types";
import Link from "next/link";

import { formatTrackCount } from "@global/utils";
import Cover from "@components/Cover";
import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  playlists: IPlaylistCard[];
}

export default function PlaylistsGrid({ children, playlists }: IProps) {
  return (
    <div>
      {children}
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
    </div>
  );
}
