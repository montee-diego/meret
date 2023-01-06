import type { FC, SyntheticEvent, Dispatch, SetStateAction } from "react";

import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./index.module.css";

interface IProps {
  setIsNavOpen: Dispatch<SetStateAction<boolean>>;
}

export const Search: FC<IProps> = ({ setIsNavOpen }) => {
  const router = useRouter();

  const [input, setInput] = useState<string>("");

  const handleInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?query=${input}`);
    setInput("");
    setIsNavOpen(false);
  };

  return (
    <form className={style.Container} onSubmit={handleSubmit}>
      <input
        type="text"
        className={style.Input}
        value={input}
        placeholder="Search"
        onInput={handleInput}
        required
      />
      <button type="submit" className={style.Submit} tabIndex={-1} aria-label="submit search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
};
