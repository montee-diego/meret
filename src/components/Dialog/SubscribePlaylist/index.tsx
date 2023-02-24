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
    user: {
      isAuthor: boolean;
      isSub: boolean;
    };
  };
  closeDialog: () => void;
}

export default function SubscribePlaylist({ data: { _id, name, user }, closeDialog }: IProps) {
  const { meret } = useMeret();
  const { isSub } = user;

  async function handleSubscribe() {
    const menuBtn = document.querySelector("#pls-menu");

    if (menuBtn instanceof HTMLButtonElement) {
      menuBtn.disabled = true;
    }

    closeDialog();

    try {
      if (isSub) {
        return await meret.unsubscribe(_id);
      } else {
        return await meret.subscribe(_id);
      }
    } catch (error) {
      if (menuBtn instanceof HTMLButtonElement) {
        menuBtn.disabled = false;
      }
    }
  }

  return (
    <Fragment>
      <DialogTitle title={isSub ? "Unsubscribe" : "Subscribe"} closeDialog={closeDialog} />

      <DialogMessage>
        {isSub ? (
          <Fragment>
            Are you sure you want to unsubscribe from playlist "<b>{name}</b>"? You can always
            subscribe again later.
          </Fragment>
        ) : (
          <Fragment>
            Are you sure you want to subscribe to playlist "<b>{name}</b>"? It will be added to your
            profile.
          </Fragment>
        )}
      </DialogMessage>

      <DialogActions>
        <Button onClick={handleSubscribe} align="center">
          Confirm
        </Button>
        <Button onClick={closeDialog} align="center">
          Cancel
        </Button>
      </DialogActions>
    </Fragment>
  );
}
