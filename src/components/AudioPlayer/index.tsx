import { useEffect, useRef, useState } from "react";
import type { FC, Dispatch, SetStateAction } from "react";
import { useAudioPlayer } from "@context/AudioPlayer";
import { AudioControls, Cover } from "@components/index";
import style from "./index.module.css";

interface IProps {
  isPlayerOpen: boolean;
  setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
}

export const AudioPlayer: FC<IProps> = ({ isPlayerOpen }) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [trackProgress, setTrackProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { playlist } = useAudioPlayer();
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
    <aside className={style.Container + (isPlayerOpen ? " " + style.Open : "")}>
      <Cover colors={[]} cover={cover} />

      <div className={style.Tags}>
        <p className={style.Title}>{title}</p>
        <p className={style.Artist}>{artist}</p>
      </div>

      <AudioControls handleControls={handleControls} isPlaying={isPlaying} />
    </aside>
  );
};
