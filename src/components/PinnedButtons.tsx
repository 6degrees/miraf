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
                    <Image
                        src="/icons/whatsapp.png"
                        alt="WhatsApp"
                        width={28}
                        height={28}
                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                    />
                </Link>
            </div>
        </div>
    );
}

