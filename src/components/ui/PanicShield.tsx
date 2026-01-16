'use client';

import { useEffect, useState } from 'react';
import { useSimulationStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function PanicShield() {
    const { status, triggerPanic, resetPanic } = useSimulationStore();
    // We can use a local state to ensure it renders immediately on the client side without hydration mismatch if needed
    // But zustand is fine.

    // ESC key listener removed per user request (feature disabled)
    /* useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (status === 'panic') {
                    resetPanic();
                } else {
                    triggerPanic();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [status, triggerPanic, resetPanic]); */

    return (
        <AnimatePresence>
            {status === 'panic' && (
                <motion.div
                    initial={{ opacity: 1 }} // Instant appear
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
                >
                    {/* Placeholder for the "Safe" image. In a real scenario, this would be a screenshot of Excel or email. */}
                    <div className="w-full h-full bg-gray-100 flex flex-col">
                        <div className="bg-[#217346] text-white p-2 text-sm font-bold flex items-center gap-4">
                            <span>Book1 - Excel</span>
                        </div>
                        <div className="flex-1 p-4 grid grid-cols-12 gap-1 overflow-hidden opacity-50">
                            {/* Very basic fake grid visual */}
                            {Array.from({ length: 200 }).map((_, i) => (
                                <div key={i} className="border border-gray-300 h-8 bg-white" />
                            ))}
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span className="text-4xl font-bold opacity-10 text-black">SAFE MODE (ESC to return)</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
