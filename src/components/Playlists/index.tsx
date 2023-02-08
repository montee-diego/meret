import type { FC } from "react";
import type { IPlaylistMin } from "@global/types";

import { ButtonText } from "@components/index";
import style from "./index.module.css";

interface IProps {
  onClick?: (id: string) => void;
  playlists: IPlaylistMin[];
}

export const Playlists: FC<IProps> = ({ onClick, playlists }) => {
  return (
    <ul className={style.List}>
      {playlists.map((playlist) => (
        <li key={playlist._id}>
          {onClick ? (
            <ButtonText onClick={() => onClick(playlist._id)} align="left">
              {playlist.name}
            </ButtonText>
          ) : (
            <ButtonText href={`/playlist/${playlist._id}`} align="left">
              {playlist.name}
            </ButtonText>
          )}
        </li>
      ))}
    </ul>
  );
};
