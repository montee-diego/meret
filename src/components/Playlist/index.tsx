import type { IPlaylist, ISelected } from "@global/types";

import { useAudioPlayer } from "@context/AudioPlayer";
import { useMeret } from "@context/Meret";
import Tracks from "@components/Tracks";

interface IProps {
  playlist: IPlaylist;
}

export default function Playlist({ playlist }: IProps) {
  const { player } = useAudioPlayer();
  const { meret } = useMeret();
  const { _id, tracks } = playlist;
  const { isAuthor } = playlist.user;

  function play({ index, track }: ISelected) {
    player.setData({
      index,
      isSync: false,
      playlistId: _id,
      tracks,
    });
  }

  async function remove(selected: ISelected, toggleModal: () => void, btn: HTMLButtonElement) {
    if (!isAuthor || !selected.track._key) return;

    btn.disabled = true;
    const { index, track } = selected;
    const response = await meret.deleteItem(track._key);

    if (response === "OK") {
      player.syncPlaylist(_id, index);
      toggleModal();
    } else {
      btn.disabled = false;
    }
  }

  return <Tracks tracks={tracks} play={play} remove={isAuthor ? remove : undefined} />;
}
