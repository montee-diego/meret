import type { ISelected } from "@global/types";
import { Fragment } from "react";

import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import Button from "@components/Button";
import DialogActions from "@components/DialogActions";
import DialogMessage from "@components/DialogMessage";
import DialogTitle from "@components/DialogTitle";

interface IProps {
  selected: ISelected;
  closeDialog: () => void;
  pid: string;
}

export default function RemoveTrack({ selected, closeDialog, pid }: IProps) {
  const { meret } = useMeret();
  const { player } = useAudioPlayer();
  const { index, track } = selected;

  async function handleRemove() {
    const trackItem = document.querySelector(`fieldset[data-key="${track._key}"]`);

    if (trackItem instanceof HTMLFieldSetElement) {
      trackItem.disabled = true;
    }

    closeDialog();

    try {
      await meret.removeFromPlaylist(pid, track._key);
      player.syncPlaylist(pid, index);
    } catch (error) {
      if (trackItem instanceof HTMLFieldSetElement) {
        trackItem.disabled = false;
      }
    }
  }

  return (
    <Fragment>
      <DialogTitle track={track} closeDialog={closeDialog} />

      <DialogMessage>
        Are you sure you want to remove the selected track from the playlist? This action cannot be
        undone.
      </DialogMessage>

      <DialogActions>
        <Button onClick={handleRemove} align="center">
          Remove
        </Button>
        <Button onClick={closeDialog} align="center">
          Cancel
        </Button>
      </DialogActions>
    </Fragment>
  );
}
