import type { AppProps } from "next/app";
import { ThemeContext } from "@context/Theme";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { Header, AudioPlayer } from "@components/index";
import "@styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeContext>
      <AudioPlayerContext>
        <Header />
        <Component {...pageProps} />
        <AudioPlayer />
      </AudioPlayerContext>
    </ThemeContext>
  );
}
