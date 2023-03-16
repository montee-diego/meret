import type { ChangeEvent, FormEvent } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";

import { useMeret } from "@context/Meret";
import Button from "@components/Button";
import DialogActions from "@components/DialogActions";
import DialogTitle from "@components/DialogTitle";
import Style from "./index.module.css";

interface IProps {
  data: {
    _id: string;
    name: string;
  };
  closeDialog: () => void;
}

export default function RenamePlaylist({ data: { _id, name }, closeDialog }: IProps) {
  const [newName, setNewName] = useState<string>(name);
  const { meret } = useMeret();
  const allowSubmit: boolean = newName.trim() !== name && newName !== "";

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewName(e.currentTarget.value);
  }

  async function handleRename(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const menuBtn = document.querySelector("#pls-menu");
    const trimmedName = newName.trim();

    if (allowSubmit) {
      if (trimmedName.length > 40) {
        toast("Name cannot exceed 40 characters", { id: "length-error" });
        return;
      }

      if (menuBtn instanceof HTMLButtonElement) {
        menuBtn.disabled = true;
      }

      closeDialog();

      try {
        return await meret.rename(_id, trimmedName);
      } catch (error) {
        if (menuBtn instanceof HTMLButtonElement) {
          menuBtn.disabled = false;
        }
      }
    }
  }

  return (
    <Fragment>
      <DialogTitle title="Rename Playlist" closeDialog={closeDialog} />

      <form onSubmit={handleRename}>
        <div className={Style.Content}>
          <label className={Style.Label}>
            <span>Enter a new name for this playlist:</span>
            <input type="text" value={newName} onChange={handleChange} />
          </label>
        </div>

        <DialogActions>
          <Button type="submit" align="center" disabled={!allowSubmit}>
            Rename
          </Button>
          <Button onClick={closeDialog} align="center">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Fragment>
  );
}
