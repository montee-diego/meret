import type { FC } from "react";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { ButtonIcon } from "@components/index";

const ThemeToggle: FC = () => {
  const [theme, setTheme] = useState<string>(`${document.body.dataset.theme}`);

  const handleThemeToggle = () => {
    const activeTheme = theme === "light" ? "dark" : "light";

    if (theme == activeTheme) {
      return;
    }

    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
    setTheme(activeTheme);
  };

  return (
    <ButtonIcon onClick={handleThemeToggle} label="toggle theme">
      <FontAwesomeIcon size="xl" icon={theme === "light" ? faMoon : faSun} />
    </ButtonIcon>
  );
};

export default ThemeToggle;
