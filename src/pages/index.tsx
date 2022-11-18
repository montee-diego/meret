import { useEffect, useState } from "react";
import sanityClient from "@services/sanityClient";
import { queryAll } from "@services/sanityQueries/queryAll";
import { ISong } from "@global/types";

export default function Home() {
  const [songs, setSongs] = useState<ISong[]>([]);
  const fetchAll = () => {
    sanityClient
      .fetch(queryAll())
      .then((response) => {
        console.log(response);
        setSongs(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
