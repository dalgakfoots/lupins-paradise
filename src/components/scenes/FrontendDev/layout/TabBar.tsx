import { useRef, useState } from 'react';
import { X, CopyX } from 'lucide-react';

interface TabBarProps {
    openFiles: string[];
    activeFile: string | null;
    onTabClick: (fileName: string) => void;
    onCloseTab: (fileName: string) => void;
    onCloseAll: () => void;
}

export default function TabBar({ openFiles, activeFile, onTabClick, onCloseTab, onCloseAll }: TabBarProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isDown = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const isDragging = useRef(false);

    const [isGrabbing, setIsGrabbing] = useState(false);

    // Drag Handlers
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        isDown.current = true;
        isDragging.current = false;
        setIsGrabbing(true);
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
    };

    const handleMouseLeave = () => {
        isDown.current = false;
        setIsGrabbing(false);
    };

    const handleMouseUp = () => {
        isDown.current = false;
        setIsGrabbing(false);
        // Small timeout to ensure onClick event fires and sees isDragging correctly before we reset?
        // Actually, onClick fires after MouseUp. If we don't reset immediately, it persists. 
        // We will reset isDragging in the click handler or rely on the fact that click happens right after.
        // Better: Reset on next tick.
        setTimeout(() => { isDragging.current = false; }, 0);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDown.current || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Scroll-fast
        if (Math.abs(x - startX.current) > 5) {
            isDragging.current = true;
        }
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleInternalTabClick = (fileName: string) => {
        if (isDragging.current) return;
        onTabClick(fileName);
    };

    return (
        <div className="flex bg-[#252526] text-[#969696] text-sm select-none border-b border-[#1e1e1e] h-[35px]">
            {/* Scrollable Tabs Container */}
            <div
                ref={scrollContainerRef}
                className={`flex-1 flex overflow-x-auto no-scrollbar ${isGrabbing ? 'cursor-grabbing' : ''}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                {openFiles.map(fileName => (
                    <div
                        key={fileName}
                        onClick={() => handleInternalTabClick(fileName)}
                        className={`
                            px-3 border-r border-[#252526] flex items-center gap-2 min-w-fit group whitespace-nowrap
                            ${isGrabbing ? 'cursor-grabbing' : 'cursor-pointer'}
                            ${activeFile === fileName ? 'bg-[#1e1e1e] border-t border-blue-400 text-white' : 'bg-[#2d2d2d] hover:bg-[#252526]'}
                        `}
                    >
                        <span className={getFileColor(fileName)}>
                            {getFileIconText(fileName)}
                        </span>
                        <span>{fileName}</span>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                // Close should work even if dragged slightly, but usually safe to allow.
                                // If huge drag, maybe avoid. But Close button is small target.
                                if (!isDragging.current) onCloseTab(fileName);
                            }}
                            className={`hover:bg-gray-700 rounded p-[1px] ${activeFile === fileName ? 'visible' : 'invisible group-hover:visible'}`}
                        >
                            <X size={14} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Close All Button (Fixed on the right) */}
            <div
                onClick={onCloseAll}
                className="w-9 flex items-center justify-center hover:bg-red-900/50 cursor-pointer text-gray-400 hover:text-white border-l border-[#1e1e1e] bg-[#252526] z-10"
                title="Close All"
            >
                <div className="relative">
                    <CopyX size={16} />
                </div>
            </div>
        </div>
    );
}

function getFileIconText(name: string) {
    if (name.endsWith('.tsx')) return 'TSX';
    if (name.endsWith('.ts')) return 'TS';
    if (name.endsWith('.json')) return '{}';
    if (name.endsWith('.css')) return '#';
    return 'TXT';
}

function getFileColor(name: string) {
    if (name.endsWith('.tsx')) return 'text-blue-400';
    if (name.endsWith('.ts')) return 'text-blue-400';
    if (name.endsWith('.json')) return 'text-yellow-400';
    if (name.endsWith('.css')) return 'text-blue-300';
    return 'text-gray-400';
}
