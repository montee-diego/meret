import { useState } from "react";
import type { AppProps } from "next/app";
import { ThemeContext } from "@context/Theme";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { AudioPlayer, Header, Sidebar } from "@components/index";
import "@styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);

  return (
    <ThemeContext>
      <AudioPlayerContext>
        <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
        <Header setIsNavOpen={setIsNavOpen} isPlayerOpen={isPlayerOpen} setIsPlayerOpen={setIsPlayerOpen} />

        {/* <div style={{ display: "flex" }}> */}
        <main className={isPlayerOpen ? "hide" : ""}>
          <Component {...pageProps} />
          <AudioPlayer isPlayerOpen={isPlayerOpen} setIsPlayerOpen={setIsPlayerOpen} />
        </main>
        {/* </div> */}
      </AudioPlayerContext>
    </ThemeContext>
  );
}
