import type { ChangeEvent, MutableRefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import { debounce } from "@utils/debounce";
import { formatTime } from "@global/utils";
import Style from "./index.module.css";

interface IProps {
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  length: number;
  isPlaying: boolean;
}

export default function AudioSeek({ audioRef, length, isPlaying }: IProps) {
  const [time, setTime] = useState<number>(0);
  const timer = useRef<NodeJS.Timer>();

  const startTimer = () => {
    if (timer.current) clearInterval(timer.current);

    timer.current = setInterval(() => {
      if (audioRef.current) {
        setTime(Math.floor(audioRef.current.currentTime));
      }

      console.log("Loop running...");
    }, 250);
  };

  const seekTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;

      if (!audioRef.current.paused) {
        startTimer();
      }
    }

    console.log("Seek time:", time);
  };

  const debounceSeek = useCallback(
    debounce((time: number) => seekTime(time), 250),
    [audioRef]
  );

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (timer.current) clearInterval(timer.current);

    const newTime = Number(e.currentTarget.value);

    debounceSeek(newTime);
    setTime(newTime);
  };

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

      if (audioRef.current && audioRef.current.ended) {
        setTime(0);
      }
    }
  }, [audioRef.current, isPlaying]);

  return (
    <div className={Style.Time}>
      <span>{formatTime(time)}</span>
      <input type="range" max={length || 0} value={time || 0} onChange={handleSeek} />
      <span>{formatTime(length || 0)}</span>
    </div>
  );
}
