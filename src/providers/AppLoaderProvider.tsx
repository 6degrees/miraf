"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AppLoaderProvider({children, loading,}: { children: React.ReactNode; loading: boolean; }) {
    return (
        <>
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: loading ? 0 : 1 }} transition={{ duration: 0.3, ease: "easeOut" }}>
                {children}
            </motion.div>
            <AnimatePresence>
                {loading && (
                    <motion.div key="loader" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-burgundy text-blush">
                        {/* Logo */}
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                            <Image src="/icons/logo.png" alt="Miraf District Logo" width={200} height={120} className="w-48 md:w-64 h-auto object-contain" priority/>
                        </motion.div>

                        {/* Spinner */}
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="mt-8 h-10 w-10 border-4 border-blush border-t-transparent rounded-full"/>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}