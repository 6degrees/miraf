"use client";
import {useEffect} from "react";
import {useAppContext} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $lang-dir-effect
|--------------------------------------------------------------------------
|
| Syncs the <html> element's `lang` and `dir` attributes with the app's
| selected language from context. This keeps RTL/LTR and accessibility
| correct after client-side language switches.
|
| Behavior:
| - Defaults to "en" / "ltr" when no language is selected yet.
| - Updates on every `selectedLanguage` change.
|
*/
export default function LangDirEffect() {
    const {selectedLanguage} = useAppContext();
    useEffect(() => {
        const lng = selectedLanguage ?? "en";
        const html = document.documentElement;
        html.lang = lng;
        html.dir = lng === "ar" ? "rtl" : "ltr";
    }, [selectedLanguage]);
    return null;
}