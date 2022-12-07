import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@context/Theme";
import { ButtonIcon } from "@components/index";
import type { FC } from "react";

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    const activeTheme = theme === "light" ? "dark" : "light";

    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem("theme", activeTheme);
    setTheme(activeTheme);
  };

  return (
    <ButtonIcon onClick={handleThemeToggle}>
      <FontAwesomeIcon size="xl" icon={theme === "light" ? faMoon : faSun} />
    </ButtonIcon>
  );
};
