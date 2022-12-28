import { useState } from "react";
import type { ITrack } from "@global/types";

export const useModal = () => {
  const [content, setContent] = useState<ITrack | null>(null);

  return {
    content,
    setContent,
  };
};
