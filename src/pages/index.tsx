import type { GetServerSideProps } from "next";
import type { IPlaylistCard, ITrack } from "@global/types";

// SSR
import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";

// CSR
import PlaylistsGrid from "@components/PlaylistsGrid";
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
      <Tracklist tracks={tracks}>
        <Title title="Latest Tracks" href="/discover/songs" />
      </Tracklist>

      <PlaylistsGrid playlists={playlists}>
        <Title title="Last Updated" href="/discover/playlists" />
      </PlaylistsGrid>
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
