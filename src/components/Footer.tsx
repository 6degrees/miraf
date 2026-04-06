"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { getBaseUrl } from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $footer:props
|--------------------------------------------------------------------------
|
| Now receives CMS footer data
|
*/
type FooterProps = {
    footer: any;
    className?: string;
    bgClass?: string;
    textClass?: string;
};

export default function Footer(
    {
        footer,
        bgClass = "bg-blush",
        textClass = "text-burgundy",
        className = "",
    }: FooterProps)
{

    const { selectedLanguage } = useAppContext();

    if (!footer) return null;

    /*
    |--------------------------------------------------------------------------
    | $nav-links
    |--------------------------------------------------------------------------
    */
    const nav = footer?.footer_links?.map((item: any) => ({
        label:
            selectedLanguage === "ar"
                ? item.title_ar
                : item.title_en,
        href: item.href,
    })) || [];

    /*
    |--------------------------------------------------------------------------
    | $contact
    |--------------------------------------------------------------------------
    */
    const email = footer?.contact_info?.email;
    const phone = footer?.contact_info?.phone;

    /*
    |--------------------------------------------------------------------------
    | $socials
    |--------------------------------------------------------------------------
    */
    const socials = footer?.social_links || [];

    /*
    |--------------------------------------------------------------------------
    | $addresses
    |--------------------------------------------------------------------------
    */
    const address =
        selectedLanguage === "ar"
            ? footer?.contact_info?.address_ar
            : footer?.contact_info?.address_en;

    /*
    |--------------------------------------------------------------------------
    | $render
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | - ZERO layout changes
    | - ONLY dynamic data
    |
    */
    return (
        <footer className={`${bgClass} ${textClass} ${className} font-kanun`}>
            <div className="container-x">

                <div className="border-t border-burgundy/20" />

                <div className="py-8 md:py-10">
                    <div className="flex flex-col sm:flex-row justify-between gap-10 md:gap-16">

                        {/* NAV */}
                        <nav className="flex-1">
                            <ul className="space-y-3 text-xl leading-7">
                                {nav.map((item: any) => (
                                    <li key={item.label}>
                                        <Link href={item.href} className="group">
                                            {item.label}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-burgundy/70 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* CENTER */}
                        <div className="flex-1 grid grid-cols-2 gap-6 items-start sm:flex sm:flex-col sm:items-center sm:justify-center sm:gap-3">

                            {/* SOCIAL */}
                            <div className="flex items-center gap-2">
                                {socials.map((s: any) => {
                                    const iconUrl = s?.icon?.[0]?.url
                                        ? `${getBaseUrl()}${s.icon[0].url}`
                                        : null;

                                    if (!iconUrl) return null;

                                    return (
                                        <Link
                                            key={s.id}
                                            href={s.href || "#"}
                                            target="_blank"
                                        >
                                            <Image
                                                src={iconUrl}
                                                alt={s.title_en}
                                                width={28}
                                                height={28}
                                                className="h-5 w-5 sm:h-7 sm:w-7 object-contain"
                                            />
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* CONTACT */}
                            <div className="text-sm leading-6">
                                {email && (
                                    <div>
                                        <a href={`mailto:${email}`}>{email}</a>
                                    </div>
                                )}
                                {phone && (
                                    <div>
                                        <a href={`tel:${phone}`}>{phone}</a>
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* ADDRESS */}
                        <div className="flex-1 leading-tight sm:leading-6 text-start sm:text-end whitespace-pre-line">
                            {address}
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
}

