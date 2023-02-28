import type { MouseEvent } from "react";
import type { ISelected, ITrack } from "@global/types";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { useAudioPlayer } from "@context/AudioPlayer";
import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import AddTrack from "@components/Dialog/AddTrack";
import Button from "@components/Button";
import Login from "@components/Dialog/Login";
import RemoveTrack from "@components/Dialog/RemoveTrack";
import Track from "@components/Track";
import Style from "./index.module.css";

interface IProps {
  pid?: string;
  play: (track: ISelected) => void;
  tracks: ITrack[];
}

export default function Tracks({ pid, play, tracks }: IProps) {
  const [selected, setSelected] = useState<ISelected | null>(null);
  const [toggleMenu, TrackMenu] = useMenu();
  const [openAdd, closeAdd, AddModal] = useModal();
  const [openRemove, closeRemove, RemoveModal] = useModal();
  const [openLogin, closeLogin, LoginModal] = useModal();
  const { status } = useSession();
  const { player } = useAudioPlayer();

  function menu(e: MouseEvent<HTMLButtonElement>, track: ISelected) {
    if (status === "authenticated") {
      setSelected(track);
      toggleMenu(e);
    } else {
      openLogin();
    }
  }

  function queueTrack() {
    if (selected) {
      player.setQueue((queue) => {
        return [...queue, selected.track];
      });
    }
  }

  return (
    <div className={Style.List}>
      {tracks.map((track, index) => (
        <Track data={{ track, index }} play={play} menu={menu} key={track._key || track._id} />
      ))}

      <TrackMenu>
        <div>
          <Button onClick={openAdd} align="left">
            Add to Playlist...
          </Button>
          {pid && (
            <Button onClick={openRemove} align="left">
              Remove from Playlist
            </Button>
          )}
          <Button onClick={queueTrack} align="left">
            Queue
          </Button>
        </div>
      </TrackMenu>

      {selected && (
        <AddModal>
          <AddTrack selected={selected} closeDialog={closeAdd} />
        </AddModal>
      )}

      {pid && selected && (
        <RemoveModal>
          <RemoveTrack selected={selected} pid={pid} closeDialog={closeRemove} />
        </RemoveModal>
      )}

      <LoginModal>
        <Login closeDialog={closeLogin} />
      </LoginModal>
    </div>
  );
}
