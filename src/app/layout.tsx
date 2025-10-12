import "./globals.css";
import localFont from "next/font/local";
import {AppProvider} from "@/context/AppContext";
import i18n from "i18next";
import I18nProvider from "@/providers/I18nProvider";
import LangDirEffect from "@/components/LangDirEffect";

/*
|--------------------------------------------------------------------------
| $fonts
|--------------------------------------------------------------------------
|
| Registers local fonts via Next.js `next/font/local` and exposes CSS
| variables on <body> for use across the app (Tailwind/CSS).
|
| Variables:
|   --font-abc-arizona-serif
|   --font-angie-sans-pro
|   --font-graphik-arabic
|   --font-kanun-ar
|   --font-lyon-arabic
|
*/

/*
| ABC Arizona Serif — Display (EN)
| variable: --font-abc-arizona-serif | weights: 300
*/
const abcArizonaSerif = localFont({
    src: [
        { path: "./fonts/ABCArizonaSerif-Light.otf", weight: "300", style: "normal" },
    ],
    variable: "--font-abc-arizona-serif",
    display: "swap",
});

/*
| Angie Sans Pro — UI Sans (EN)
| variable: --font-angie-sans-pro | weights: 400, 600
*/
const angieSansPro = localFont({
    src: [
        { path: "./fonts/AngieSansPro-Regular.otf", weight: "400", style: "normal" },
        { path: "./fonts/AngieSansPro-Demi.otf", weight: "600", style: "normal" },
    ],
    variable: "--font-angie-sans-pro",
    display: "swap",
});

/*
| Graphik Arabic — UI Sans (AR)
| variable: --font-graphik-arabic | weights: 400
*/
const graphikArabic = localFont({
    src: [
        { path: "./fonts/GraphikArabic-Regular.otf", weight: "400", style: "normal" },
    ],
    variable: "--font-graphik-arabic",
    display: "swap",
});

/*
| Kanun AR+ — Accent (AR)
| variable: --font-kanun-ar | weights: 300, 400, 500
*/
const kanunAR = localFont({
    src: [
        { path: "./fonts/KanunAR+LT-Light.otf", weight: "300", style: "normal" },
        { path: "./fonts/KanunAR+LT-Regular.otf", weight: "400", style: "normal" },
        { path: "./fonts/KanunAR+LT-Medium.otf", weight: "500", style: "normal" },
    ],
    variable: "--font-kanun-ar",
    display: "swap",
});

/*
| Lyon Arabic Display — Headlines (AR)
| variable: --font-lyon-arabic | weights: 300, 400
*/
const lyonArabic = localFont({
    src: [
        { path: "./fonts/LyonArabicDisplay-Light.otf", weight: "300", style: "normal" },
        { path: "./fonts/LyonArabicDisplay-Regular.otf", weight: "400", style: "normal" },
    ],
    variable: "--font-lyon-arabic",
    display: "swap",
});

/*
|--------------------------------------------------------------------------
| $root-layout
|--------------------------------------------------------------------------
|
| Top-level layout:
| - Wraps the app with <AppProvider> (language/context state).
| - Sets <html lang/dir> from the current i18n language.
| - Applies local font CSS variables on <body> for Tailwind/CSS usage.
| - Injects <I18nProvider> so react-i18next hooks work in children.
|
*/
export default function RootLayout({ children }: { children: React.ReactNode }) {
    /*
    |--------------------------------------------------------------------------
    | $root-layout
    |--------------------------------------------------------------------------
    |
    | Composition order (top → bottom):
    | - <AppProvider>    : App-wide state (language context, etc.)
    | - <html lang/dir>  : Defaults from i18n; client sync via <LangDirEffect />
    | - <body className> : Registers local font CSS variables for Tailwind/CSS
    | - <I18nProvider>   : Enables react-i18next hooks throughout subtree
    | - <LangDirEffect>  : Keeps <html lang/dir> in sync after client switches
    | - {children}       : Page content
    |
    */
    return (
        <AppProvider>
            <html lang={i18n.language || "en"} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
            <body
                className={[
                    abcArizonaSerif.variable,
                    angieSansPro.variable,
                    graphikArabic.variable,
                    kanunAR.variable,
                    lyonArabic.variable,
                ].join(" ")}
            >
            <I18nProvider>
                <LangDirEffect />
                {children}
            </I18nProvider>
            </body>
            </html>
        </AppProvider>
    );
}