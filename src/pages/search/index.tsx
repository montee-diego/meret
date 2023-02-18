import type { GetServerSideProps } from "next";
import type { ITrack } from "@global/types";

// SSR
import { sanityClient } from "@services/sanity/client";
import { querySearch } from "@services/sanity/queries";

// CSR
import { useRouter } from "next/router";
import Title from "@components/Title";
import Tracklist from "@components/Tracklist";

interface IProps {
  tracks: ITrack[];
}

export default function Search({ tracks }: IProps) {
  const { query } = useRouter();

  return (
    <section>
      <Tracklist tracks={tracks}>
        <Title title={`Search: ${query.query}`} />
      </Tracklist>
      {/* <List title={`Search: ${query.query}`} view="list">
        <Tracks tracks={tracks} />
      </List> */}
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
