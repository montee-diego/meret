import type { ISelected, ITrack } from "@global/types";

import { useAudioPlayer } from "@context/AudioPlayer";
import Tracks from "@components/Tracks";

interface IProps {
  tracks: ITrack[];
}

export default function Tracklist({ tracks }: IProps) {
  const { player } = useAudioPlayer();

  function play({ index, track }: ISelected) {
    player.setData({
      index: 0,
      isSync: false,
      playlistId: null,
      tracks: [track],
    });
  }

  return <Tracks tracks={tracks} play={play} />;
}
