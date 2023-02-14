import { useMeret } from "@context/Meret";
import { useAudioPlayer } from "@context/AudioPlayer";
import { ButtonLink } from "@components/index";
import css from "./index.module.css";

interface IProps {
  trackId: string;
}

export default function EditPlaylist({ trackId }: IProps) {
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
          <ButtonLink onClick={() => addToPlaylist(playlist._id)} align="left">
            {playlist.name}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
