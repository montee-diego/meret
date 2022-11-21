import type { FC } from "react";
import { useNowPlaying } from "@context/NowPlaying";

export const NowPlaying: FC = () => {
  const { play } = useNowPlaying();

  return (
    <div>
      <h1>Playback</h1>
      <h2>{play && play.title}</h2>
      {/* {nowPlaying !== undefined && (
        <audio src={nowPlaying?.playback?.audio} controls autoPlay></audio>
      )} */}
    </div>
  );
};
