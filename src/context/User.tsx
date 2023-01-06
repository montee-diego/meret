import type { FC, ReactNode } from "react";
import type { IPlaylist } from "@global/types";

import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { fetchPls, createPls, deletePls } from "@services/meret/playlists";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlists: {
    data: IPlaylist[];
    fetch: () => Promise<any>;
    create: (name: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
  };
}

const DummyPromise = new Promise((resolve, reject) => {});

const User = createContext<IContext>({
  playlists: {
    data: [],
    fetch: () => DummyPromise,
    create: () => DummyPromise,
    delete: () => DummyPromise,
  },
});

export const UserContext: FC<IProps> = (props) => {
  const [data, setData] = useState<IPlaylist[]>([]);

  function onFetch(data: IPlaylist[]): void {
    setData(data);
  }

  const onCreate = (playlist: IPlaylist): void => {
    setData((prevState) => [...prevState, playlist]);
  };

  const onDelete = (id: string): void => {
    setData((prevState) => prevState.filter((pls) => pls._id !== id));
  };

  const playlists = {
    data: data,
    fetch: async () => {
      const request = fetchPls(onFetch);

      return await request.then((done) => "success").catch((error) => "error");
    },
    create: async (name: string) => {
      const request = createPls(name, onCreate);

      toast.promise(request, {
        loading: "Creating playlist...",
        success: "Playlist created!",
        error: "Failed to create playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    delete: async (id: string) => {
      const request = deletePls(id, onDelete);

      toast.promise(request, {
        loading: "Deleting playlist...",
        success: "Playlist deleted!",
        error: "Failed to delete playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
  };

  return <User.Provider value={{ playlists }}>{props.children}</User.Provider>;
};

export const useUser = () => useContext(User);
