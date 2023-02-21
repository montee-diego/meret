import { useState } from "react";
import Image from "next/image";

import css from "./index.module.css";

interface IProps {
  cover: string | null;
  size: string;
}

export default function Cover({ cover, size }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingClass = isLoading ? " " + css.Loading : "";
  const handleLoad = (image: HTMLImageElement) => {
    image.classList.add(css.ImgLoaded);
    setIsLoading(false);
  };

  return (
    <div className={css.Container + loadingClass} style={{ width: size }}>
      <Image
        src={cover || "/img/no-cover.png"}
        className={css.Img}
        onLoadingComplete={handleLoad}
        alt="No Cover"
        sizes="320px"
        fill
      />
    </div>
  );
}
