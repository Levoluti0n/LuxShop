import 'react-native-gesture-handler';
import React, { useMemo, useState } from "react";
import { Provider as PaperProvider, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

import Router from "./src/navigation/Router";
import { ThemeContext } from "./src/context/ThemeContext";
import AuthContextProvider from "./src/context/AuthContext";

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...PaperDefaultTheme.colors,
      ...NavigationDefaultTheme.colors,
      text: '#333333',
      border: '#35373a',
      seperator: '#c0c0c0',
      background: '#ffffff',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#101d25',
      seperator: '#000',
      border: '#35373a',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const toggleTheme = useMemo(() => ({
    toggleTheme: bool => {
      setIsDarkTheme(bool);
    },
  }), []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <AuthContextProvider>
          <ThemeContext.Provider value={toggleTheme}>
            <Router />
          </ThemeContext.Provider>
        </AuthContextProvider>
      </NavigationContainer>
    </PaperProvider>
  )
}