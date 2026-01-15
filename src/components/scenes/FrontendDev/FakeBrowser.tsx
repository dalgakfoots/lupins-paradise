'use client';

import { Search, RefreshCw, ArrowLeft, ArrowRight, X, Minus, Square, Plus, Star, MoreVertical } from 'lucide-react';

interface FakeBrowserProps {
    url?: string;
    children: React.ReactNode;
}

export default function FakeBrowser({ url = "https://stackoverflow.com/questions/12345/how-to-center-div", children }: FakeBrowserProps) {
    return (
        <div className="flex flex-col h-full bg-white overflow-hidden border-l border-gray-300 shadow-xl font-sans text-sm">
            {/* 1. Tab Strip & Window Title Bar */}
            <div className="bg-[#dfe3e7] flex items-end px-2 pt-2 gap-2 select-none relative h-[40px]">

                {/* Active Tab */}
                <div className="relative group max-w-[240px] flex-1 h-full">
                    <div className="absolute inset-0 bg-white rounded-t-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] z-10 mx-[-1px]" />
                    <div className="relative z-20 flex items-center justify-between h-full px-3 pr-2 pt-1 text-xs text-gray-800">
                        <div className="flex items-center gap-2 overflow-hidden">
                            {/* Favicon */}
                            <div className="w-4 h-4 rounded-full bg-orange-500 shrink-0 flex items-center justify-center text-[8px] text-white font-bold">S</div>
                            <span className="truncate font-medium">How to allow ... - Stack Overflow</span>
                        </div>
                        <div className="p-1 hover:bg-gray-200 rounded-full cursor-pointer">
                            <X size={12} className="text-gray-500" />
                        </div>
                    </div>
                </div>

                {/* New Tab Button */}
                <div className="p-1 hover:bg-gray-300/50 rounded-full cursor-pointer mb-1">
                    <Plus size={16} className="text-gray-600" />
                </div>

                {/* Flexible Spacer */}
                <div className="flex-1 drag-handle" />

                {/* Window Controls (Chrome Windows Style) */}
                <div className="flex items-center h-full mb-auto -mt-2 -mr-2">
                    <div className="h-8 w-12 flex items-center justify-center hover:bg-gray-300/50 cursor-default">
                        <Minus size={16} className="text-gray-600" />
                    </div>
                    <div className="h-8 w-12 flex items-center justify-center hover:bg-gray-300/50 cursor-default">
                        <Square size={12} className="text-gray-600" />
                    </div>
                    <div className="h-8 w-12 flex items-center justify-center hover:bg-[#e81123] hover:text-white cursor-default transition-colors">
                        <X size={16} className="text-gray-600" />
                    </div>
                </div>
            </div>

            {/* 2. Navigation & Address Bar (Toolbar) */}
            <div className="bg-white py-1.5 px-2 flex items-center gap-2 border-b border-gray-100">
                {/* Nav Controls */}
                <div className="flex gap-1 text-gray-500">
                    <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer disabled opacity-50"><ArrowLeft size={16} /></div>
                    <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer disabled opacity-50"><ArrowRight size={16} /></div>
                    <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer"><RefreshCw size={14} /></div>
                </div>

                {/* Address Bar (Omnibox) */}
                <div className="flex-1 bg-[#f1f3f4] hover:bg-[#ebeded] focus-within:bg-white focus-within:shadow-[0_0_0_2px_#1a73e8] focus-within:border-transparent transition-colors rounded-full px-3 py-1.5 flex items-center gap-2 text-sm text-gray-700 mx-1">
                    <div className="text-gray-500"><Search size={14} /></div>
                    <div className="flex-1 truncate select-all cursor-text selection:bg-[#b3d7ff]">{url}</div>
                    <div className="text-gray-400 hover:text-gray-600 cursor-pointer"><Star size={14} /></div>
                </div>

                {/* Extensions / Menu */}
                <div className="flex gap-1 text-gray-500">
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold cursor-pointer">L</div>
                    <div className="p-1.5 hover:bg-gray-100 rounded-full cursor-pointer"><MoreVertical size={16} /></div>
                </div>
            </div>

            {/* 3. Bookmarks Bar */}
            <div className="bg-white px-2 py-1 flex items-center gap-2 border-b border-gray-200 text-xs text-gray-600 overflow-hidden whitespace-nowrap">
                <BookmarkItem icon="M" color="bg-red-500" label="Gmail" />
                <BookmarkItem icon="Y" color="bg-red-600" label="YouTube" />
                <BookmarkItem icon="M" color="bg-blue-500" label="Maps" />
                <BookmarkItem icon="G" color="bg-black" label="GitHub" />
                <BookmarkItem icon="L" color="bg-purple-500" label="Lupin's Paradise" />
                <BookmarkItem icon="N" color="bg-black" label="Next.js Docs" />
            </div>

            {/* 4. Browser Viewport */}
            <div className="flex-1 overflow-auto bg-white relative">
                {children}
            </div>
        </div>
    );
}

function BookmarkItem({ icon, color, label }: { icon: string, color: string, label: string }) {
    return (
        <div className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-100 rounded-full cursor-pointer max-w-[150px]">
            <div className={`w-3 h-3 rounded-full ${color} text-white flex items-center justify-center text-[8px] font-bold`}>{icon}</div>
            <span className="truncate">{label}</span>
        </div>
    )
}
