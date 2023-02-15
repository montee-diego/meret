import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import ButtonIcon from "@components/ButtonIcon";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>(document.body.dataset.theme || "light");

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
    <ButtonIcon onClick={handleThemeToggle} aria-label="toggle theme">
      <Icon size="xl" icon={theme === "light" ? faMoon : faSun} />
    </ButtonIcon>
  );
}
