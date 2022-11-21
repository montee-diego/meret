import type { AppProps } from "next/app";
import { NowPlayingContext } from "@context/NowPlaying";
import { NowPlaying } from "@components/index";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NowPlayingContext>
      <Component {...pageProps} />
      <NowPlaying />
    </NowPlayingContext>
  );
}
