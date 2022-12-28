import { sanityClient } from "@services/sanity/client";
import { queryAll } from "@services/sanity/queries";
import { TrackList } from "@components/TrackList";
import type { GetServerSideProps } from "next";
import type { ITrack } from "@global/types";

interface IProps {
  tracks: ITrack[];
}

export default function Home({ tracks }: IProps) {
  return (
    <section>
      <TrackList tracks={tracks} />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await sanityClient.fetch(queryAll());

  return {
    props: {
      tracks: response,
    },
  };
};
