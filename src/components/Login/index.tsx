import { Fragment } from "react";
import { signIn } from "next-auth/react";

import Button from "@components/Button";
import ModalTitle from "@components/ModalTitle";
import css from "./index.module.css";

interface IProps {
  toggleOpen: () => void;
}

export default function Login({ toggleOpen }: IProps) {
  return (
    <Fragment>
      <ModalTitle title="Log In" toggleOpen={toggleOpen} />

      <div className={css.Container}>
        <div className={css.Message}>
          <p>
            Log in to enjoy all Meret features, such as playlist creation, management and
            subscriptions!
          </p>
        </div>

        <div className={css.Providers}>
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
