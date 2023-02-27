import type { ChangeEvent, MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useAudioPlayer } from "@context/AudioPlayer";
import { debounce } from "@utils/debounce";
import { formatTime } from "@global/utils";
import Style from "./index.module.css";

interface IProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  length: number;
  isPlaying: boolean;
  setIsPlaying: any;
}

export default function AudioSeek({ audioRef, length, isPlaying, setIsPlaying }: IProps) {
  const [time, setTime] = useState<number>(0);
  const { player } = useAudioPlayer();
  const timer = useRef<NodeJS.Timer>();
  const playNext = useRef<() => void>();

  const debounceSeek = useCallback(
    debounce((time: number) => seekTime(time), 250),
    [audioRef]
  );

  playNext.current = () => {
    const { index, tracks } = player.data;

    if (index < tracks.length - 1) {
      player.setData((data) => {
        return { ...data, index: index + 1, isSync: false };
      });
    } else {
      setIsPlaying(false);
    }
  };

  function startTimer() {
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(() => {
      if (audioRef.current) {
        if (audioRef.current.ended) {
          playNext.current && playNext.current();
          clearInterval(timer.current);
          setTime(0);
        } else {
          setTime(Math.floor(audioRef.current.currentTime));
        }
      }

      console.log("Loop running...");
    }, 250);
  }

  function seekTime(time: number) {
    if (audioRef.current) {
      audioRef.current.currentTime = time;

      if (!audioRef.current.paused) {
        startTimer();
      }
    }

    console.log("Seek time:", time);
  }

  function handleSeek(e: ChangeEvent<HTMLInputElement>) {
    if (timer.current) clearInterval(timer.current);

    const newTime = Number(e.currentTarget.value);

    debounceSeek(newTime);
    setTime(newTime);
  }

  useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(timer.current);
    }
  }, [audioRef.current, isPlaying]);

  return (
    <div className={Style.Time}>
      <span>{formatTime(time)}</span>
      <input type="range" max={length} value={time} onChange={handleSeek} />
      <span>{formatTime(length)}</span>
    </div>
  );
}
