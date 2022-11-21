import type { AppProps } from "next/app";
import { NowPlayingContext } from "@context/NowPlaying";
import { Header, NowPlaying } from "@components/index";
import "@styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NowPlayingContext>
      <Header />
      <Component {...pageProps} />
      <NowPlaying />
    </NowPlayingContext>
  );
}
