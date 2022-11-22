import { useState } from "react";
import type { FC, SyntheticEvent } from "react";
import { CoverPlaceholder } from "@components/index";
import style from "./index.module.css";

interface IProps {
  colors: string[];
  cover: string;
}

export const Cover: FC<IProps> = ({ colors, cover }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.add(style.ImgLoaded);
    setIsLoading(false);
  };

  return (
    <div className={style.Container}>
      {cover && <img src={cover} alt="No Cover" className={style.Img} onLoad={handleLoad} />}
      {isLoading && <CoverPlaceholder colors={colors} />}
    </div>
  );
};
