import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext<any>({
  theme: "light",
});

export const ThemeProvider: React.FC<any> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => useContext(ThemeContext);
