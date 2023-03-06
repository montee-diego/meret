// SSR
import type { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { sanityClient } from "@services/sanity/client";
import { queryUserProfile } from "@services/sanity/queries";

//CSR
import type { IPlaylistCard } from "@global/types";
import { useAppTitle } from "@hooks/useAppTitle";
import Head from "next/head";
import Message from "@components/Message";
import PlaylistsGrid from "@components/PlaylistsGrid";
import Title from "@components/Title";
import UserProfileCard from "@components/UserProfileCard";

interface IProps {
  data: {
    playlists: IPlaylistCard[];
    subscriptions: IPlaylistCard[];
    user: {
      _createdAt: string;
    };
  };
}

export default function ProfilePage({ data: { user, playlists, subscriptions } }: IProps) {
  const { setAppTitle } = useAppTitle();
  const userData = {
    playlists: playlists.length,
    subs: subscriptions.length,
  };

  setAppTitle("Profile");

  return (
    <section tabIndex={-1}>
      <Head>
        <title>Profile</title>
      </Head>

      <UserProfileCard user={user} total={userData} />
      <Title title="Your Playlists" />
      {playlists.length > 0 ? (
        <PlaylistsGrid playlists={playlists} />
      ) : (
        <Message>You have not created any playlists yet.</Message>
      )}

      <Title title="Your Subscriptions" />
      {subscriptions.length > 0 ? (
        <PlaylistsGrid playlists={subscriptions} />
      ) : (
        <Message>You have not subscribed to any playlists yet.</Message>
      )}
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }

  const response = await sanityClient.fetch(queryUserProfile(), {
    user: token?.id || "",
  });

  // if (!response) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      data: response,
    },
  };
};
