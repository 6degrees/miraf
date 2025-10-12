"use client";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18";

/*
|--------------------------------------------------------------------------
| $i18n-provider
|--------------------------------------------------------------------------
|
| Wraps the React tree with `I18nextProvider` so that hooks like
| `useTranslation()` from `react-i18next` work anywhere in your app.
|
| Notes:
| - Ensure the singleton i18n instance is initialized in ../lib/i18n (or ../lib/i18).
| - Keep this as a Client Component (`"use client"`), since react-i18next is client-side.
|
*/
export default function I18nProvider({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}