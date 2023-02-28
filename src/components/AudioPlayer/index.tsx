import type { Dispatch, SetStateAction } from "react";
import type { ITrack } from "@global/types";
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
  const [track, setTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { isPlayerOpen, setIsPlayerOpen } = playerState;
  const { player } = useAudioPlayer();
  const { index, playlistId, tracks } = player.data;
  const { artist, audio, cover, title, length } = track || {};

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();

  const controls = {
    Play: () => {
      if (audioRef.current && audioRef.current.src) {
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        setIsPlaying(!isPlaying);
      }
    },
    Prev: () => {
      if (index > 0) {
        player.setData((prevData) => {
          return { ...prevData, index: index - 1, isSync: false };
        });
      }
    },
    Next: () => {
      if (player.queue.length) {
        advanceQueue();
        return;
      }

      if (index < tracks.length - 1) {
        player.setData((prevData) => {
          return { ...prevData, index: index + 1, isSync: false };
        });
      }
    },
  };

  function handlePlay() {
    if (audioRef.current && audioRef.current.src) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }

  function handleEnded() {
    if (player.queue.length) {
      advanceQueue();
      return;
    }

    if (index < tracks.length - 1) {
      controls.Next();
    } else {
      setIsPlaying(false);
    }
  }

  function handleViewPlaylist() {
    router.push(`/playlist/${playlistId}`);

    if (window.innerWidth <= 768) {
      setIsPlayerOpen(false);
    }
  }

  function advanceQueue() {
    setTrack(player.queue[0]);

    player.setQueue((queue) => {
      return queue.slice(1, queue.length);
    });

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }

  // Component mount
  useEffect(() => {
    if (tracks.length && index > -1) {
      setTrack(tracks[index]);
    }
  }, []);

  // New playlist or track sent to AudioPlayer
  useEffect(() => {
    if (player.data.isSync || !tracks.length) {
      return;
    }

    setTrack(tracks[index]);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [player.data]);

  // Track added to queue
  useEffect(() => {
    if (!track && player.queue.length) {
      advanceQueue();
    }
  }, [player.queue]);

  return (
    <aside className={Style.Container} data-open={isPlayerOpen} tabIndex={-1}>
      <Cover cover={cover || null} size="60%" />

      <AudioSeek audioRef={audioRef} length={length || 0} isPlaying={isPlaying} />

      <div className={Style.Tags}>
        <p className={Style.Title}>{title || "No track"}</p>
        <p className={Style.Artist}>{artist || "Select a playlist or track to begin"}</p>
      </div>

      <audio src={audio} ref={audioRef} onCanPlay={handlePlay} onEnded={handleEnded} />

      <AudioControls controls={controls} isPlaying={isPlaying} />

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
