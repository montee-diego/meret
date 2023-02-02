import type { GetServerSideProps } from "next";
import type { IPlaylist, ITrack } from "@global/types";

import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";
import { PlaylistGrid, TrackList } from "@components/index";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylist[];
  };
}

export default function Home({ feed }: IProps) {
  return (
    <section>
      <TrackList title="Latest Tracks" tracks={feed.tracks} />
      <PlaylistGrid title="Latest Playlists" playlists={feed.playlists} />
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
