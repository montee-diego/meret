import type { GetServerSideProps } from "next";
import type { IPlaylistCard, ITrack } from "@global/types";

// SSR
import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";

// CSR
import List from "@components/List";
import Playlists from "@components/Playlists";
import Title from "@components/Title";
import Tracklist from "@components/Tracklist";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylistCard[];
  };
}

export default function Home({ feed }: IProps) {
  const { tracks, playlists } = feed;

  return (
    <section>
      {/* <List href="/discover/songs" title="Latest Tracks" view="list">
        <Tracks tracks={tracks} />
      </List> */}

      <Tracklist tracks={tracks}>
        <Title title="Latest Tracks" href="/discover/songs" />
      </Tracklist>
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
