"use client";

import Image from "next/image";
import {useState} from "react";
import {getBaseUrl, useAppContext} from "@/context/AppContext";
import Link from "next/link";

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
export default function Header({ header }: { header: any }) {
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
    const { selectedLanguage, setSelectedLanguage } = useAppContext();
    const [menuOpen, setMenuOpen] = useState(false);
    const handleLanguageSelection = (lang: string | null) => {
        setSelectedLanguage(lang === "ar" ? "en" : "ar");
    };
    if (!header) return null;

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
                        <Image
                            src={`${getBaseUrl()}${header?.logo?.url}`}
                            alt="logo"
                            width={100}
                            height={60}
                            priority
                            className="h-28 w-28 md:h-32 md:w-32 object-contain"
                        />
                    </a>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-8 text-md font-medium">
                        {header?.nav_links?.map((link: any) => {
                            const isRegister = link.href === "/#register";

                            if (isRegister) {
                                return (
                                    <Link
                                        key={link.id}
                                        href={link.href}
                                        className="rounded-full border border-white/40 px-4 py-2 hover:bg-white/10 hover:border-blush/60 hover:text-blush transition-all duration-300 kanun"
                                    >
                                        {selectedLanguage === "ar" ? link.title_ar : link.title_en}
                                    </Link>
                                );
                            }

                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    className="relative text-white hover:text-blush transition-colors duration-300 group"
                                >
                                    {selectedLanguage === "ar" ? link.title_ar : link.title_en}
                                    <span
                                        className="absolute bottom-0 left-0 w-0 h-0.5 bg-blush transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            );
                        })}

                        <button
                            onClick={() => handleLanguageSelection(selectedLanguage)}
                            className={`cursor-pointer text-white hover:text-blush transition-colors duration-300 bold kanun ${
                                selectedLanguage === "ar" ? "en-display" : "ar-display"
                            }`}
                        >
                            {selectedLanguage === "ar" ? "En" : "عربي"}
                        </button>
                    </nav>

                    {/* Mobile button */}
                    <button
                        onClick={() => setMenuOpen((o) => !o)}
                        className="lg:hidden inline-flex items-center justify-center rounded-xl p-2 bg-white/10 ring-1 ring-white/15 backdrop-blur"
                        aria-label="Open menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             className="h-8 w-8">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Sidebar (mobile) */}
            <div
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-[rgba(74,17,18,0.92)] backdrop-blur-md ring-1 ring-white/10 transform transition-transform duration-300 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="px-6 py-6 space-y-3 text-md text-white">
                    {header?.nav_links?.map((link: any) => {
                        const isRegister = link.href === "/#register";

                        if (isRegister) {
                            return (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="block rounded-full border border-white/20 px-4 py-2 text-center hover:text-blush hover:border-blush/60 transition-all duration-300 kanun"
                                >
                                    {selectedLanguage === "ar" ? link.title_ar : link.title_en}
                                </Link>
                            );
                        }

                        return (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block py-2 text-white hover:text-blush transition-colors duration-300"
                            >
                                {selectedLanguage === "ar" ? link.title_ar : link.title_en}
                            </Link>
                        );
                    })}

                    <button
                        className={`mt-2 w-full rounded-full border border-white/20 px-4 py-2 text-white hover:text-blush hover:border-blush/60 transition-all duration-300 kanun ${
                            selectedLanguage === "ar" ? "en-display" : "ar-display"
                        }`}
                        onClick={() => {
                            handleLanguageSelection(selectedLanguage);
                            setMenuOpen(false);
                        }}
                    >
                        {selectedLanguage === "ar" ? "En" : "عربي"}
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
