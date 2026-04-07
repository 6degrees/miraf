"use client";

import Link from "next/link";
import Image from "next/image";
import {useAppContext} from "@/context/AppContext";
import {getBaseUrl} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $pinned-buttons
|--------------------------------------------------------------------------
|
| Same layout — dynamic data from API
|
*/
export default function PinnedButtons({data}: { data: any }) {

    const {direction, selectedLanguage} = useAppContext();
    const isRTL = direction === "rtl";

    /*
    |--------------------------------------------------------------------------
    | $guard
    |--------------------------------------------------------------------------
    */
    const items = data?.[0]?.items?.filter((i: any) => i?.is_view) || [];
    if (!items.length) return null;

    /*
    |--------------------------------------------------------------------------
    | $helpers
    |--------------------------------------------------------------------------
    */
    const getLabel = (item: any) =>
        selectedLanguage === "ar" ? item.text_ar : item.text_en;

    const getIcon = (item: any) => {
        const url = item?.icon?.[0]?.url;
        return url ? `${getBaseUrl()}${url}` : null;
    };

    const isExternal = (url: string) => {
        if (!url) return false;
        return url.startsWith("http://") || url.startsWith("https://");
    };

    /*
    |--------------------------------------------------------------------------
    | $render
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    | - NO layout changes
    | - SAME design
    |
    */
    return (
        <div className={`fixed ${isRTL ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} bottom-4 sm:bottom-6 z-50`}>
            <div className="flex flex-col gap-2 sm:gap-3 rounded-full p-2 sm:p-3 shadow-lg"
                 style={{backgroundColor: '#4e1b1f'}}>

                {items.map((item: any) => {
                    const icon = getIcon(item);
                    const label = getLabel(item);

                    return (
                        <Link
                            key={item.id}
                            href={item.url || "#"}
                            target={isExternal(item.url) ? "_blank" : undefined}
                            rel="noopener noreferrer"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blush hover:bg-blush/80 flex items-center justify-center transition-colors duration-300 group focus-visible:ring-2 focus-visible:ring-blush focus-visible:ring-offset-2"
                            aria-label={label}
                            title={label}
                        >
                            {icon && (
                                <Image
                                    src={icon}
                                    alt={label}
                                    width={24}
                                    height={24}
                                    className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                                />
                            )}
                        </Link>
                    );
                })}

            </div>
        </div>
    );
}

