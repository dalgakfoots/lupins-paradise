'use client';

import { useEffect, useRef } from 'react';

interface AdSenseUnitProps {
    slotId: string;
    format?: 'auto' | 'fluid' | 'rectangle';
    layoutKey?: string;
    style?: React.CSSProperties;
    className?: string;
}

export default function AdSenseUnit({
    slotId,
    format = 'auto',
    layoutKey,
    style,
    className
}: AdSenseUnitProps) {
    const isDev = process.env.NODE_ENV === 'development' || slotId === '1234567890' || slotId === '0987654321';
    const hasRequested = useRef(false);

    useEffect(() => {
        if (isDev) return;

        try {
            // @ts-ignore
            if (window.adsbygoogle && !hasRequested.current) {
                // @ts-ignore
                window.adsbygoogle.push({});
                hasRequested.current = true;
            }
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, [isDev]);

    // Localhost / Dev Mode Placeholder
    if (isDev) {
        return (
            <div
                className={`bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 text-center text-gray-400 text-xs w-full overflow-hidden ${className}`}
                style={{ minHeight: '100px', ...style }}
            >
                <div className="font-bold mb-1">Google AdSense</div>
                <div>Slot: {slotId}</div>
                <div className="text-[10px] mt-1 opacity-70">(Visible on Production)</div>
            </div>
        );
    }

    return (
        <div className={`overflow-hidden ${className}`} style={style}>
            <ins className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Placeholder ID
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true"
                data-ad-layout-key={layoutKey}
            />
        </div>
    );
}
