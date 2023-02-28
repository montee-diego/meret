import type { ReactNode, Dispatch, SetStateAction } from "react";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  playerState: {
    isPlayerOpen: boolean;
    setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export default function Main({ children, playerState }: IProps) {
  const { isPlayerOpen } = playerState;

  return (
    <main className={Style.Container} data-open={isPlayerOpen}>
      {children}
    </main>
  );
}
