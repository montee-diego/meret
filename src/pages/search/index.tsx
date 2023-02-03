import type { GetServerSideProps } from "next";
import type { ITrack } from "@global/types";

import { useRouter } from "next/router";
import { sanityClient } from "@services/sanity/client";
import { querySearch } from "@services/sanity/queries";
import { TrackList } from "@components/index";

interface IProps {
  tracks: ITrack[];
}

export default function Search({ tracks }: IProps) {
  const { query } = useRouter();

  return (
    <section>
      <TrackList title={`Search: ${query.query}`} tracks={tracks} />
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
