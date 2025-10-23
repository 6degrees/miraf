"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/*
|----------------------------------------------------------------------
| $props
|----------------------------------------------------------------------
| Public API for the Slider component
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
    breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
    isUseGSAP?: boolean;
    gsapSize?: number;
    hasFooter?: boolean;
};

/*
|----------------------------------------------------------------------
| $constants
|----------------------------------------------------------------------
*/
const BREAKPOINT = 1024;
const defaultBreakpoints: Required<SliderProps>["breakpoints"] = {
    0: { slidesPerView: 1, spaceBetween: 0 },
    640: { slidesPerView: 1, spaceBetween: 0 },
    768: { slidesPerView: 1, spaceBetween: 0 },
    1024: { slidesPerView: 1, spaceBetween: 0 },
};

/*
|----------------------------------------------------------------------
| $helpers
|----------------------------------------------------------------------
*/
const cn = (...xs: Array<string | false | null | undefined>) => xs.filter(Boolean).join(" ");

function useIsMobile(initial = true) {
    const [isMobile, setIsMobile] = useState<boolean>(
        typeof window !== "undefined" ? window.innerWidth < BREAKPOINT : initial
    );
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < BREAKPOINT);
        window.addEventListener("resize", onResize, { passive: true });
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return [isMobile, setIsMobile] as const;
}

/*
|----------------------------------------------------------------------
| $ui:buttons
|----------------------------------------------------------------------
*/
function ArrowIcon({ dir, kind }: { dir: "rtl" | "ltr"; kind: "prev" | "next" }) {
    const rtl = dir === "rtl";
    const left = (rtl && kind === "prev") || (!rtl && kind === "next");
    return left ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function IconButton({onClick, dir, kind,}: { onClick: () => void; dir: "rtl" | "ltr"; kind: "prev" | "next"; }) {
    return (
        <button type="button" aria-label={kind === "prev" ? "Previous" : "Next"} onClick={onClick} className="grid h-6 w-6 place-items-center rounded-full bg-burgundy/95 text-[#F6E6DA] hover:opacity-85 transition">
            <ArrowIcon dir={dir} kind={kind} />
        </button>
    );
}

/*
|----------------------------------------------------------------------
| $footer
|----------------------------------------------------------------------
*/
function Footer({total, index, onPrev, onNext, bgClass, dir,}: {total: number; index: number; onPrev: () => void; onNext: () => void; bgClass?: string; dir: "rtl" | "ltr"; }) {
    return (
        <div className={cn("hidden md:block absolute -bottom-0 lg:-bottom-10 left-0 right-0 z-30", bgClass)}>
            <div className="container-x">
                <div className="w-full py-1 flex items-center justify-between">
                    <div className="text-sm md:text-base opacity-80 select-none">
                        {total > 0 ? `${(index % Math.max(total, 1)) + 1} / ${total}` : "0 / 0"}
                    </div>
                    <div className="flex items-center gap-2">
                        <IconButton onClick={onPrev} dir={dir} kind="prev" />
                        <IconButton onClick={onNext} dir={dir} kind="next" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
|----------------------------------------------------------------------
| $component: Slider
|----------------------------------------------------------------------
| Responsive behavior:
| - Swiper for <1024px
| - GSAP ScrollTrigger for ≥1024px
|----------------------------------------------------------------------
*/
export default function Slider({id, items, autoplayDelay = 5000, dir = "ltr", className = "w-full", bgClass = "bg-[#F3E6D6]", textClass = "text-burgundy",  style, background, containerClass = "container-x", heightClass = "h-[600px] md:h-[700px] lg:h-[900px]", breakpoints = defaultBreakpoints, hasFooter = false, isUseGSAP = true, gsapSize=0}: SliderProps) {
    const total = items.length;
    const isRTL = dir === "rtl";
    const [isMobile, setIsMobile] = useIsMobile(true);
    useEffect(() => {
        if (!isUseGSAP) setIsMobile(true);
    }, [isUseGSAP, setIsMobile]);
    const [index, setIndex] = useState(0);
    const swiperRef = useRef<SwiperCore | null>(null);
    const hostRef = useRef<HTMLElement | null>(null);
    const slideRefs = useRef<HTMLDivElement[]>([]);
    const stRef = useRef<ScrollTrigger | null>(null);
    const ctxRef = useRef<gsap.Context | null>(null);
    const bpMemo = useMemo(() => breakpoints ?? defaultBreakpoints, [breakpoints]);

    /*
    |----------------------------------------------------------------------
    | $effect: GSAP setup
    |----------------------------------------------------------------------
    */
    useEffect(() => {
        if (isMobile) {
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
                el.style.width = `${host.clientWidth / gsapSize}px`;
                (el.style as any)[isRTL ? "marginLeft" : "marginRight"] = "0%";
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
    }, [id, dir, isRTL, isMobile, total]);

    /*
    |----------------------------------------------------------------------
    | $nav
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
    const go = (delta: -1 | 1) => {
        if (total <= 1) return;
        if (isMobile) {
            const s = swiperRef.current;
            if (!s) return;
            delta === -1 ? s.slidePrev() : s.slideNext();
        } else {
            goToDesktopIndex(currentIndexDesktop() + delta);
        }
    };

    /*
    |----------------------------------------------------------------------
    | $component-render
    |----------------------------------------------------------------------
    | Renders the complete Slider component structure
    |----------------------------------------------------------------------
    |
    | - On small/medium screens: Swiper (original behavior)
    | - On desktop: GSAP + ScrollTrigger pinned horizontal scrolling
    | - Footer: shared counter and Prev/Next controls
    |
    */
    return (
        <section id={id} className={cn("thecontainer relative", bgClass, textClass, heightClass, className)} style={style} dir={dir} ref={!isMobile ? (hostRef as any) : undefined}>
            {background && <div className="absolute inset-0 -z-10 pointer-events-none">{background}</div>}

            {isMobile && (
                <Swiper key={`swiper-${id}-${dir}`} id={`swiper-${id}-${dir}`} modules={[]} dir={dir} autoplay={autoplayDelay > 0 ? { delay: autoplayDelay, disableOnInteraction: false } : false} spaceBetween={0} breakpoints={bpMemo} allowTouchMove onBeforeInit={(s) => (swiperRef.current = s as unknown as SwiperCore)} onSlideChange={(s) => setIndex(s.realIndex ?? s.activeIndex ?? 0)} className={className}>
                    {items.map((node, idx) => (
                        <SwiperSlide key={`slide-${id}-${idx}`} id={`swiper-slide-${id}-${idx}`}>
                            <div className={containerClass}>
                                <div className={cn("relative w-full", heightClass)}>{node}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {!isMobile && (
                <div className="overflow-hidden w-full">
                    <div className={containerClass}>
                        <div className={cn("relative w-full overflow-hidden", heightClass)}>
                            <div className="absolute inset-0 flex will-change-transform">
                                {items.map((node, idx) => (
                                    <div key={`slide-${id}-${idx}`} ref={(el) => {if (el) slideRefs.current[idx] = el;}} className={`panel h-full flex-shrink-0`}>
                                        <div className="h-full w-full">{node}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {hasFooter && (
                <Footer total={total} index={index} onPrev={() => go(-1)} onNext={() => go(1)} bgClass={bgClass} dir={dir} />
            )}
        </section>
    );
}
