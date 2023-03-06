// SSR
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";

// CSR
import type { IPlaylist, ISelected } from "@global/types";
import { useAudioPlayer } from "@context/AudioPlayer";
import { useAppTitle } from "@hooks/useAppTitle";
import Head from "next/head";
import PlaylistHeader from "@components/PlaylistHeader";
import Tracks from "@components/Tracks";

interface IProps {
  playlist: IPlaylist;
}

export default function PlaylistPage({ playlist }: IProps) {
  const { player } = useAudioPlayer();
  const { setAppTitle } = useAppTitle();
  const { _id, tracks } = playlist;
  const { isAuthor } = playlist.user;

  function play({ index, track }: ISelected) {
    player.setData({
      index,
      isSync: false,
      playlistId: _id,
      tracks,
    });
  }

  setAppTitle("Playlist");

  return (
    <section tabIndex={-1}>
      <Head>
        <title>{playlist.name}</title>
      </Head>

      <fieldset data-pid={playlist._id}>
        <PlaylistHeader playlist={playlist} />
        <Tracks tracks={tracks} play={play} pid={isAuthor ? _id : undefined} />
      </fieldset>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { pid } = query;
  const token = await getToken({ req });
  const response = await sanityClient.fetch(queryPlaylist(), {
    id: pid || "",
    user: token?.id || "",
  });

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      playlist: response,
    },
  };
};
