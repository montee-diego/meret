import type { FC, ReactNode } from "react";
import type { IPlaylistMin } from "@global/types";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { usePlaylists } from "@reducers/usePlaylists";
import { onCreate, onDelete, onFetch, onRename, onSub, onUnsub } from "@services/meret/playlists";
import { onAddItem, onDeleteItem } from "@services/meret/playlistsItems";

interface IProps {
  children: ReactNode;
}

interface IContext {
  playlists: {
    data: IPlaylistMin[];
    fetchError: boolean;
    fetch: () => Promise<unknown>;
    create: (name: string) => Promise<unknown>;
    delete: (pid: string, redirect: boolean) => Promise<unknown>;
    rename: (pid: string, name: string) => Promise<unknown>;
    subscribe: (pid: string) => Promise<unknown>;
    unsubscribe: (pid: string) => Promise<unknown>;
    addItem: (pid: string, trackId: string) => void;
    deleteItem: (trackId: string | undefined) => void;
    subs: IPlaylistMin[];
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
    addItem: () => {},
    deleteItem: () => {},
    subs: [],
  },
});

export const UserContext: FC<IProps> = (props) => {
  const { status } = useSession();
  const [data, dispatch] = usePlaylists();
  const [isFetchError, setIsFetchError] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const router = useRouter();

  function reload(pid: string, msg: string, redirect: boolean = false) {
    if (router.query.pid && router.query.pid === pid) {
      if (redirect) {
        router.replace("/");
      } else {
        router.replace(router.asPath, "", {
          scroll: false,
        });
      }
    }

    setIsRunning(false);
    return msg;
  }

  function error(msg: string) {
    setIsRunning(false);
    return msg;
  }

  const playlists = {
    data: data.playlists,
    fetchError: isFetchError,
    fetch: async () => {
      const request = onFetch(dispatch);
      const status = await request.then((done) => "success").catch((error) => "error");

      if (status === "success") {
        setIsFetchError(false);
      } else {
        setIsFetchError(true);
      }

      //return await request.then((done) => "success").catch((error) => "error");
    },
    create: async (name: string) => {
      if (typeof name !== "string") {
        return;
      }

      const request = toast.promise(onCreate(name, dispatch), {
        loading: "Creating playlist...",
        success: "Playlist created!",
        error: "Failed to create playlist",
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    delete: async (pid: string, redirect: boolean) => {
      if (isRunning || typeof pid !== "string") {
        return;
      }

      const request = toast.promise(onDelete(pid, dispatch), {
        loading: "Deleting playlist...",
        success: () => reload(pid, "Playlist deleted!", redirect),
        error: "Failed to delete playlist",
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    rename: async (pid: string, name: string) => {
      if (isRunning || typeof pid !== "string" || typeof name !== "string") {
        return;
      }

      const request = toast.promise(onRename(pid, name, dispatch), {
        loading: "Renaming playlist...",
        success: () => reload(pid, "Playlist renamed!"),
        error: () => error("Failed to rename playlist"),
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    subscribe: async (pid: string) => {
      if (isRunning || typeof pid !== "string") {
        return;
      }

      setIsRunning(true);
      const request = toast.promise(onSub(pid, dispatch), {
        loading: "Subscribing...",
        success: () => reload(pid, "Subscribed!"),
        error: () => error("Failed to subscribe"),
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    unsubscribe: async (pid: string) => {
      if (isRunning || typeof pid !== "string") {
        return;
      }

      setIsRunning(true);
      const request = toast.promise(onUnsub(pid, dispatch), {
        loading: "Unsubscribing...",
        success: () => reload(pid, "Unsubscribed!"),
        error: () => error("Failed to unsubscribe"),
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    addItem: (pid: string, trackId: string) => {
      if (isRunning || typeof pid !== "string" || typeof trackId !== "string") {
        return;
      }

      setIsRunning(true);
      toast.promise(onAddItem(pid, trackId), {
        loading: "Adding to playlist...",
        success: () => reload(pid, "Added to playlist!"),
        error: () => error("Failed to add to playlist"),
      });
    },
    deleteItem: (trackId: string | undefined) => {
      const { pid } = router.query;

      if (isRunning || typeof pid !== "string" || typeof trackId !== "string") {
        return;
      }

      setIsRunning(true);
      toast.promise(onDeleteItem(pid, trackId), {
        loading: "Removing track...",
        success: () => reload(pid, "Removed from playlist!"),
        error: () => error("Failed to remove from playlist"),
      });
    },
    subs: data.subscriptions,
  };

  useEffect(() => {
    if (status === "authenticated") {
      playlists.fetch();
    }
  }, [status]);

  return <User.Provider value={{ playlists }}>{props.children}</User.Provider>;
};

export const useUser = () => useContext(User);
