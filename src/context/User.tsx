import type { FC, ReactNode } from "react";
import type { IPlaylist } from "@global/types";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { usePlaylists } from "@reducers/usePlaylists";
import { useSubscriptions } from "@reducers/useSubscriptions";
import {
  fetchPls,
  createPls,
  deletePls,
  renamePls,
  subscribePls,
  unsubscribePls,
} from "@services/meret/playlists";
import { addItemTo } from "@services/meret/playlistsItems";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlists: {
    data: IPlaylist[];
    fetchError: boolean;
    fetch: () => Promise<any>;
    create: (name: string) => Promise<any>;
    delete: (id: string) => Promise<any>;
    rename: (id: string, name: string) => Promise<any>;
    subscribe: (id: string) => Promise<any>;
    unsubscribe: (id: string) => Promise<any>;
    addItem: (playlist: string, track: string) => Promise<any>;
    subs: IPlaylist[];
  };
}

const DummyPromise = new Promise((resolve, reject) => {});

const User = createContext<IContext>({
  playlists: {
    data: [],
    fetchError: false,
    fetch: () => DummyPromise,
    create: () => DummyPromise,
    delete: () => DummyPromise,
    rename: () => DummyPromise,
    subscribe: () => DummyPromise,
    unsubscribe: () => DummyPromise,
    addItem: () => DummyPromise,
    subs: [],
  },
});

export const UserContext: FC<IProps> = (props) => {
  const { status } = useSession();
  const [data, dispatch] = usePlaylists();
  const [subs, dispatch2] = useSubscriptions();
  const [isFetchError, setIsFetchError] = useState<boolean>(false);

  const playlists = {
    data: data,
    fetchError: isFetchError,
    fetch: async () => {
      const request = fetchPls(dispatch);
      const status = await request.then((done) => "success").catch((error) => "error");

      if (status === "success") {
        setIsFetchError(false);
      } else {
        setIsFetchError(true);
      }

      //return await request.then((done) => "success").catch((error) => "error");
    },
    create: async (name: string) => {
      const request = toast.promise(createPls(name, dispatch), {
        loading: "Creating playlist...",
        success: "Playlist created!",
        error: "Failed to create playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    delete: async (id: string) => {
      const request = toast.promise(deletePls(id, dispatch), {
        loading: "Deleting playlist...",
        success: "Playlist deleted!",
        error: "Failed to delete playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    rename: async (id: string, name: string) => {
      const request = toast.promise(renamePls(id, name, dispatch), {
        loading: "Renaming playlist...",
        success: "Playlist renamed!",
        error: "Failed to rename playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    subscribe: async function (id: string) {
      const request = toast.promise(subscribePls(id, dispatch2), {
        loading: "Subscribing...",
        success: "Done!",
        error: "Failed",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    unsubscribe: async function (id: string) {
      const request = toast.promise(unsubscribePls(id, dispatch2), {
        loading: "Unsubscribing...",
        success: "Done!",
        error: "Failed",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    addItem: async (playlist: string, track: string) => {
      const request = toast.promise(addItemTo(playlist, track), {
        loading: "Adding to playlist...",
        success: "Added to playlist!",
        error: "Failed to add to playlist",
      });

      return await request.then((done) => "success").catch((error) => "error");
    },
    subs: subs,
  };

  useEffect(() => {
    if (status === "authenticated") {
      playlists.fetch();
    }
  }, [status]);

  return <User.Provider value={{ playlists }}>{props.children}</User.Provider>;
};

export const useUser = () => useContext(User);
