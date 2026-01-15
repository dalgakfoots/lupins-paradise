import { GitBranch, AlertTriangle, XCircle, Bell, Check } from 'lucide-react';

export default function StatusBar() {
    return (
        <div className="h-6 w-full bg-[#007acc] text-white flex items-center justify-between px-2 text-xs select-none">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <GitBranch size={12} />
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <XCircle size={12} />
                    <span>0</span>
                    <AlertTriangle size={12} />
                    <span>0</span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <span>Ln 42, Col 15</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <span>UTF-8</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-[#1f8ad2] px-1 rounded cursor-pointer">
                    <Bell size={12} />
                </div>
            </div>
        </div>
    );
}
