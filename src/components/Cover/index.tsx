import { useState } from "react";
import type { FC, SyntheticEvent } from "react";
import style from "./index.module.css";

interface IProps {
  cover: string;
  size: string;
}

export const Cover: FC<IProps> = ({ cover, size }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadingClass = isLoading ? " " + style.Loading : "";
  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.add(style.ImgLoaded);
    setIsLoading(false);
  };

  return (
    <div className={style.Container + loadingClass} style={{ width: size }}>
      {cover && (
        <img src={cover} className={style.Img} onLoad={handleLoad} alt="No Cover" />
      )}
    </div>
  );
};
