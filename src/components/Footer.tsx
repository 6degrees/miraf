"use client";

import Link from "next/link";
import Image from "next/image";
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

    const phoneNumber = "966920031839"; // Saudi Arabia country code + phone number
    const socials = {
        linkedin: "https://www.linkedin.com/company/refad-for-real-estate-investment-and-development/posts/?feedView=all",
        instagram: "https://www.instagram.com/refad_ksa/",
        x: "https://x.com/Refad_ksa",
        whatsapp: `https://wa.me/${phoneNumber}`,
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
                                        aria-label="Visit Miraf on LinkedIn"
                                        className="inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div
                                            className="flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-md bg-[#561721]">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                                fill="white"
                                                className="w-4 h-4 sm:w-6 sm:h-6"
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
                                        aria-label="Follow Miraf on Instagram"
                                        className="inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/icons/instagram.png"
                                            alt="Instagram"
                                            width={28}
                                            height={28}
                                            className="h-7 w-7 sm:h-9 sm:w-9 object-contain"
                                        />
                                    </Link>
                                )}

                                {/* X (Twitter) */}
                                {socials.x && (
                                    <Link
                                        href={socials.x}
                                        aria-label="Follow Miraf on X (Twitter)"
                                        className="inline-flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg viewBox="0 0 24 24" className="h-7 w-7 sm:h-9 sm:w-9 fill-current">
                                            <path d="M18.9 2H22l-6.9 7.9L23.5 22H16l-5-6.9L4 22H1l7.5-8.6L.8 2H8l4.6 6.2L18.9 2zM16.8 20h2.2L7.3 4H5.1l11.7 16z" />
                                        </svg>
                                    </Link>
                                )}

                                {/* WhatsApp */}
                                {socials.whatsapp && (
                                    <Link
                                        href={socials.whatsapp}
                                        aria-label="Contact Miraf on WhatsApp"
                                        className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-sm text-burgundy hover:text-burgundy/70 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src="/icons/whatsapp.png"
                                            alt="WhatsApp"
                                            width={40}
                                            height={40}
                                            className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                                        />
                                    </Link>
                                )}
                            </div>

                            {/* Contact Info */}
                            <div className="text-sm leading-6">
                                <div>
                                    <a href={`mailto:${email}`} className="text-burgundy hover:text-burgundy/70 transition-colors duration-300">
                                        {email}
                                    </a>
                                </div>
                                <div>
                                    <a href={`tel:${phone}`} className="text-burgundy hover:text-burgundy/70 transition-colors duration-300">
                                        {phone}
                                    </a>
                                </div>
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
                        <div className="flex-1 leading-tight sm:leading-6 text-start sm:text-end">
                            {/* Postal Address */}
                            <div className="space-y-0 sm:space-y-1">
                                {addressPostal.map((line, i) => (
                                    <div className="inline sm:block" key={`p-${i}`}>{line}</div>
                                ))}
                            </div>

                            {/* Street Address */}
                            <div className="mt-3 sm:mt-6 space-y-0 sm:space-y-1">
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