// SSR
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryPlaylist } from "@services/sanity/queries";

// CSR
import type { IPlaylist, ISelected } from "@global/types";
import { useAudioPlayer } from "@context/AudioPlayer";
import PlaylistHeader from "@components/PlaylistHeader";
import Tracks from "@components/Tracks";

interface IProps {
  playlist: IPlaylist;
}

export default function PlaylistPage({ playlist }: IProps) {
  const { player } = useAudioPlayer();
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

  return (
    <section data-scroll="false">
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
