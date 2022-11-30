import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import type { FC, SyntheticEvent } from "react";
import { CoverPlaceholder, Loading } from "@components/index";
import style from "./index.module.css";

interface IProps {
  colors: string[];
  cover: string;
  size: string;
}

export const Cover: FC<IProps> = ({ colors, cover, size }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.classList.add(style.ImgLoaded);
    setIsLoading(false);
  };

  return (
    <div className={style.Container} style={{ width: size }}>
      {cover && <img src={cover} alt="No Cover" className={style.Img} onLoad={handleLoad} />}
      {/* {isLoading && <CoverPlaceholder colors={colors} />} */}
      {/* {isLoading && <FontAwesomeIcon icon={faEllipsis} bounce size="xl" />} */}
      {isLoading && <Loading />}
    </div>
  );
};
