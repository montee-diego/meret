// SSR
import type { GetServerSideProps } from "next";
import { sanityClient } from "@services/sanity/client";
import { queryDiscoverSong } from "@services/sanity/queries";

//CSR
import type { ITrack } from "@global/types";
import { useAppTitle } from "@hooks/useAppTitle";
import Head from "next/head";
import Title from "@components/Title";
import Tracklist from "@components/Tracklist";

interface IProps {
  tracks: ITrack[];
}

export default function SongsPage({ tracks }: IProps) {
  const { setAppTitle } = useAppTitle();

  setAppTitle("Discover");

  return (
    <section tabIndex={-1}>
      <Head>
        <title>Discover: Songs</title>
      </Head>

      <Title title="Discover Songs" />
      <Tracklist tracks={tracks} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await sanityClient.fetch(queryDiscoverSong());

  return {
    props: {
      tracks: response,
    },
  };
};
