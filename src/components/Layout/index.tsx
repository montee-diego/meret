import type { ReactNode } from "react";
import { Fragment, useState } from "react";

import AudioPlayer from "@components/AudioPlayer";
import Header from "@components/Header";
import Main from "@components/Main";
import Sidebar from "@components/Sidebar";

interface IProps {
  children: ReactNode;
}

export default function Layout({ children }: IProps) {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);

  const navState = { isNavOpen, setIsNavOpen };
  const playerState = { isPlayerOpen, setIsPlayerOpen };

  return (
    <Fragment>
      <Sidebar navState={navState} />
      <Header navState={navState} playerState={playerState} />

      <Main playerState={playerState}>
        <AudioPlayer playerState={playerState} />
        {children}
      </Main>
    </Fragment>
  );
}
