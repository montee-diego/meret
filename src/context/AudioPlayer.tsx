import { createContext, useContext, useState } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ISong } from "@global/types";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlist: ISong[];
  setPlaylist: Dispatch<SetStateAction<ISong[]>>;
}

const AudioPlayer = createContext<IContext>({
  playlist: [],
  setPlaylist: () => {},
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [playlist, setPlaylist] = useState<ISong[]>([]);

  return (
    <AudioPlayer.Provider value={{ playlist, setPlaylist }}>
      {props.children}
    </AudioPlayer.Provider>
  )
}

export const useAudioPlayer = () => useContext(AudioPlayer);
