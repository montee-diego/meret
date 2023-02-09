import type { GetServerSideProps } from "next";
import type { ITrack } from "@global/types";

// SSR
import { sanityClient } from "@services/sanity/client";
import { querySearch } from "@services/sanity/queries";

// CSR
import { useRouter } from "next/router";
import { List, Tracks } from "@components/index";

interface IProps {
  tracks: ITrack[];
}

export default function Search({ tracks }: IProps) {
  const { query } = useRouter();

  return (
    <section>
      <List title={`Search: ${query.query}`} view="list">
        <Tracks tracks={tracks} />
      </List>
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
