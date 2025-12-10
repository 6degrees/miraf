"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

/*
|--------------------------------------------------------------------------
| $pinned-buttons
|--------------------------------------------------------------------------
|
| Fixed pinned buttons component that stays visible on the left side
| - Download Brochure button
| - Register Interest button
| - Dark brown pill-shaped design
| - Always visible, fixed position
|
*/
export default function PinnedButtons() {
    const { t } = useTranslation();

    return (
        <div className="fixed left-6 bottom-6 z-50 hidden lg:block">
            <div className="flex flex-col gap-3 rounded-full p-3 shadow-lg" style={{ backgroundColor: '#4e1b1f' }}>
                {/* Register Interest Button */}
                <Link
                    href="#register"
                    className="w-12 h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group"
                    aria-label={t("nav.register")}
                    title={t("nav.register")}
                >
                    <Image
                        src="/images/icon1.png"
                        alt={t("nav.register")}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                    />
                </Link>

                {/* Download Brochure Button */}
                <Link
                    href="#"
                    className="w-12 h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group"
                    aria-label={t("overview.cta")}
                    title={t("overview.cta")}
                >
                    <Image
                        src="/images/icon2.png"
                        alt={t("overview.cta")}
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                    />
                </Link>
            </div>
        </div>
    );
}

