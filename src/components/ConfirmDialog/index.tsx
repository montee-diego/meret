import type { FC, ReactNode } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "@components/index";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog: FC<IProps> = ({ children, onCancel, onConfirm }) => {
  return (
    <div className={style.Container}>
      <div className={style.Title}>
        <h3>Confirm Action</h3>

        <ButtonIcon onClick={onCancel} label="close modal">
          <FontAwesomeIcon icon={faXmark} size={"xl"} />
        </ButtonIcon>
      </div>

      <div className={style.Message}>
        <p>{children}</p>
      </div>

      <div className={style.Actions}>
        <button type="button" onClick={onConfirm}>
          Confirm
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};
