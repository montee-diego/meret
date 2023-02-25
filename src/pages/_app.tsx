import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

import { AudioPlayerContext } from "@context/AudioPlayer";
import { MeretContext } from "@context/Meret";
import Layout from "@components/_Layout";
import "@styles/globals.css";

// Fix FontAwesome icons size flash on page load
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";

const toastOptions = {
  style: {
    height: "3rem",
    minWidth: "300px",
  },
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MeretContext>
        <AudioPlayerContext>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <Toaster position="bottom-center" toastOptions={toastOptions} />
        </AudioPlayerContext>
      </MeretContext>
    </SessionProvider>
  );
}
