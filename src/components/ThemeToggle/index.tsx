import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@context/Theme";
import { ButtonIcon } from "@components/index";
import type { FC } from "react";

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
  };

  return (
    <ButtonIcon onClick={handleThemeToggle}>
      <FontAwesomeIcon size="xl" icon={theme === "light" ? faMoon : faSun} />
    </ButtonIcon>
  );
};
