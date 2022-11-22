import { useState } from "react";
import type { FC } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import styles from "./index.module.css";

export const AudioPlayer: FC = () => {
  const { playlist } = useAudioPlayer();

  return (
    <div className={styles.container}>
      <h1>Playback</h1>
      <h2>{playlist.length > 0 && playlist[0].title}</h2>
      {/* {nowPlaying !== undefined && (
        <audio src={nowPlaying?.playback?.audio} controls autoPlay></audio>
      )} */}
    </div>
  );
};
