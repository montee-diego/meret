import { Fragment } from "react";

import { useMeret } from "@context/Meret";
import Button from "@components/Button";
import DialogActions from "@components/DialogActions";
import DialogMessage from "@components/DialogMessage";
import DialogTitle from "@components/DialogTitle";

interface IProps {
  data: {
    _id: string;
    name: string;
  };
  closeDialog: () => void;
}

export default function DeletePlaylist({ data: { _id, name }, closeDialog }: IProps) {
  const { meret } = useMeret();

  async function handleDelete() {
    const playlistEl = document.querySelector(`fieldset[data-pid="${_id}"]`);

    if (playlistEl instanceof HTMLFieldSetElement) {
      playlistEl.disabled = true;
    }

    closeDialog();

    try {
      return await meret.delete(_id, true);
    } catch (error) {
      if (playlistEl instanceof HTMLFieldSetElement) {
        playlistEl.disabled = false;
      }
    }
  }

  return (
    <Fragment>
      <DialogTitle title="Delete Playlist" closeDialog={closeDialog} />

      <DialogMessage>
        Are you sure you want to delete playlist "<b>{name}</b>"? This action cannot be undone.
      </DialogMessage>

      <DialogActions>
        <Button onClick={handleDelete} align="center">
          Delete
        </Button>
        <Button onClick={closeDialog} align="center">
          Cancel
        </Button>
      </DialogActions>
    </Fragment>
  );
}
