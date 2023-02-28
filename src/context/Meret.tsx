import type { FC, ReactNode } from "react";
import type { IPlaylistMin } from "@global/types";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { usePlaylists } from "@reducers/usePlaylists";

import { MeretAPI } from "@services/meret/api";
import ToastAction from "@components/ToastAction";

interface IProps {
  children: ReactNode;
}

interface IData {
  playlists: IPlaylistMin[];
  subscriptions: IPlaylistMin[];
}

interface IMeret {
  fetch: () => Promise<unknown>;
  create: (name: string) => Promise<unknown>;
  delete: (pid: string, redirect: boolean) => Promise<unknown>;
  rename: (pid: string, name: string) => Promise<unknown>;
  subscribe: (pid: string) => Promise<unknown>;
  unsubscribe: (pid: string) => Promise<unknown>;
  addToPlaylist: (pid: string, track: string) => Promise<unknown>;
  removeFromPlaylist: (pid: string, track: string) => Promise<unknown>;
}

interface IContext {
  data: IData;
  meret: IMeret & any;
}

const DummyPromise = new Promise((resolve, reject) => {});

const Meret = createContext<IContext>({
  data: {
    playlists: [],
    subscriptions: [],
  },
  meret: {
    fetch: () => DummyPromise,
    create: () => DummyPromise,
    delete: () => DummyPromise,
    rename: () => DummyPromise,
    subscribe: () => DummyPromise,
    unsubscribe: () => DummyPromise,
    addToPlaylist: () => DummyPromise,
    removeFromPlaylist: () => DummyPromise,
  },
});

const api = new MeretAPI();

export const MeretContext: FC<IProps> = (props) => {
  const { status } = useSession();
  const [meretData, dispatch] = usePlaylists();
  const router = useRouter();

  function refetchPage(pid: string, redirect: boolean = false) {
    if (router.query.pid && router.query.pid === pid) {
      if (redirect) {
        router.replace("/");
      } else {
        router.replace(router.asPath, "", {
          scroll: false,
        });
      }
    }
  }

  const data: IData = meretData;

  const meret: IMeret = {
    fetch: () => {
      const promise = api.get(`/api/playlists`);
      promise
        .then((data) => {
          dispatch({ type: "onFetch", payload: data });
          toast.dismiss("fetch");
        })
        .catch(() => {
          toast.error(
            (t) => (
              <ToastAction t={t} onClick={meret.fetch}>
                Failed to fetch data
              </ToastAction>
            ),
            { id: "fetch", duration: Infinity }
          );
        });

      return promise;
    },

    create: (name) => {
      const promise = api.post(`/api/playlists/`, { name });
      const messages = {
        loading: "Creating Playlist...",
        success: (data: any) => {
          dispatch({ type: "onCreate", payload: data });
          return "Playlist Created!";
        },
        error: "Failed to Create Playlist",
      };

      return toast.promise(promise, messages);
    },

    delete: (pid) => {
      const promise = api.delete(`/api/playlists/${pid}`);
      const messages = {
        loading: "Deleting Playlist...",
        success: (data: any) => {
          dispatch({ type: "onDelete", payload: data });
          refetchPage(pid, true);
          return "Playlist Deleted!";
        },
        error: "Failed to Delete Playlist",
      };

      return toast.promise(promise, messages);
    },

    rename: (pid, name) => {
      const promise = api.post(`/api/playlists/${pid}`, { name });
      const messages = {
        loading: "Renaming Playlist...",
        success: (data: any) => {
          dispatch({ type: "onRename", payload: data });
          refetchPage(pid);
          return "Playlist Renamed!";
        },
        error: "Failed to Rename Playlist",
      };

      return toast.promise(promise, messages);
    },

    subscribe: (pid) => {
      const promise = api.post(`/api/playlists/subscribe/${pid}`);
      const messages = {
        loading: "Subscribing...",
        success: (data: any) => {
          dispatch({ type: "onSub", payload: data.subs });
          refetchPage(pid);
          return "Subscribed!";
        },
        error: "Failed to Subscribe",
      };

      return toast.promise(promise, messages);
    },

    unsubscribe: (pid) => {
      const promise = api.delete(`/api/playlists/subscribe/${pid}`);
      const messages = {
        loading: "Unsubscribing...",
        success: (data: any) => {
          dispatch({ type: "onSub", payload: data.subs });
          refetchPage(pid);
          return "Unsubscribed!";
        },
        error: "Failed to unsubscribe",
      };

      return toast.promise(promise, messages);
    },

    addToPlaylist: (pid, track) => {
      const promise = api.post(`/api/playlists/edit/${pid}`, { track });
      const messages = {
        loading: "Adding Track...",
        success: () => {
          refetchPage(pid);
          return "Track Added!";
        },
        error: "Failed to Add Track",
      };

      return toast.promise(promise, messages);
    },

    removeFromPlaylist: (pid, track) => {
      const promise = api.delete(`/api/playlists/edit/${pid}`, { track });
      const messages = {
        loading: "Removing Track...",
        success: () => {
          refetchPage(pid);
          return "Track Removed!";
        },
        error: "Failed to Remove Track",
      };

      return toast.promise(promise, messages);
    },
  };

  useEffect(() => {
    if (status === "authenticated") {
      meret.fetch();
    }
  }, [status]);

  return <Meret.Provider value={{ data, meret }}>{props.children}</Meret.Provider>;
};

export const useMeret = () => useContext(Meret);
