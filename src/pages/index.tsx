import { useEffect, useState } from "react";
import { ITrack } from "@global/types";
import { useAudioPlayer } from "@context/AudioPlayer";
import { TrackList } from "@components/TrackList";

export default function Home() {
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const { setPlaylist } = useAudioPlayer();

  const fetchAll = () => {
    fetch("/api/music/songs", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTracks(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handlePlay = () => {
    if (setPlaylist) {
      setPlaylist([tracks[0]]);
    }
  };

  return (
    <div>
      {/* {tracks.map((song) => (
        <div>
          <h2>
            {song.title} by {song.artist}
          </h2>
          <button onClick={handlePlay}>Play</button>
        </div>
      ))} */}

      <TrackList tracks={tracks} />
    </div>
  );
}
