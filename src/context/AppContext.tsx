"use client";

/*
|--------------------------------------------------------------------------
| $i18n-context
|--------------------------------------------------------------------------
|
| Lightweight React Context to hold and update the current language.
| - Persists language state in memory for the active session.
| - Persists language to localStorage ("miraf-lang") for future reloads.
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
| $constants
|--------------------------------------------------------------------------
|
| Key used for persisting language selection in localStorage.
|
*/
const STORAGE_KEY = "miraf-lang";

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
| - Initializes from localStorage (fallback: "ar")
| - Calls i18next.changeLanguage on updates
| - Updates <html dir/lang> attributes
| - Persists new language to localStorage
| - Exposes `direction` derived via langToDir()
|
*/
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedLanguage, _setSelectedLanguage] = useState<string | null>(null);

  // Load initial language from localStorage or default to "ar"
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      _setSelectedLanguage(saved || i18next.language || "ar");
    } catch {
      _setSelectedLanguage("ar");
    }
  }, []);

  // Whenever selectedLanguage changes:
  // - Notify i18next
  // - Update document attributes
  // - Save to localStorage
  useEffect(() => {
    if (!selectedLanguage) return;

    // Switch i18n language
    if (i18next.language !== selectedLanguage) {
      i18next.changeLanguage(selectedLanguage);
    }

    // Update document direction + language
    const dir = langToDir(selectedLanguage);
    const html = document.documentElement;
    html.setAttribute("dir", dir);
    html.setAttribute("lang", selectedLanguage);

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, selectedLanguage);
    } catch {
      // Ignore storage errors (private mode, etc.)
    }
  }, [selectedLanguage]);

  const setSelectedLanguage = (lang: string | null) => {
    if (!lang) return;
    _setSelectedLanguage(lang);
  };

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
|
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