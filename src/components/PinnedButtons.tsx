"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useAppContext } from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $pinned-buttons
|--------------------------------------------------------------------------
|
| Fixed pinned buttons component that stays visible on the left side
| - Register Interest button
| - Download Brochure button
| - WhatsApp button
| - Dark brown pill-shaped design
| - Always visible, fixed position
|
*/
export default function PinnedButtons() {
    const { t } = useTranslation();
    const { direction } = useAppContext();
    const isRTL = direction === "rtl";
    const phoneNumber = "966920031839"; // Saudi Arabia country code + phone number
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <div className={`fixed ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-4 sm:bottom-6 z-50`}>
            <div className="flex flex-col gap-2 sm:gap-3 rounded-full p-2 sm:p-3 shadow-lg" style={{ backgroundColor: '#4e1b1f' }}>
                {/* Register Interest Button */}
                <Link
                    href="#register"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group"
                    aria-label={t("nav.register")}
                    title={t("nav.register")}
                >
                    <Image
                        src="/images/icon1.png"
                        alt={t("nav.register")}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                </Link>

                {/* Download Brochure Button */}
                <Link
                    href="/documents/miraf.pdf"
                    target="_blank"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group"
                    aria-label={t("overview.cta")}
                    title={t("overview.cta")}
                >
                    <Image
                        src="/images/icon2.png"
                        alt={t("overview.cta")}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                </Link>

                {/* WhatsApp Button */}
                <Link
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group"
                    aria-label="Contact Miraf on WhatsApp"
                    title="Contact Miraf on WhatsApp"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="currentColor"
                        className="w-5 h-5 sm:w-6 sm:h-6 text-burgundy"
                    >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.1-25.2-115-69.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 339.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56 81.2 56 130.5 0 101.8-84.1 184.6-186.1 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                    </svg>
                </Link>
            </div>
        </div>
    );
}

