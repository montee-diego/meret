import type { ReactNode } from "react";
import { Fragment, useState } from "react";

import AudioPlayer from "@components/_Layout/AudioPlayer";
import Header from "@components/_Layout/Header";
import Main from "@components/_Layout/Main";
import Sidebar from "@components/_Layout/Sidebar";

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
