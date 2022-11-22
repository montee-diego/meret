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

export const ThemeContext: FC<IProps> = (props) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    console.log("theme changed to: ", theme);
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <Theme.Provider value={{ theme, setTheme }}>
      {props.children}
    </Theme.Provider>
  )
}

export const useTheme = () => useContext(Theme);
