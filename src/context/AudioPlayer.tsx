import { createContext, useContext, useState } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlist: ITrack[];
  setPlaylist: Dispatch<SetStateAction<ITrack[]>>;
}

const AudioPlayer = createContext<IContext>({
  playlist: [],
  setPlaylist: () => {},
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [playlist, setPlaylist] = useState<ITrack[]>([]);

  return (
    <AudioPlayer.Provider value={{ playlist, setPlaylist }}>
      {props.children}
    </AudioPlayer.Provider>
  )
}

export const useAudioPlayer = () => useContext(AudioPlayer);
