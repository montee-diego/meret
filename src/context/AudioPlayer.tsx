import type { FC, ReactNode, Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";

import { createContext, useContext, useState } from "react";

interface IProps {
  children: ReactNode;
}

interface IData {
  index: number;
  isSync: boolean;
  playlistId: string | null;
  tracks: ITrack[];
}

interface IContext {
  player: {
    data: IData;
    isOpen: boolean;
    isSyncError: boolean;
    isSyncing: boolean;
    setData: Dispatch<SetStateAction<IData>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    syncPlaylist: (pid: string, removeIndex: number) => {};
  };
}

const initialData: IData = {
  index: 0,
  isSync: false,
  playlistId: null,
  tracks: [],
};

const AudioPlayer = createContext<IContext>({
  player: {
    data: initialData,
    isOpen: false,
    isSyncError: false,
    isSyncing: false,
    setData: () => {},
    setIsOpen: () => {},
    syncPlaylist: async () => {},
  },
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [data, setData] = useState<IData>(initialData);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSyncError, setIsSyncError] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  async function syncPlaylist(pid: string = "", removeIndex: number) {
    // Check if the playlist being modified is playing
    if (pid === data.playlistId) {
      setIsSyncError(false);
      setIsSyncing(true);
      const request = await fetch(`/api/player/${data.playlistId}`);

      if (!request.ok) {
        setIsSyncError(true);
        setIsSyncing(false);
        return;
      }

      const content = await request.json();

      if (content) {
        const tracks = content.tracks;
        const playingIndex = data.index;
        let newIndex = playingIndex;

        if (tracks.length && playingIndex > 0) {
          if (tracks.length <= playingIndex) {
            newIndex = tracks.length - 1;
          } else if (removeIndex <= playingIndex) {
            newIndex = playingIndex - 1;
          }
          // if (tracks.length === playingIndex || removeIndex < playingIndex) {
          //   newIndex = playingIndex - 1;
          // }

          setData({ ...data, index: newIndex, isSync: true, tracks });
        } else {
          setData({ ...data, index: 0, isSync: true, tracks });
        }
      } else {
        setIsSyncError(true);
      }

      setIsSyncing(false);
    }
  }

  const player = {
    data,
    isOpen,
    isSyncError,
    isSyncing,
    setData,
    setIsOpen,
    syncPlaylist,
  };

  return <AudioPlayer.Provider value={{ player }}>{props.children}</AudioPlayer.Provider>;
};

export const useAudioPlayer = () => useContext(AudioPlayer);
