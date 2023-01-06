import type { FC } from "react";

import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import { formatTime } from "@global/utils";
import { AudioControls, Cover } from "@components/index";
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
  const handleSeek = (e: any) => {
    if (audioRef.current && isPlaying) {
      audioRef.current.currentTime = e.target.value;
      setTrackProgress(e.target.value);
    }
  };

  useEffect(() => {
    if (audio) {
      audioRef.current = new Audio(audio);

      audioRef.current.ontimeupdate = (e: any) => {
        const currentTime = Math.floor(e.target.currentTime);

        if (trackProgress !== currentTime) {
          setTrackProgress(currentTime);
        }
      };

      audioRef.current.onended = (e: any) => {
        setIsPlaying(false);
        setTrackProgress(0);
      };
    }
  }, [audio]);

  return (
    <aside className={style.Container} data-open={playerOpen}>
      <Cover cover={cover} size="60%" />

      <div className={style.Time}>
        <span>{formatTime(trackProgress)}</span>
        <input type="range" max={length || 0} value={trackProgress || 0} onChange={handleSeek} />
        <span>{formatTime(length || 0)}</span>
      </div>

      <div className={style.Tags}>
        <p className={style.Title}>{title || "No track"}</p>
        <p className={style.Artist}>{artist || "Select a playlist or track to begin"}</p>
      </div>

      <AudioControls handleControls={handleControls} isPlaying={isPlaying} />
    </aside>
  );
};
