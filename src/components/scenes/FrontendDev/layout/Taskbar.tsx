import React, { useState, useEffect } from 'react';
import { Search, Wifi, Battery, Volume2, Monitor, ChevronUp } from 'lucide-react';

interface TaskbarProps {
    osType?: 'windows' | 'mac';
}

export default function Taskbar({ osType = 'windows' }: TaskbarProps) {
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Theme Detection
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDark(darkModeQuery.matches);

        const handleThemeChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
        darkModeQuery.addEventListener('change', handleThemeChange);

        // Time Update
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
            setDate(now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000 * 60);

        return () => {
            darkModeQuery.removeEventListener('change', handleThemeChange);
            clearInterval(interval);
        };
    }, []);

    if (osType === 'mac') {
        return (
            <div className={`fixed bottom-2 left-1/2 -translate-x-1/2 h-16 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/40 border-white/40'} backdrop-blur-xl border rounded-2xl flex items-center px-4 gap-4 shadow-2xl z-[9999]`}>
                <div className="w-12 h-12 bg-gray-800 rounded-xl shadow-inner"></div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl shadow-inner"></div>
                <div className="w-12 h-12 bg-green-500 rounded-xl shadow-inner"></div>
            </div>
        )
    }

    // Windows 11 Style Taskbar
    const bgClass = isDark ? 'bg-[#1a1a1a]/95 border-[#333] text-white' : 'bg-[#f3f3f3]/90 border-[#d9d9d9] text-black';
    const hoverClass = isDark ? 'hover:bg-white/10' : 'hover:bg-black/5';
    const activeClass = isDark ? 'bg-white/5' : 'bg-black/5';

    return (
        <div className={`fixed bottom-0 left-0 right-0 h-[48px] ${bgClass} backdrop-blur-md border-t flex items-center justify-between px-3 select-none z-[99999] w-full shrink-0 transition-colors duration-300`}>
            {/* Left side */}
            <div className={`flex items-center w-[140px] opacity-0 lg:opacity-100 ${hoverClass} rounded p-1 cursor-pointer transition-colors`}>
            </div>

            {/* Center Icons */}
            <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                <StartButton isDark={isDark} />
                <TaskbarIcon hoverClass={hoverClass} activeClass={activeClass}>
                    <Search size={20} className={isDark ? "text-gray-300" : "text-gray-600"} />
                </TaskbarIcon>
                <TaskbarIcon active hoverClass={hoverClass} activeClass={activeClass}>
                    <div className="w-5 h-5 bg-blue-600 rounded-[2px] flex items-center justify-center text-[10px] font-bold text-white">VS</div>
                </TaskbarIcon>
                <TaskbarIcon hoverClass={hoverClass} activeClass={activeClass}>
                    <div className={`w-5 h-5 ${isDark ? 'bg-gray-700 border-gray-500' : 'bg-gray-300 border-gray-400'} rounded-full flex items-center justify-center border-2`}>
                        <div className={`w-2 h-2 ${isDark ? 'bg-gray-500' : 'bg-gray-500'} rounded-full`}></div>
                    </div>
                </TaskbarIcon>
            </div>

            {/* Right Tray */}
            <div className="flex items-center gap-1 h-full">
                <div className={`${hoverClass} rounded p-1 cursor-pointer`}>
                    <ChevronUp size={16} />
                </div>
                <div className={`flex items-center gap-2 ${hoverClass} rounded px-2 py-1 cursor-pointer h-[80%]`}>
                    <Wifi size={16} />
                    <Volume2 size={16} />
                    <Battery size={16} className="rotate-90" />
                </div>
                <div className={`flex flex-col items-end justify-center px-2 ${hoverClass} rounded cursor-pointer h-[90%] text-right leading-none gap-0.5 min-w-[70px]`}>
                    <div className="text-xs font-medium">{time}</div>
                    <div className={`text-[10px] ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{date}</div>
                </div>
                <div className={`w-1 h-full border-l ${isDark ? 'border-gray-600' : 'border-gray-300'} ml-1 opacity-0 hover:opacity-100`}></div>
            </div>
        </div>
    );
}

function TaskbarIcon({ children, active, hoverClass, activeClass }: { children: React.ReactNode, active?: boolean, hoverClass: string, activeClass: string }) {
    return (
        <div className={`w-10 h-10 flex items-center justify-center rounded-[4px] ${hoverClass} cursor-pointer transition-all relative group ${active ? activeClass : ''}`}>
            {children}
            <div className={`absolute bottom-0 h-[3px] w-1.5 bg-gray-400 rounded-full transition-all group-hover:w-3 ${active ? 'w-4 bg-blue-400' : 'opacity-0 group-hover:opacity-100'}`} />
        </div>
    )
}

function StartButton({ isDark }: { isDark: boolean }) {
    return (
        <div className={`w-10 h-10 flex items-center justify-center rounded-[4px] ${isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'} cursor-pointer transition-all group`}>
            <div className="grid grid-cols-2 gap-[1px] group-active:scale-95 transition-transform">
                <div className="w-2.5 h-2.5 bg-[#00a2ed]"></div>
                <div className="w-2.5 h-2.5 bg-[#00a2ed]"></div>
                <div className="w-2.5 h-2.5 bg-[#00a2ed]"></div>
                <div className="w-2.5 h-2.5 bg-[#00a2ed]"></div>
            </div>
        </div>
    )
}
