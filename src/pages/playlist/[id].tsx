import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";
import type { GetServerSideProps } from "next";
import type { IPlaylist } from "@global/types";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  console.log(playlist);
  // const del1 = await sanityClient.delete("");

  return (
    <section>
      <p>{playlist.name}</p>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const response = await sanityClient.fetch(queryPlaylist(id));

  if (!response.length) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      playlist: response[0],
    },
  };
};
