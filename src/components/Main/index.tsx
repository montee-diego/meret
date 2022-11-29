import { useAudioPlayer } from "@context/AudioPlayer";
import type { FC, ReactNode } from "react";
import style from "./index.module.css";

interface IProps {
  children: ReactNode;
}

export const Main: FC<IProps> = ({ children }) => {
  const { playerOpen } = useAudioPlayer();

  return (
    <main className={style.Container + (playerOpen ? " " + style.Open : "")}>
      {children}
    </main>
  );
};
