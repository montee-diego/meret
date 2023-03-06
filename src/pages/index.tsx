// SSR
import type { GetServerSideProps } from "next";
import { sanityClient } from "@services/sanity/client";
import { queryHome } from "@services/sanity/queries";

// CSR
import type { IPlaylistCard, ITrack } from "@global/types";
import { useAppTitle } from "@hooks/useAppTitle";
import PlaylistsGrid from "@components/PlaylistsGrid";
import Title from "@components/Title";
import Tracklist from "@components/Tracklist";

interface IProps {
  feed: {
    tracks: ITrack[];
    playlists: IPlaylistCard[];
  };
}

export default function HomePage({ feed }: IProps) {
  const { setAppTitle } = useAppTitle();
  const { tracks, playlists } = feed;

  setAppTitle("Home");

  return (
    <section tabIndex={-1}>
      <Title title="Latest Tracks" href="/discover/songs" />
      <Tracklist tracks={tracks} />

      <Title title="Last Updated" href="/discover/playlists" />
      <PlaylistsGrid playlists={playlists} />
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
