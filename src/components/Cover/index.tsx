import { useState } from "react";
import Image from "next/image";
import type { FC } from "react";
import style from "./index.module.css";

interface IProps {
  cover: string;
  size: string;
}

export const Cover: FC<IProps> = ({ cover, size }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingClass = isLoading ? " " + style.Loading : "";
  const handleLoad = (image: HTMLImageElement) => {
    image.classList.add(style.ImgLoaded);
    setIsLoading(false);
  };

  return (
    <div className={style.Container + loadingClass} style={{ width: size }}>
      {cover && (
        <Image
          src={cover}
          className={style.Img}
          onLoadingComplete={handleLoad}
          alt="No Cover"
          sizes="320px"
          fill
        />
      )}
    </div>
  );
};
