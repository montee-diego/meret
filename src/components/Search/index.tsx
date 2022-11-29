import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
import style from "./index.module.css";

export const Search: FC = () => {
  return (
    <form className={style.Container}>
      <input type="text" className={style.Input} placeholder="Search" />
      <button type="submit" className={style.Submit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};
