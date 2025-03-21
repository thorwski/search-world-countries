import { createContext, useContext } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
  theme: "light",
  setTheme: () => {
    throw new Error("setTheme must be used within a ThemeProvider");
  },
  toggleTheme: () => {
    throw new Error("toggleTheme must be used within a ThemeProvider");
  },
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export default ThemeContext;
