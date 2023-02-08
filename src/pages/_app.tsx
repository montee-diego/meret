import type { AppProps } from "next/app";

import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { MeretContext } from "@context/Meret";
import { AudioPlayer, Header, Main, Sidebar } from "@components/index";
import Head from "next/head";
import "@styles/globals.css";

// Fix FontAwesome icons size flash on page load
import "../../node_modules/@fortawesome/fontawesome-svg-core/styles.css";

const toastOptions = {
  style: {
    minWidth: "300px",
  },
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <SessionProvider session={session}>
      <MeretContext>
        <AudioPlayerContext>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>

          <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Header setIsNavOpen={setIsNavOpen} />

          <Main>
            <AudioPlayer />
            <Component {...pageProps} />
          </Main>

          <Toaster position="bottom-center" toastOptions={toastOptions} />
        </AudioPlayerContext>
      </MeretContext>
    </SessionProvider>
  );
}
