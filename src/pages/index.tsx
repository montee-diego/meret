import { useEffect, useState } from "react";
import { ISong } from "@global/types";

export default function Home() {
  const [songs, setSongs] = useState<ISong[]>([]);
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

  return (
    <div>
      <h1>Meret</h1>

      {songs.map((song) => (
        <div>
          <h2>
            {song.title} by {song.artist}
          </h2>
          <audio src={song.audio} controls></audio>
        </div>
      ))}
    </div>
  );
}
