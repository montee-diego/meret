import type { FC, ReactNode } from "react";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

export const ButtonIcon: FC<IProps> = ({ children, onClick }) => {
  return (
    <button className={style.Button} onClick={onClick}>
      {children}
    </button>
  );
};
