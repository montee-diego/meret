import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useMeret } from "@context/Meret";
import Input from "@components/Input";

export default function CreatePlaylist() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { meret } = useMeret();

  async function handleCreate(input: string) {
    if (isLoading) return;

    setIsLoading(true);
    const response = await meret.create(input);
    setIsLoading(false);
  }

  return (
    <Input onSubmit={handleCreate} placeholder="Create Playlist">
      <FontAwesomeIcon icon={isLoading ? faSpinner : faPlus} size="lg" spin={isLoading} />
    </Input>
  );
}
