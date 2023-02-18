import type { ReactNode, SyntheticEvent } from "react";

import Button from "@components/Button";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onCancel: () => void;
  onConfirm: (event: SyntheticEvent<HTMLButtonElement>) => void;
}

export default function ConfirmDialog({ children, onCancel, onConfirm }: IProps) {
  return (
    <div className={style.Container}>
      <div className={style.Message}>{children}</div>

      <div className={style.Actions}>
        <Button onClick={onConfirm} align="center">
          Confirm
        </Button>
        <Button onClick={onCancel} align="center">
          Cancel
        </Button>
      </div>
    </div>
  );
}
