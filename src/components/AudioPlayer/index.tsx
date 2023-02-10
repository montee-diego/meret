import type { ChangeEvent, FC } from "react";

import { useEffect, useRef, useState } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import { formatTime } from "@global/utils";
import { AudioControls, ButtonLink, Cover } from "@components/index";
import style from "./index.module.css";

export const AudioPlayer: FC = () => {
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { player } = useAudioPlayer();
  const { index, playlistId, tracks } = player.data;
  const { artist, audio, cover, title, length } = tracks[index] || {};

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timer>();
  const isReady = useRef<boolean>(false);

  const handleControls = {
    Play: () => {
      if (audioRef.current) {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    },
    Prev: () => {
      if (index > 0) {
        player.setData({ ...player.data, index: index - 1 });
      }
    },
    Next: () => {
      if (index < tracks.length - 1) {
        player.setData({ ...player.data, index: index + 1 });
      }
    },
  };

  function handleSeek(event: ChangeEvent<HTMLInputElement>) {
    clearInterval(intervalRef.current);

    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.currentTarget.value);
      setTrackProgress(audioRef.current.currentTime);
      startTimer();
    }
  }

  function startTimer() {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!audioRef.current) return;

      setTrackProgress(audioRef.current.currentTime);

      if (audioRef.current.ended) {
        setTrackProgress(0);
        setIsPlaying(false);
        handleControls.Next();
      }
    }, 1000);
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
      setTrackProgress(0);
    }

    if (isReady.current) {
      audioRef.current = new Audio(audio);
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [player.data]);

  return (
    <aside className={style.Container} data-open={player.isOpen}>
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

      {playlistId && (
        <div className={style.ViewPlaylist}>
          <ButtonLink href={`/playlist/${playlistId}`} align="center">
            View Playlist
          </ButtonLink>
        </div>
      )}
    </aside>
  );
};
