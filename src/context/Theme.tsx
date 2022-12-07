import { createContext, useContext, useEffect, useState } from "react";
import type { FC, ReactNode, Dispatch, SetStateAction } from "react";

interface IProps {
  children: ReactNode;
}

interface IContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const Theme = createContext<IContext>({
  theme: "light",
  setTheme: () => {},
});

export const ThemeContext: FC<IProps> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme && savedTheme !== "light") {
      setTheme(savedTheme);
    }

    document.body.dataset.theme = savedTheme || "light";
  }, []);

  return (
    <Theme.Provider value={{ theme, setTheme }}>
      {children}
    </Theme.Provider>
  );
};

export const useTheme = () => useContext(Theme);
