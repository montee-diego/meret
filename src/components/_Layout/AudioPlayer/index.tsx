import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

import { useAudioPlayer } from "@context/AudioPlayer";
import AudioControls from "@components/AudioControls";
import Button from "@components/Button";
import Cover from "@components/Cover";
import Style from "./index.module.css";

import AudioSeek from "@components/AudioSeek";

interface IProps {
  playerState: {
    isPlayerOpen: boolean;
    setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
  };
}

export default function AudioPlayer({ playerState }: IProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { isPlayerOpen, setIsPlayerOpen } = playerState;
  const { player } = useAudioPlayer();
  const { index, playlistId, tracks } = player.data;
  const { artist, audio, cover, title, length } = tracks[index] || {};

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isReady = useRef<boolean>(false);

  const router = useRouter();

  const handleControls = {
    Play: () => {
      if (audioRef.current) {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    },
    Prev: () => {
      if (index > 0) {
        player.setData({ ...player.data, index: index - 1, isSync: false });
      }
    },
    Next: () => {
      if (index < tracks.length - 1) {
        player.setData({ ...player.data, index: index + 1, isSync: false });
      }
    },
  };

  function handleViewPlaylist() {
    router.push(`/playlist/${playlistId}`);

    if (window.innerWidth <= 768) {
      setIsPlayerOpen(false);
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  function playNextTrack() {
    setIsPlaying(false);
    handleControls.Next();
  }

  useEffect(() => {
    if (player.data.isSync) {
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("ended", playNextTrack);
    }

    if (isReady.current) {
      if (!tracks.length) {
        audioRef.current = null;
        setIsPlaying(false);
        return;
      }

      audioRef.current = new Audio(audio);
      audioRef.current.addEventListener("ended", playNextTrack);
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      isReady.current = true;
    }
  }, [player.data]);

  return (
    <aside className={Style.Container} data-open={isPlayerOpen} tabIndex={-1}>
      <Cover cover={cover} size="60%" />

      <AudioSeek audioRef={audioRef} length={length} isPlaying={isPlaying} />

      <div className={Style.Tags}>
        <p className={Style.Title}>{title || "No track"}</p>
        <p className={Style.Artist}>{artist || "Select a playlist or track to begin"}</p>
      </div>

      <AudioControls handleControls={handleControls} isPlaying={isPlaying} />

      {playlistId && (
        <div className={Style.ViewPlaylist}>
          {player.isSyncing ? (
            <div className={Style.Syncing}>
              <Icon icon={faRotate} spin />
              <p>Syncing...</p>
            </div>
          ) : player.isSyncError ? (
            <Button onClick={() => player.syncPlaylist(playlistId, index)} align="center">
              Sync Playlist
            </Button>
          ) : (
            <Button onClick={handleViewPlaylist} align="center">
              View Playlist
            </Button>
          )}
        </div>
      )}
    </aside>
  );
}
