import type { FC, ReactNode, SyntheticEvent } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon, ButtonText } from "@components/index";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onCancel: () => void;
  onConfirm: (event: SyntheticEvent<HTMLButtonElement>) => void;
  title: string;
}

export const ConfirmDialog: FC<IProps> = ({ children, onCancel, onConfirm, title }) => {
  return (
    <div className={style.Container}>
      <div className={style.Title}>
        <h3>{title}</h3>

        <ButtonIcon onClick={onCancel} label="close modal">
          <FontAwesomeIcon icon={faXmark} size={"xl"} />
        </ButtonIcon>
      </div>

      <div className={style.Message}>
        {children}
      </div>

      <div className={style.Actions}>
        <ButtonText onClick={onConfirm} align="center">
          Confirm
        </ButtonText>
        <ButtonText onClick={onCancel} align="center">
          Cancel
        </ButtonText>
      </div>
    </div>
  );
};
