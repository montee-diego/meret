import { createContext, useContext, useState } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ISong } from "@global/types";

interface IProps {
  children: ReactNode;
}

interface IContext {
  play: ISong | null;
  setPlay: Dispatch<SetStateAction<ISong | null>> | null;
}

const NowPlaying = createContext<IContext>({
  play: null,
  setPlay: null,
});

export const NowPlayingContext: FC<IProps> = (props) => {
  const [play, setPlay] = useState<ISong | null>(null);

  return (
    <NowPlaying.Provider value={{ play, setPlay }}>
      {props.children}
    </NowPlaying.Provider>
  )
}

export const useNowPlaying = () => useContext(NowPlaying);
