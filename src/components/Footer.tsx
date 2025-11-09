"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

/*
|------------------------------------------------------------------------------
| $footer:props
|------------------------------------------------------------------------------
| Component Props:
| - className   : optional wrapper class (for external layout control)
| - bgClass     : background color class (default: blush tone)
| - textClass   : text color class (default: burgundy tone)
|------------------------------------------------------------------------------
*/
type FooterProps = {
    className?: string;
    bgClass?: string;
    textClass?: string;
};

/*
|------------------------------------------------------------------------------
| $footer:component
|------------------------------------------------------------------------------
| Main Footer component for the Miraf website.
|
| Structure:
| - 3 responsive columns (stacked on mobile, horizontal on md+)
| - Left   : Navigation links (translated)
| - Center : Social icons + contact information
| - Right  : Postal & street addresses
|
| Features:
| - i18n-ready using `t()` for dynamic translation
| - Configurable via Tailwind classes (bgClass, textClass, className)
| - Accessible SVG-based social icons with hover states
|------------------------------------------------------------------------------
*/
export default function Footer(
    {
        bgClass = "bg-blush",
        textClass = "text-burgundy",
        className = "",
    }: FooterProps)
{

    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    | Retrieve localized strings from i18next.
    | The `t()` function pulls translated labels from your locale JSON files.
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation();

    /*
    |--------------------------------------------------------------------------
    | $footer-content
    |--------------------------------------------------------------------------
    | Define all static and localized footer content:
    | - nav           : navigation links (translated)
    | - email/phone   : contact info
    | - socials       : external social media URLs
    | - addressPostal : first address group (postal)
    | - addressStreet : second address group (street)
    |--------------------------------------------------------------------------
    */
    const nav = [
        { label: t("footer.nav.district"), href: "#district" },
        { label: t("footer.nav.overview"), href: "#overview" },
        { label: t("footer.nav.gallery"), href: "#gallery" },
        { label: t("footer.nav.developer"), href: "#developer" },
    ];
    const email = "info@miraf.com.sa";
    const phone = "920031839";

    const socials = {
        linkedin: "https://www.linkedin.com/",
        instagram: "https://www.instagram.com/",
        x: "https://x.com/",
    };

    const addressPostal = [
        t("footer.addresses.0.0"),
        t("footer.addresses.0.1"),
    ];

    const addressStreet = [
        t("footer.addresses.1.0"),
        t("footer.addresses.1.1"),
    ];

    /*
    |--------------------------------------------------------------------------
    | $component-render
    |--------------------------------------------------------------------------
    | Layout structure:
    | - 3-column responsive design (stacked on mobile)
    | - Left   : navigation links
    | - Center : social icons + email/phone
    | - Right  : postal & street addresses
    |--------------------------------------------------------------------------
    */
    return (
        <footer className={`${bgClass} ${textClass} ${className} font-kanun`}>
            <div className="container-x">
                {/* Divider Line */}
                <div className="border-t border-burgundy/20" />

                {/* Content Section */}
                <div className="py-8 md:py-10">
                    <div className="flex flex-col sm:flex-row justify-between gap-10 md:gap-16">

                        {/*
                        |----------------------------------------------------------
                        | Left: Navigation Links
                        |----------------------------------------------------------
                        | Displays translated nav labels defined above.
                        |----------------------------------------------------------
                        */}
                        <nav className="flex-1">
                            <ul className="space-y-3 text-xl leading-7">
                                {nav.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className="relative text-burgundy hover:text-burgundy/70 transition-colors duration-300 group"
                                        >
                                            {item.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy/70 transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/*
                        |----------------------------------------------------------
                        | Center: Social Icons + Contact Info
                        |----------------------------------------------------------
                        | - Displays social media SVG icons with hover effects
                        | - Shows company email and phone below icons
                        |----------------------------------------------------------
                        */}
                        <div className="flex-1 grid grid-cols-2 gap-6 items-start sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-3">
                            {/* Social Icons */}
                            <div className="flex items-center gap-3">
                                {/* LinkedIn */}
                                {socials.linkedin && (
                                    <Link
                                        href={socials.linkedin}
                                        aria-label="LinkedIn"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                    >
                                        <div
                                            className="flex items-center justify-center w-7 h-7 rounded-md bg-[#561721]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                fill="white"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    d="M100.28 448H7.4V149.5h92.88zm-46.44-338a53.66 53.66 0 1 1 53.66-53.66 53.67 53.67 0 0 1-53.66 53.66zM447.9 448h-92.68V302.4c0-34.7-.7-79.3-48.3-79.3-48.3 0-55.7 37.7-55.7 76.6V448h-92.7V149.5h88.9v40.7h1.3c12.4-23.5 42.7-48.3 87.8-48.3 94 0 111.3 61.9 111.3 142.3V448z"
                                                />
                                            </svg>
                                        </div>
                                    </Link>
                                )}

                                {/* Instagram */}
                                {socials.instagram && (
                                    <Link
                                        href={socials.instagram}
                                        aria-label="Instagram"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                                            <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.3.4.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.3 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.3-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.3-.4-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.3-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.3 2.3-.4C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.2 0-3.5 0-4.7.1-1 .1-1.6.2-2 .3-.5.1-.8.3-1.1.6-.3.3-.5.6-.6 1.1-.1.4-.2 1-.3 2-.1 1.2-.1 1.5-.1 4.7s0 3.5.1 4.7c.1 1 .2 1.6.3 2 .1.5.3.8.6 1.1.3.3.6.5 1.1.6.4.1 1 .2 2 .3 1.2.1 1.5.1 4.7.1s3.5 0 4.7-.1c1-.1 1.6-.2 2-.3.5-.1.8-.3 1.1-.6.3-.3.5-.6.6-1.1.1-.4.2-1 .3-2 .1-1.2.1-1.5.1-4.7s0-3.5-.1-4.7c-.1-1-.2-1.6-.3-2-.1-.5-.3-.8-.6-1.1-.3-.3-.6-.5-1.1-.6-.4-.1-1-.2-2-.3-1.2-.1-1.5-.1-4.7-.1zm0 3.2a6.8 6.8 0 1 1 0 13.6A6.8 6.8 0 0 1 12 7.2m0 11.2a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8zm5.2-11.9a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0z" />
                                        </svg>
                                    </Link>
                                )}

                                {/* X (Twitter) */}
                                {socials.x && (
                                    <Link
                                        href={socials.x}
                                        aria-label="X"
                                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
                                            <path d="M18.9 2H22l-6.9 7.9L23.5 22H16l-5-6.9L4 22H1l7.5-8.6L.8 2H8l4.6 6.2L18.9 2zM16.8 20h2.2L7.3 4H5.1l11.7 16z" />
                                        </svg>
                                    </Link>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="text-sm leading-6">
                                <div>{email}</div>
                                <div>{phone}</div>
                            </div>
                        </div>

                        {/*
                        |----------------------------------------------------------
                        | Right: Address Columns
                        |----------------------------------------------------------
                        | Displays both postal and street addresses.
                        | Each array is rendered as a vertical block of text lines.
                        |----------------------------------------------------------
                        */}
                        <div className="flex-1 leading-6 text-start sm:text-end">
                            {/* Postal Address */}
                            <div className="space-y-1">
                                {addressPostal.map((line, i) => (
                                    <div className="inline sm:block" key={`p-${i}`}>{line}</div>
                                ))}
                            </div>

                            {/* Street Address */}
                            <div className="mt-6 space-y-1">
                                {addressStreet.map((line, i) => (
                                    <div className="inline sm:block" key={`s-${i}`}>{line}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}