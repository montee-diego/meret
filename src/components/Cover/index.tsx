import { useState } from "react";
import Image from "next/image";

import Style from "./index.module.css";

interface IProps {
  cover: string | null;
  size: string;
}

export default function Cover({ cover, size }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadingClass = isLoading ? " " + Style.Loading : "";

  function handleLoad(image: HTMLImageElement) {
    image.classList.add(Style.ImgLoaded);
    setIsLoading(false);
  }

  return (
    <div className={Style.Container + loadingClass} style={{ width: size }}>
      <Image
        src={cover || "/img/no-cover.png"}
        className={Style.Img}
        onLoadingComplete={handleLoad}
        alt="No Cover"
        sizes="320px"
        fill
      />
    </div>
  );
}
