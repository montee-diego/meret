import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";

import { createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playerOpen: boolean;
  playlist: ITrack[];
  setPlayerOpen: Dispatch<SetStateAction<boolean>>;
  setPlaylist: Dispatch<SetStateAction<ITrack[]>>;
}

const AudioPlayer = createContext<IContext>({
  playerOpen: false,
  playlist: [],
  setPlayerOpen: () => {},
  setPlaylist: () => {},
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [playerOpen, setPlayerOpen] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<ITrack[]>([]);

  return (
    <AudioPlayer.Provider value={{ playerOpen, playlist, setPlayerOpen, setPlaylist }}>
      {props.children}
    </AudioPlayer.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayer);
