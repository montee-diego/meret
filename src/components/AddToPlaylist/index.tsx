import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import Button from "@components/Button";
import css from "./index.module.css";

interface IProps {
  trackId: string;
}

export default function AddToPlaylist({ trackId }: IProps) {
  const { data, meret } = useMeret();
  const { player } = useAudioPlayer();

  async function addToPlaylist(pid: string) {
    const response = await meret.addItem(pid, trackId);

    if (response === "OK") {
      player.syncPlaylist(pid, player.data.index);
    }
  }

  return (
    <ul className={css.List}>
      {data.playlists.map((playlist) => (
        <li key={playlist._id}>
          <Button onClick={() => addToPlaylist(playlist._id)} align="left">
            {playlist.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
