import { Fragment } from "react";
import { signIn } from "next-auth/react";

import Button from "@components/Button";
import DialogMessage from "@components/DialogMessage";
import DialogTitle from "@components/DialogTitle";
import Style from "./index.module.css";

interface IProps {
  closeDialog: () => void;
}

export default function Login({ closeDialog }: IProps) {
  return (
    <Fragment>
      <DialogTitle title="Log In" closeDialog={closeDialog} />

      <DialogMessage>
        Log in to enjoy all Meret features, such as playlist creation, management and subscriptions!
      </DialogMessage>

      <div className={Style.Container}>
        <div className={Style.Providers}>
          <Button onClick={() => {}} align="left">
            Continue with Apple
          </Button>
          <Button onClick={() => {}} align="left">
            Continue with Facebook
          </Button>
          <Button onClick={() => {}} align="left">
            Continue with GitHub
          </Button>
          <Button onClick={() => signIn("google")} align="left">
            Continue with Google
          </Button>
        </div>
      </div>
    </Fragment>
  );
}
