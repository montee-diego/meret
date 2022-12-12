import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeContext } from "@context/Theme";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { AudioPlayer, Header, Main, Sidebar } from "@components/index";
import Head from "next/head";
import type { AppProps } from "next/app";
import "@styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <SessionProvider session={session}>
      <ThemeContext>
        <AudioPlayerContext>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>

          <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
          <Header setIsNavOpen={setIsNavOpen} />

          <Main>
            <Component {...pageProps} />
            <AudioPlayer />
          </Main>
        </AudioPlayerContext>
      </ThemeContext>
    </SessionProvider>
  );
}
