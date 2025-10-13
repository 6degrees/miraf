"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import Slider from "@/components/Slider";
import MapMiraf from "@/components/MapMiraf";
import {useAppContext} from "@/context/AppContext";

/*
|--------------------------------------------------------------------------
| $about-district
|--------------------------------------------------------------------------
|
| Section describing the “About the District” part of the Miraf site.
| Contains:
| - Left column: localized title + subtitle text
| - Right column: showcase image + icon + heading + description
|
| Uses Tailwind for responsive typography and layout.
|
*/
export default function AboutDistrict() {
    /*
    |--------------------------------------------------------------------------
    | $i18n-translator
    |--------------------------------------------------------------------------
    |
    | Retrieve the `t` function from i18next for localized strings.
    |
    */
    const { t } = useTranslation();
    const { direction, } = useAppContext();

   /*
   |--------------------------------------------------------------------------
   | $section-layout
   |--------------------------------------------------------------------------
   |
   | Two-column grid layout:
   | - Left: title and paragraph text
   | - Right: image card with caption
   | Background uses warm beige (#F3E6D6) to match Miraf branding.
   |
   */
    return (
       <Slider
           dir={direction }
           items={[
               <section className="relative h-screen bg-[#F3E6D6] text-burgundy">
                   <div className="container">
                       <div className="grid lg:grid-cols-2 gap-12 md:gap-20 xl:gap-48 items-start py-16 md:py-24">
                           {/* Left: Title + blurb */}
                           <div className="order-2 lg:order-1">
                               <h2 className="font-semibold leading-tight tracking-tight text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-burgundy">
                                   <span className="flex items-center gap-6 sm:gap-8">
                                       <span className="block">{t("about.0.cards.0.title.0")}</span>
                                       <Image src="/icons/ml_Icon_09.png" alt={t("about.0.cards.0.title.1")} height={96} width={96} className="inline-block h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"/>
                                   </span>
                                   <span className="block mt-1 sm:mt-2">{t("about.0.cards.0.title.1")}</span>
                               </h2>
                               <p className="mt-6 max-w-md text-base sm:text-lg md:text-xl leading-relaxed">{t("about.0.cards.0.body")}</p>
                           </div>

                           {/* Right Section - Image + Card */}
                           <div className="order-1 lg:order-2">
                               <div className="w-full">
                                   <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                                       <Image src="/images/miraf_renders_10edited.png" alt={t("about.0.cards.1.title.0")} fill className="object-cover" priority/>
                                   </div>

                                   {/* Caption / Text under Image */}
                                   <div className="mt-10">
                                       {/* Image */}
                                       <Image src="/icons/ml_icon_07.png" alt="icon" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8 object-contain"/>

                                       {/* Title */}
                                       <h3 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight">
                                           {t("about.0.cards.1.title.0")}
                                       </h3>

                                       {/* Description */}
                                       <p className="mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">{t("about.0.cards.1.body")}</p>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>,
               <section className="relative h-screen bg-[#F3E6D6] text-burgundy">
                   <div className="container">
                       <div className="grid lg:grid-cols-2 gap-12 md:gap-20 xl:gap-48 items-start py-16 md:py-24">
                           {/* Left: - Image + Card */}
                           <div className="w-full">
                               {/* Caption / Text under Image */}
                               <div className="mb-10">
                                   {/* Image */}
                                   <Image src="/icons/ml_icon_05.png" alt="icon" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8 object-contain"/>

                                   {/* Title */}
                                   <h3 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight">
                                       {t("about.1.cards.0.title.0")}
                                   </h3>

                                   {/* Description */}
                                   <p className="mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">{t("about.1.cards.0.body")}</p>
                               </div>

                               <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                                   <Image src="/images/cam10_open_retail_semi_bird_05.jpg" alt={t("about.1.cards.0.title.0")} fill className="object-cover" priority/>
                               </div>
                           </div>

                           {/* Right Section - Image + Card */}
                           <div className="w-full">
                               <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
                                   <Image src="/images/01_cam_13_lobby hotel _02.jpg" alt={t("about.1.cards.1.title.0")} fill className="object-cover" priority/>
                               </div>

                               {/* Caption / Text under Image */}
                               <div className="mt-10">
                                   {/* Image */}
                                   <Image src="/icons/ml_icon_08.png" alt="icon" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8 object-contain"/>

                                   {/* Title */}
                                   <h3 className="text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-semibold leading-tight">
                                       {t("about.1.cards.1.title.0")}
                                   </h3>

                                   {/* Description */}
                                   <p className="mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">{t("about.1.cards.1.body")}</p>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>,
               <section className="relative min-h-screen bg-[#F3E6D6] text-burgundy">
                   <div className="container">
                       <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 md:gap-20 xl:gap-32 items-center py-16 md:py-24">
                           {/* Left: Image + Card */}
                           <div className="w-full space-y-8">
                               <div>
                                   <Image
                                       src="/icons/ml_icon-06.png"
                                       alt="icon"
                                       width={32}
                                       height={32}
                                       className="h-6 w-6 md:h-8 md:w-8 object-contain"
                                   />
                                   <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight">
                                       {t("about.2.cards.0.title.0")}
                                   </h3>
                                   <p className="mt-3 md:mt-4 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">
                                       {t("about.2.cards.0.body")}
                                   </p>
                               </div>

                               <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg">
                                   <Image
                                       src="/images/cam12_office landscape_view_05.jpg"
                                       alt={t("about.1.cards.0.title.0")}
                                       fill
                                       className="object-cover"
                                       priority
                                   />
                               </div>
                           </div>

                           {/* Right: Wide Map + Caption */}
                           <div className="w-full">
                               <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg">
                                   <MapMiraf />
                               </div>

                               <div className="mt-10 ps-14">
                                   <h2 className="font-semibold leading-tight tracking-tight text-2xl md:text-3xl lg:text-5xl xl:text-7xl text-burgundy">
                                       <span className="block mt-1 sm:mt-2">{t("about.2.cards.1.title.0")}</span>
                                       <span className="flex items-center gap-6 sm:gap-8">
                                          <Image
                                              src="/icons/ml_Icon.png"
                                              alt={t("about.0.cards.0.title.1")}
                                              height={96}
                                              width={96}
                                              className="inline-block h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 object-contain"
                                          />
                                           <span className="block">
                                            {t("about.2.cards.1.title.1")}
                                          </span>
                                        </span>
                                       <span className="block mt-1 sm:mt-2">{t("about.2.cards.1.title.2")}</span>
                                   </h2>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>
           ]}
       />
    );

}
