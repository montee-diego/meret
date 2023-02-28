import type { MouseEvent } from "react";
import { useState } from "react";

import Style from "./index.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(document.body.dataset.theme || "light");

  function handleToggle(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const activeTheme = theme === "light" ? "dark" : "light";

    if (theme == activeTheme) {
      return;
    }

    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
    setTheme(activeTheme);
  }

  return (
    <button className={Style.Button} onClick={handleToggle}>
      <span>Dark Mode</span>
      <div className={Style.Track}>
        <div className={Style.Toggle} data-active={theme === "dark"}></div>
      </div>
    </button>
  );
}
