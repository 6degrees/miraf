"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/*
|----------------------------------------------------------------------
| $slider:props — SAME API as your Swiper component
|----------------------------------------------------------------------
*/
export type SliderProps = {
    id: string;
    items: React.ReactNode[];
    dir?: "rtl" | "ltr";
    autoplayDelay?: number;
    containerClass?: string;
    className?: string;
    bgClass?: string;
    textClass?: string;
    style?: React.CSSProperties;
    background?: React.ReactNode;
    heightClass?: string;
    breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
    hasFooter?: boolean;
};

const defaultBreakpoints: Required<SliderProps>["breakpoints"] = {
    0: { slidesPerView: 1, spaceBetween: 0 },
    640: { slidesPerView: 1, spaceBetween: 0 },
    768: { slidesPerView: 1, spaceBetween: 0 },
    1024: { slidesPerView: 1, spaceBetween: 0 },
};

const BREAKPOINT = 991;

/*
|----------------------------------------------------------------------
| $component: Slider (Responsive: Swiper <991px, GSAP ≥991px)
|----------------------------------------------------------------------
| Small/Medium (<991px):
| - Uses Swiper exactly like your original implementation
|
| Desktop (≥991px):
| - GSAP + ScrollTrigger horizontal pinned scroll (xPercent)
|
| Footer:
| - Same counter + Prev/Next buttons, wired to the active mode
|----------------------------------------------------------------------
*/
export default function Slider(
    {
        id,
        items,
        autoplayDelay = 5000,
        dir = "ltr",
        className = "w-full",
        bgClass = "bg-[#F3E6D6]",
        textClass = "text-burgundy",
        style,
        background,
        containerClass = "container-x",
        heightClass = "h-[600px] md:h-[700px] lg:h-[900px]",
        breakpoints = defaultBreakpoints,
        hasFooter = false,
    }: SliderProps) {
    const total = items.length;
    const isRTL = dir === "rtl";

    /* mode state */
    const [isMobile, setIsMobile] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth < BREAKPOINT : true
    );

    /* shared index for footer */
    const [index, setIndex] = useState(0);

    /* Swiper refs (mobile) */
    const swiperRef = useRef<SwiperCore | null>(null);

    /* GSAP refs (desktop) */
    const hostRef = useRef<HTMLElement | null>(null);
    const slideRefs = useRef<HTMLDivElement[]>([]);
    const stRef = useRef<ScrollTrigger | null>(null);
    const ctxRef = useRef<gsap.Context | null>(null);

    const bpMemo = useMemo(() => breakpoints ?? defaultBreakpoints, [breakpoints]);

    /*
    |----------------------------------------------------------------------
    | $effect: responsive mode selector
    |----------------------------------------------------------------------
    | Keeps isMobile in sync with resize events.
    */
    useEffect(() => {
        const onResize = () => {
            setIsMobile(window.innerWidth < BREAKPOINT);
        };
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /*
    |----------------------------------------------------------------------
    | $effect: GSAP ScrollTrigger setup (desktop only)
    |----------------------------------------------------------------------
    | Implements the pinned horizontal scroll (xPercent across .panel).
    | Counter updates from progress.
    */
    useEffect(() => {
        if (isMobile) {
            // tear down any desktop ST if switching to mobile
            ctxRef.current?.revert();
            stRef.current = null;
            return;
        }
        const host = hostRef.current;
        if (!host) return;

        ctxRef.current?.revert();
        ctxRef.current = gsap.context(() => {
            const panels = slideRefs.current.filter(Boolean);
            const xPercentTotal = (panels.length - 1) * 100;
            const xPercent = isRTL ? xPercentTotal : -xPercentTotal;

            panels.forEach((el) => {
                el.style.width = `${host.clientWidth}px`; // 1 panel = 100vw
                el.style.marginRight = `0px`;
            });

            const tween = gsap.to(panels, {
                xPercent,
                ease: "none",
                scrollTrigger: {
                    id: `${id}-st`,
                    trigger: host,
                    pin: true,
                    scrub: 1,
                    end: () => "+=" + host.offsetWidth,
                    onUpdate: (self) => {
                        const i = Math.round(self.progress * (Math.max(1, panels.length) - 1));
                        setIndex(i);
                        stRef.current = self;
                    },
                    onRefresh: (self) => {
                        stRef.current = self;
                    },
                },
            });

            return () => {
                tween?.scrollTrigger?.kill();
                tween?.kill();
            };
        }, host);

        return () => {
            ctxRef.current?.revert();
            stRef.current = null;
        };
    }, [id, dir, total, isMobile, bgClass, textClass, className, heightClass, containerClass]);

    /*
    |----------------------------------------------------------------------
    | $function: slidePrev / slideNext
    |----------------------------------------------------------------------
    | Routes to the correct control depending on mode:
    | - Mobile: Swiper navigation
    | - Desktop: ScrollTrigger go-to via window.scrollTo (progress → Y)
    |----------------------------------------------------------------------
    */
    const currentIndexDesktop = () => {
        const st = stRef.current;
        if (!st || total <= 1) return 0;
        return Math.round(st.progress * (total - 1));
    };

    const goToDesktopIndex = (i: number) => {
        const st = stRef.current;
        if (!st || total <= 1) return;
        const maxIndex = total - 1;
        const clamped = Math.max(0, Math.min(i, maxIndex));
        const start = st.start;
        const end = st.end;
        const progress = clamped / maxIndex;
        const targetY = start + progress * (end - start);
        window.scrollTo({ top: targetY, behavior: "smooth" });
        setIndex(clamped);
    };

    const slidePrev = () => {
        if (total <= 1) return;
        if (isMobile) {
            swiperRef.current && swiperRef.current.slidePrev();
        } else {
            goToDesktopIndex(currentIndexDesktop() - 1);
        }
    };

    const slideNext = () => {
        if (total <= 1) return;
        if (isMobile) {
            swiperRef.current && swiperRef.current.slideNext();
        } else {
            goToDesktopIndex(currentIndexDesktop() + 1);
        }
    };

    /*
    |----------------------------------------------------------------------
    | $component-render
    |----------------------------------------------------------------------
    | Renders the complete Slider component structure
    |----------------------------------------------------------------------
    |
    | - On small/medium screens: Swiper (your original behavior)
    | - On desktop: GSAP + ScrollTrigger pinned horizontal scrolling
    | - Footer: shared counter and Prev/Next controls
    |
    */
    return (
        <section
            id={id}
            className={`thecontainer relative ${bgClass} ${textClass} ${heightClass} ${className}`}
            style={style}
            dir={dir}
            ref={!isMobile ? (hostRef as any) : undefined}
        >
            {background && (
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    {background}
                </div>
            )}

            {/* Mobile & Tablet: Swiper */}
            {isMobile && (
                <Swiper
                    key={`swiper-${id}-${dir}`}
                    id={`swiper-${id}-${dir}`}
                    modules={[Autoplay]}
                    dir={dir}
                    autoplay={
                        autoplayDelay > 0
                            ? { delay: autoplayDelay, disableOnInteraction: false }
                            : false
                    }
                    spaceBetween={0}
                    breakpoints={bpMemo}
                    allowTouchMove
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper as unknown as SwiperCore;
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper as unknown as SwiperCore;
                    }}
                    onSlideChange={(swiper) =>
                        setIndex(swiper.realIndex ?? swiper.activeIndex ?? 0)
                    }
                    className={className}
                >
                    {items.map((node, idx) => (
                        <SwiperSlide key={`slide-${id}-${idx}`} id={`swiper-slide-${id}-${idx}`}>
                            <div className={containerClass}>
                                <div className={`relative w-full ${heightClass}`}>{node}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Desktop: GSAP + ScrollTrigger */}
            {!isMobile && (
                <div className={`overflow-hidden w-full`}>
                    <div className={containerClass}>
                        <div className={`relative w-full ${heightClass} overflow-hidden`}>
                            <div className="absolute inset-0 flex will-change-transform">
                                {items.map((node, idx) => (
                                    <div
                                        key={`slide-${id}-${idx}`}
                                        ref={(el) => {
                                            if (el) slideRefs.current[idx] = el;
                                        }}
                                        className="panel h-full flex-shrink-0 w-[100vw]"
                                    >
                                        <div className="h-full w-full">{node}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Footer (high z-index so it’s always clickable) */}
            {hasFooter && (
                <div className={`hidden md:block absolute -bottom-0 lg:-bottom-10 left-0 right-0 z-30 ${bgClass}`}>
                    <div className={"container-x"}>
                        <div className="w-full py-1 flex items-center justify-between">
                            <div className="text-sm md:text-base opacity-80 select-none">
                                {total > 0 ? `${(index % Math.max(total, 1)) + 1} / ${total}` : "0 / 0"}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    aria-label="Previous"
                                    onClick={slidePrev}
                                    className="grid h-6 w-6 place-items-center rounded-full bg-burgundy/95 text-[#F6E6DA] hover:opacity-85 transition"
                                >
                                    {isRTL ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    aria-label="Next"
                                    onClick={slideNext}
                                    className="grid h-6 w-6 place-items-center rounded-full bg-burgundy/95 text-[#F6E6DA] hover:opacity-85 transition"
                                >
                                    {isRTL ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
