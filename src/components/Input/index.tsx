import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { useState } from "react";

import Style from "./index.module.css";

interface IProps {
  children: ReactNode;
  onSubmit: (input: string) => void;
  placeholder: string;
}

export default function Input({ children, onSubmit, placeholder }: IProps) {
  const [input, setInput] = useState<string>("");

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.currentTarget.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (input) {
      onSubmit(input);
      setInput("");
    }
  }

  return (
    <form className={Style.Form} onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={handleChange} placeholder={placeholder} />
      <button type="submit" tabIndex={-1} aria-label={placeholder}>
        {children}
      </button>
    </form>
  );
}
