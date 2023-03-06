// SSR
import type { GetServerSideProps } from "next";
import { sanityClient } from "@services/sanity/client";
import { querySearch } from "@services/sanity/queries";

// CSR
import type { ITrack } from "@global/types";
import { useRouter } from "next/router";
import { useAppTitle } from "@hooks/useAppTitle";
import Message from "@components/Message";
import Title from "@components/Title";
import Tracklist from "@components/Tracklist";

interface IProps {
  tracks: ITrack[];
}

export default function SearchPage({ tracks }: IProps) {
  const { query } = useRouter();
  const { setAppTitle } = useAppTitle();

  setAppTitle("Search");

  return (
    <section tabIndex={-1}>
      <Title title={`Search: ${query.query}`} />
      {tracks.length > 0 ? (
        <Tracklist tracks={tracks} />
      ) : (
        <Message>No results found</Message>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.query;
  const response = await sanityClient.fetch(querySearch(), {
    query: `*${query}*`,
  });

  return {
    props: {
      tracks: response,
    },
  };
};
