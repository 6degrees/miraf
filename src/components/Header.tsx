"use client";

import Image from "next/image";
import {useState} from "react";
import { useTranslation } from "react-i18next";
import {useAppContext} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $site-header
|--------------------------------------------------------------------------
|
| Miraf top navigation (logo, links, language toggle, mobile drawer).
| - Self-manages the mobile menu state.
| - Receives `rtl` and `toggleDir` from the parent (page/layout).
|
| Usage:
|   <Header rtl={rtl} toggleDir={toggleDir} />
|
*/
export default function Header() {
    /*
    |--------------------------------------------------------------------------
    | $nav-state & $i18n-handlers
    |--------------------------------------------------------------------------
    | - `t`                 : translator bound to current language (react-i18next)
    | - `selectedLanguage`  : current app language from context ("en" | "ar")
    | - `setSelectedLanguage`: toggles language via context (updates i18next)
    | - `menuOpen`          : mobile drawer state
    | - `rtl`               : local UI flag (optional if you derive from language)
    | - `handleLanguageSelection`: toggles between "en" and "ar"
    */
    const { t } = useTranslation();
    const { selectedLanguage, setSelectedLanguage } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLanguageSelection = (lang: string|null) => {
        setSelectedLanguage(lang === "ar" ? "en" : "ar");
    };

    /*
    |--------------------------------------------------------------------------
    | $site-header
    |--------------------------------------------------------------------------
    |
    | Miraf top navigation (logo, localized links, language toggle, mobile drawer).
    | - Uses Tailwind `container` for width/padding.
    | - Desktop: inline nav; Mobile: hamburger → overlay drawer.
    | - Language toggle calls `handleLanguageSelection(selectedLanguage)`.
    |
    */
    return (
        <header className="relative z-100">
            <div className="container-x">
                <div className="flex items-start justify-between w-full py-5">
                    {/* Logo */}
                    <a href="#" className="flex items-center select-none">
                        <Image src="/icons/logo.png" alt="Miraf District Logo" width={100} height={60} priority className="h-28 w-28 md:h-auto md:w-auto object-contain"/>
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-8 text-md font-medium">
                        <a href="#district"  className="hover:opacity-90">{t("nav.district")}</a>
                        <a href="#overview"  className="hover:opacity-90">{t("nav.overview")}</a>
                        <a href="#gallery"   className="hover:opacity-90">{t("nav.gallery")}</a>
                        <a href="#developer" className="hover:opacity-90">{t("nav.developer")}</a>
                        <a href="#register"  className="rounded-full border border-white/40 px-4 py-2 hover:bg-white/10 transition">
                            {t("nav.register")}
                        </a>
                        <button
                            onClick={() => handleLanguageSelection(selectedLanguage)}
                            className={`cursor-pointer hover:opacity-90 bold ${selectedLanguage === 'ar' ? "en-display" : "ar-display"}`}>
                            {selectedLanguage === 'ar' ? "En" : "عربي"}
                        </button>
                    </nav>

                    {/* Mobile button */}
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 bg-white/10 ring-1 ring-white/15 backdrop-blur"
                        aria-label="Open menu">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" className="h-8 w-8">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Sidebar (mobile) */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-[rgba(74,17,18,0.92)] backdrop-blur-md ring-1 ring-white/10 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="px-6 py-6 space-y-3 text-md text-white">
                    <a className="block py-2" href="#district" onClick={() => setMenuOpen(false)}>{t("nav.district")}</a>
                    <a className="block py-2" href="#overview" onClick={() => setMenuOpen(false)}>{t("nav.overview")}</a>
                    <a className="block py-2" href="#gallery" onClick={() => setMenuOpen(false)}>{t("nav.gallery")}</a>
                    <a className="block py-2" href="#developer" onClick={() => setMenuOpen(false)}>{t("nav.developer")}</a>
                    <a className="block py-2" href="#register" onClick={() => setMenuOpen(false)}>{t("nav.register")}</a>

                    <button
                        className={`mt-2 w-full rounded-full border border-white/20 px-4 py-2 ${selectedLanguage === 'ar' ? "en-display" : "ar-display"}`}
                        onClick={() => {
                            handleLanguageSelection(selectedLanguage)
                            setMenuOpen(false);
                        }}
                    >
                        {selectedLanguage === 'ar' ? "En" : "عربي"}
                    </button>
                </div>
            </div>

            {/* Overlay when sidebar open */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
}
