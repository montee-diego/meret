import type { MouseEvent } from "react";
import type { ISelected, ITrack } from "@global/types";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { useMenu } from "@hooks/useMenu";
import { useModal } from "@hooks/useModal";
import AddToPlaylist from "@components/AddToPlaylist";
import Button from "@components/Button";
import ConfirmDialog from "@components/ConfirmDialog";
import CreatePlaylist from "@components/CreatePlaylist";
import Login from "@components/Login";
import Track from "@components/Track";
import TrackModalTitle from "@components/TrackModalTitle";
import css from "./index.module.css";

interface IProps {
  tracks: ITrack[];
  play: (track: ISelected) => void;
  remove?: (track: ISelected) => void;
}

export default function Tracks({ tracks, play, remove }: IProps) {
  const [selected, setSelected] = useState<ISelected | null>(null);
  const [toggleMenu, TrackMenu] = useMenu();
  const [toggleAddTo, AddToModal] = useModal();
  const [toggleRemoveFrom, RemoveFromModal] = useModal();
  const [toggleLoginModal, LoginModal] = useModal();
  const { status } = useSession();

  function menu(e: MouseEvent<HTMLButtonElement>, track: ISelected) {
    if (status === "authenticated") {
      setSelected(track);
      toggleMenu(e);
    } else {
      toggleLoginModal();
    }
  }

  return (
    <div className={css.List}>
      {tracks.map((track, index) => (
        <Track data={{ track, index }} play={play} menu={menu} key={track._key || track._id} />
      ))}

      <TrackMenu>
        <div>
          <Button onClick={toggleAddTo} align="left">
            Add to Playlist...
          </Button>
          {remove && (
            <Button onClick={toggleRemoveFrom} align="left">
              Remove from Playlist
            </Button>
          )}
          <Button onClick={() => {}} align="left">
            Queue
          </Button>
        </div>
      </TrackMenu>

      {selected && (
        <AddToModal>
          <TrackModalTitle track={selected.track} toggleOpen={toggleAddTo} />
          <div className={css.AddTo}>
            <CreatePlaylist />
            <AddToPlaylist trackId={selected.track._id} />
          </div>
        </AddToModal>
      )}

      {remove && selected && (
        <RemoveFromModal>
          <TrackModalTitle track={selected.track} toggleOpen={toggleRemoveFrom} />
          <ConfirmDialog onCancel={toggleRemoveFrom} onConfirm={() => {}}>
            <p>Are you sure you want to delete this track? This action cannot be undone.</p>
          </ConfirmDialog>
        </RemoveFromModal>
      )}

      <LoginModal>
        <Login toggleOpen={toggleLoginModal} />
      </LoginModal>
    </div>
  );
}
