import { Files, Search, GitGraph, Box, Bug } from 'lucide-react';

interface ActivityBarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

export default function ActivityBar({ activeView, onViewChange }: ActivityBarProps) {
    const isActive = (view: string) => activeView === view ? "text-white border-l-2 border-white" : "hover:text-white border-l-2 border-transparent";

    return (
        <div className="w-12 h-full bg-[#333333] flex flex-col items-center py-2 text-[#858585]">
            <div className={`p-3 ${isActive('explorer')} cursor-pointer w-full flex justify-center`} onClick={() => onViewChange('explorer')}>
                <Files size={24} />
            </div>
            <div className={`p-3 ${isActive('search')} cursor-pointer w-full flex justify-center`} onClick={() => onViewChange('search')}>
                <Search size={24} />
            </div>
            <div className={`p-3 ${isActive('scm')} cursor-pointer w-full flex justify-center`} onClick={() => onViewChange('scm')}>
                <GitGraph size={24} />
            </div>
            <div className={`p-3 ${isActive('debug')} cursor-pointer w-full flex justify-center`} onClick={() => onViewChange('debug')}>
                <Bug size={24} />
            </div>
            <div className={`p-3 ${isActive('extensions')} cursor-pointer w-full flex justify-center`} onClick={() => onViewChange('extensions')}>
                <Box size={24} />
            </div>
        </div>
    );
}
