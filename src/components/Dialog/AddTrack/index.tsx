import type { MouseEvent } from "react";
import type { ISelected } from "@global/types";
import { Fragment } from "react";

import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import Button from "@components/Button";
import CreatePlaylist from "@components/CreatePlaylist";
import DialogTitle from "@components/DialogTitle";
import Style from "./index.module.css";

interface IProps {
  selected: ISelected;
  closeDialog: () => void;
}

export default function AddTrack({ selected, closeDialog }: IProps) {
  const { data, meret } = useMeret();
  const { player } = useAudioPlayer();
  const { track } = selected;

  async function handleAddTrack(e: MouseEvent<HTMLButtonElement>, pid: string) {
    const target = e.target as HTMLButtonElement;
    target.disabled = true;

    try {
      await meret.addToPlaylist(pid, track._id);
      player.syncPlaylist(pid, player.data.index);
    } catch (error) {}

    target.disabled = false;
  }

  return (
    <Fragment>
      <DialogTitle track={track} closeDialog={closeDialog} />

      <div className={Style.Content} tabIndex={-1}>
        <CreatePlaylist />

        <ul className={Style.List}>
          {data.playlists.map(({ _id, name }) => (
            <li key={_id}>
              <Button onClick={(e) => handleAddTrack(e, _id)} align="left">
                {name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
