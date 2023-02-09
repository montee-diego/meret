import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";

import { createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IContext {
  player: {
    index: number;
    isOpen: boolean;
    playlist: ITrack[];
    setIndex: Dispatch<SetStateAction<number>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setPlaylist: Dispatch<SetStateAction<ITrack[]>>;
  }
}

const AudioPlayer = createContext<IContext>({
  player: {
    index: 0,
    isOpen: false,
    playlist: [],
    setIndex: () => {},
    setIsOpen: () => {},
    setPlaylist: () => {},
  }
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [index, setIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<ITrack[]>([]);

  const player = {
    index,
    isOpen,
    playlist,
    setIndex,
    setIsOpen,
    setPlaylist,
  }

  return (
    <AudioPlayer.Provider value={{ player }}>
      {props.children}
    </AudioPlayer.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayer);
