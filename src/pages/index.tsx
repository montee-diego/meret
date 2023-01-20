import type { GetServerSideProps } from "next";
import type { IPlaylist, ITrack } from "@global/types";

import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";
import { TrackList } from "@components/TrackList";
import Link from "next/link";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylist[];
  };
}

export default function Home({ feed }: IProps) {
  return (
    <section>
      <TrackList tracks={feed.tracks} />

      {feed.playlists.map((playlist) => (
        <Link href={`/playlist/${playlist._id}`} key={playlist._id}>
          {playlist.name}
        </Link>
      ))}
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
