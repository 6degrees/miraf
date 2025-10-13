"use client";

/*
|--------------------------------------------------------------------------
| $i18n-context
|--------------------------------------------------------------------------
|
| Lightweight React Context to hold and update the current language.
| - Persists language state in memory for the active session.
| - Notifies i18next to switch language whenever state changes.
| - Exposes helpers to derive layout direction (rtl/ltr).
|
| Usage:
|   const { selectedLanguage, setSelectedLanguage, direction } = useAppContext();
|   const dir = useDir(); // "rtl" | "ltr"
|   const d  = langToDir("ar"); // "rtl"
|
*/

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import i18next from "i18next";

/*
|--------------------------------------------------------------------------
| $dir-utils
|--------------------------------------------------------------------------
|
| Pure utility to map language code to document direction.
| - "ar", "fa", "ur", "he" -> "rtl"
| - everything else        -> "ltr"
|
*/
export function langToDir(lang?: string): "rtl" | "ltr" {
  const rtlLangs = new Set(["ar", "fa", "ur", "he"]);
  const base = (lang ?? "").toLowerCase().split("-")[0]; // e.g. "ar-SA" -> "ar"
  return rtlLangs.has(base) ? "rtl" : "ltr";
}

/*
|--------------------------------------------------------------------------
| $app-context
|--------------------------------------------------------------------------
|
| Strongly-typed context for app-wide language and derived direction.
|
*/
type AppContextValue = {
  selectedLanguage: string | null;
  setSelectedLanguage: (lang: string | null) => void;
  direction: "rtl" | "ltr";
};

const AppContext = createContext<AppContextValue | null>(null);

/*
|--------------------------------------------------------------------------
| $app-provider
|--------------------------------------------------------------------------
|
| Provides language state and derived direction to the tree.
| - Calls i18next.changeLanguage on updates
| - Exposes `direction` derived via langToDir()
|
*/
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedLanguage) i18next.changeLanguage(selectedLanguage);
  }, [selectedLanguage]);

  const direction = useMemo<"rtl" | "ltr">(
      () => langToDir(selectedLanguage ?? undefined),
      [selectedLanguage]
  );

  return (
      <AppContext.Provider value={{ selectedLanguage, setSelectedLanguage, direction }}>
        {children}
      </AppContext.Provider>
  );
}

/*
|--------------------------------------------------------------------------
| useAppContext
|--------------------------------------------------------------------------
| Convenience hook to read/write the app language and derived direction.
|
*/
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within <AppProvider />");
  return ctx;
}

/*
|--------------------------------------------------------------------------
| useDir
|--------------------------------------------------------------------------
|
| Returns the current layout direction derived from context language.
| - Fallback: "ltr" when language is not set yet
|
*/
export function useDir(): "rtl" | "ltr" {
  const { direction } = useAppContext();
  return direction ?? "ltr";
}