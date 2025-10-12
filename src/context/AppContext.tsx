"use client";

/*
|--------------------------------------------------------------------------
| $i18n-context
|--------------------------------------------------------------------------
|
| Lightweight React Context to hold and update the current language.
| - Persists language state in memory for the active session.
| - Notifies i18next to switch language whenever state changes.
| - Exposes a custom hook `useAppContext()` for easy access in components.
|
| Usage:
|   const { selectedLanguage, setSelectedLanguage } = useAppContext();
|   setSelectedLanguage("ar"); // or "en"
|
*/

import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";

// Central context object shared across the app
const AppContext = createContext<any>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Holds the currently selected language (e.g., "en" | "ar")
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  // Side effect: whenever `selectedLanguage` changes, tell i18next to switch
  useEffect(() => {
    selectedLanguage ? i18next.changeLanguage(selectedLanguage) : null;
  }, [selectedLanguage]);

  // Provide both the value and the setter to all descendants
  return (
      <AppContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
        {children}
      </AppContext.Provider>
  );
}

/*
|--------------------------------------------------------------------------
| useAppContext
|--------------------------------------------------------------------------
| Convenience hook to read/write the app language from any component.
|
*/
export function useAppContext() {
  return useContext(AppContext);
}