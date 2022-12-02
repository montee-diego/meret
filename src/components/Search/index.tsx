import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import type { FC, SyntheticEvent } from "react";
import style from "./index.module.css";

export const Search: FC = () => {
  const [input, setInput] = useState<string>("");

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search:", input);
  };

  return (
    <form className={style.Container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.Input}
        value={input}
        placeholder="Search"
        onInput={handleInput}
      />
      <button type="submit" className={style.Submit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};
