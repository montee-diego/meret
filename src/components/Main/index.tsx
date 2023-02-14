import type { ReactNode } from "react";

import { useAudioPlayer } from "@context/AudioPlayer";
import css from "./index.module.css";

interface IProps {
  children: ReactNode;
}

export default function Main({ children }: IProps) {
  const { player } = useAudioPlayer();

  return (
    <main className={css.Container} data-open={player.isOpen}>
      {children}
    </main>
  );
}
