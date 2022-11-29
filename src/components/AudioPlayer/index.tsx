import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import { AudioControls, Cover } from "@components/index";
import type { FC } from "react";
import style from "./index.module.css";

export const AudioPlayer: FC = () => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { playerOpen, playlist } = useAudioPlayer();
  const { artist, audio, cover, title, length } = playlist[trackIndex] || {};

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handleControls = {
    Play: () => {
      const track = audioRef.current;

      if (track) {
        isPlaying ? track.pause() : track.play();
        setIsPlaying(!isPlaying);
      }
    },
    Prev: () => {},
    Next: () => {},
  };

  useEffect(() => {
    if (audio) {
      audioRef.current = new Audio(audio);
    }
  }, [audio]);

  return (
    <aside className={style.Container + (playerOpen ? " " + style.Open : "")}>
      <Cover colors={[]} cover={cover} />

      <div className={style.Tags}>
        <p className={style.Title}>{title}</p>
        <p className={style.Artist}>{artist}</p>
      </div>

      <AudioControls handleControls={handleControls} isPlaying={isPlaying} />
    </aside>
  );
};
