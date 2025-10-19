"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*
|--------------------------------------------------------------------------
| $app-loader-provider
|--------------------------------------------------------------------------
|
| Provides an initial full-screen loading screen for ~1s on first mount,
| then fades out smoothly to reveal the main app content.
|
| Features:
| - Animated logo/title and spinner
| - Fade-out transition using Framer Motion
| - Automatically hides after 1 second
|
*/
export default function AppLoaderProvider({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 1000); // Hide after 1 second
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show ? (
                <motion.div key="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy text-blush">
                    {/* App name or logo */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="en-display text-3xl md:text-5xl font-semibold tracking-tight">
                        Miraf&nbsp;District
                    </motion.div>

                    {/* Spinner */}
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mt-8 h-10 w-10 border-4 border-blush border-t-transparent rounded-full"/>
                </motion.div>
            ) : (
                <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}