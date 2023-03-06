// SSR
import type { GetServerSideProps } from "next";
import { sanityClient } from "@services/sanity/client";
import { queryDiscoverPlaylists } from "@services/sanity/queries";

//CSR
import type { IPlaylistCard } from "@global/types";
import { useAppTitle } from "@hooks/useAppTitle";
import PlaylistsGrid from "@components/PlaylistsGrid";
import Title from "@components/Title";

interface IProps {
  playlists: IPlaylistCard[];
}

export default function PlaylistsPage({ playlists }: IProps) {
  const { setAppTitle } = useAppTitle();

  setAppTitle("Discover");

  return (
    <section tabIndex={-1}>
      <Title title="Discover Playlists" />
      <PlaylistsGrid playlists={playlists} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await sanityClient.fetch(queryDiscoverPlaylists());

  return {
    props: {
      playlists: response,
    },
  };
};
