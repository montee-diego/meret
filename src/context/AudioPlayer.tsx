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
    isSyncError: boolean;
    isSyncing: boolean;
    setData: Dispatch<SetStateAction<IData>>;
    setQueue: Dispatch<SetStateAction<ITrack[]>>;
    syncPlaylist: (pid: string, removeIndex: number) => {};
    queue: ITrack[];
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
    isSyncError: false,
    isSyncing: false,
    setData: () => {},
    setQueue: () => {},
    syncPlaylist: async () => {},
    queue: [],
  },
});

export const AudioPlayerContext: FC<IProps> = (props) => {
  const [data, setData] = useState<IData>(initialData);
  const [isSyncError, setIsSyncError] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [queue, setQueue] = useState<ITrack[]>([]);

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
          // Removed track
          if (tracks.length < data.tracks.length) {
            if (tracks.length <= playingIndex || removeIndex <= playingIndex) {
              newIndex = playingIndex - 1;
            }
          }

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
    isSyncError,
    isSyncing,
    setData,
    syncPlaylist,
    queue,
    setQueue,
  };

  return <AudioPlayer.Provider value={{ player }}>{props.children}</AudioPlayer.Provider>;
};

export const useAudioPlayer = () => useContext(AudioPlayer);
