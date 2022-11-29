import { useState } from "react";
import type { AppProps } from "next/app";
import { ThemeContext } from "@context/Theme";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { AudioPlayer, Header, Main, Sidebar } from "@components/index";
import "@styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <ThemeContext>
      <AudioPlayerContext>
        <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Header setIsNavOpen={setIsNavOpen} />

        {/* <div style={{ display: "flex" }}> */}
        <Main>
          <Component {...pageProps} />
          <AudioPlayer />
        </Main>
        {/* </div> */}
      </AudioPlayerContext>
    </ThemeContext>
  );
}
