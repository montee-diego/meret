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
  addItem: (pid: string, trackId: string) => Promise<unknown>;
  deleteItem: (trackId: string | undefined) => Promise<unknown>;
}

interface IContext {
  data: IData;
  meret: IMeret;
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
    addItem: () => DummyPromise,
    deleteItem: () => DummyPromise,
  },
});

export const MeretContext: FC<IProps> = (props) => {
  const { status } = useSession();
  const [meretData, dispatch] = usePlaylists();
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

  const data: IData = meretData;
  const meret: IMeret = {
    fetch: async () => {
      const request = onFetch(dispatch);
      const response = await request.then(() => "OK").catch(() => "NOK");

      if (response === "NOK") {
        toast.error(
          (t) => {
            const buttonStyles = { color: "inherit", fontSize: "inherit", fontWeight: "700" };

            function handleRetry() {
              meret.fetch();
              toast.dismiss(t.id);
            }

            return (
              <div style={{ display: "flex", gap: "5px" }}>
                <span>Failed to fetch user data.</span>
                <button onClick={handleRetry} style={buttonStyles}>
                  Retry
                </button>
              </div>
            );
          },
          {
            id: "fetch",
            duration: Infinity,
          }
        );
      } else {
        try {
          toast.dismiss("fetch");
        } catch {}
      }
    },
    create: async (name) => {
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
    delete: async (pid, redirect) => {
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
    rename: async (pid, name) => {
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
    subscribe: async (pid) => {
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
    unsubscribe: async (pid) => {
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
    addItem: async (pid, trackId) => {
      if (isRunning || typeof pid !== "string" || typeof trackId !== "string") {
        return;
      }

      setIsRunning(true);
      const request = toast.promise(onAddItem(pid, trackId), {
        loading: "Adding to playlist...",
        success: () => reload(pid, "Added to playlist!"),
        error: () => error("Failed to add to playlist"),
      });

      return await request.then(() => "OK").catch(() => "NOK");
    },
    deleteItem: async (trackId) => {
      const { pid } = router.query;

      if (isRunning || typeof pid !== "string" || typeof trackId !== "string") {
        return;
      }

      setIsRunning(true);
      const request = toast.promise(onDeleteItem(pid, trackId), {
        loading: "Removing track...",
        success: () => reload(pid, "Removed from playlist!"),
        error: () => error("Failed to remove from playlist"),
      });

      return await request.then(() => "OK").catch(() => "NOK");
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
