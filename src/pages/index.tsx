import { useEffect, useState } from "react";
import { ISong } from "@global/types";
import { useAudioPlayer } from "@context/AudioPlayer";

export default function Home() {
  const [songs, setSongs] = useState<ISong[]>([]);
  const { setPlaylist } = useAudioPlayer();
  const fetchAll = () => {
    fetch("/api/music/songs", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSongs(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handlePlay = () => {
    if (setPlaylist) {
      setPlaylist([songs[0]]);
    }
  };

  return (
    <div>
      {songs.map((song) => (
        <div>
          <h2>
            {song.title} by {song.artist}
          </h2>
          <button onClick={handlePlay}>Play</button>
          {/* <audio src={song.audio} controls></audio> */}
        </div>
      ))}
    </div>
  );
}
