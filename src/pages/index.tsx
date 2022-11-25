import { useEffect, useState } from "react";
import { ITrack } from "@global/types";
import { useAudioPlayer } from "@context/AudioPlayer";
import { TrackList } from "@components/TrackList";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tracks, setTracks] = useState<ITrack[]>([]);
  const { setPlaylist } = useAudioPlayer();

  const fetchAll = () => {
    fetch("/api/music/songs", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTracks(data);
        setIsLoading(false);
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
    <section>
      {/* {tracks.map((song) => (
        <div>
          <h2>
            {song.title} by {song.artist}
          </h2>
          <button onClick={handlePlay}>Play</button>
        </div>
      ))} */}

      <TrackList isLoading={isLoading} tracks={tracks} />
    </section>
  );
}
