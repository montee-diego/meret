import { useState } from "react";
import type { AppProps } from "next/app";
import { ThemeContext } from "@context/Theme";
import { AudioPlayerContext } from "@context/AudioPlayer";
import { AudioPlayer, Header, Sidebar } from "@components/index";
import "@styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  return (
    <ThemeContext>
      <AudioPlayerContext>
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

          <main>
            <Header setIsNavOpen={setIsNavOpen} />
            <Component {...pageProps} />
          </main>
        </div>

        <AudioPlayer />
      </AudioPlayerContext>
    </ThemeContext>
  );
}
