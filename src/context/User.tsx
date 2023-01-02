import { createContext, useContext, useState } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { IPlaylist } from "@global/types";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlists: IPlaylist[];
  setPlaylists: Dispatch<SetStateAction<IPlaylist[]>>;
}

const User = createContext<IContext>({
  playlists: [],
  setPlaylists: () => {},
});

export const UserContext: FC<IProps> = (props) => {
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  return (
    <User.Provider value={{ playlists, setPlaylists }}>
      {props.children}
    </User.Provider>
  );
};

export const useUser = () => useContext(User);
