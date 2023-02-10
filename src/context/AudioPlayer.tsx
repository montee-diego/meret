import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";

import { createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IData {
  index: number;
  playlistId: string | null;
  tracks: ITrack[];
}

interface IContext {
  player: {
    data: IData;
    isOpen: boolean;
    setData: Dispatch<SetStateAction<IData>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
  }
}

const AudioPlayer = createContext<IContext>({
  player: {
    data: {
      index: 0,
      playlistId: null,
      tracks: [],
    },
    isOpen: false,
    setData: () => {},
    setIsOpen: () => {},
  }
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [data, setData] = useState<IData>({ index: 0, playlistId: null, tracks: [] });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const player = {
    data,
    isOpen,
    setData,
    setIsOpen,
  }

  return (
    <AudioPlayer.Provider value={{ player }}>
      {props.children}
    </AudioPlayer.Provider>
  );
};

export const useAudioPlayer = () => useContext(AudioPlayer);
