import type { GetServerSideProps } from "next";
import type { IPlaylist, ITrack } from "@global/types";

import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";
import { PlaylistCard, TrackList } from "@components/index";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylist[];
  };
}

export default function Home({ feed }: IProps) {
  return (
    <section>
      <h1>Latest Tracks</h1>
      <TrackList tracks={feed.tracks} />

      <h1>Latest Playlists</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          gridGap: "10px",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        {feed.playlists.map((playlist) => (
          <PlaylistCard playlist={playlist} key={playlist._id} />
        ))}
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await sanityClient.fetch(queryHome());

  return {
    props: {
      feed: response,
    },
  };
};
