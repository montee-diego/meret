import type { GetServerSideProps } from "next";
import type { IPlaylist, ITrack } from "@global/types";

// SSR
import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";

// CSR
import { List, Playlists, Tracks } from "@components/index";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylist[];
  };
}

export default function Home({ feed }: IProps) {
  const { tracks, playlists } = feed;

  return (
    <section>
      <List href="/discover/songs" title="Latest Tracks" view="list">
        <Tracks tracks={tracks} />
      </List>
      <List href="/discover/playlists" title="Last Updated" view="grid">
        <Playlists playlists={playlists} />
      </List>
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
