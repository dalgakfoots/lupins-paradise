'use client';

import { useEffect } from 'react';
import { useSimulationStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import FrontendDevScene from '@/components/scenes/FrontendDev';

export default function SimulationPage() {
    const { job } = useSimulationStore();
    const router = useRouter();

    useEffect(() => {
        if (!job) {
            router.push('/');
        }
    }, [job, router]);

    if (!job) return null;

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative">
            {/* 
        In the future, we can add a generic "OS" wrapper here (Fake Windows/Mac Taskbar).
        For now, we just render the fullscreen app for the specific job.
      */}

            {job === 'frontend' && <FrontendDevScene />}

            {job !== 'frontend' && (
                <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-2">Work in Progress</h2>
                        <p>The {job} simulation module is currently compiling...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
