import { useState, useEffect } from 'react';
import { Check, RefreshCw } from "lucide-react";
import { FileNode } from '@/lib/simulation/types';

interface SourceControlPaneProps {
    projectStructure?: FileNode;
}

export default function SourceControlPane({ projectStructure }: SourceControlPaneProps) {
    const [changes, setChanges] = useState<{ name: string, path: string }[]>([]);

    useEffect(() => {
        if (!projectStructure) return;

        // Pick 2-4 random files to be "Changed"
        const allFiles: { name: string, path: string }[] = [];

        const traverse = (node: FileNode, path: string) => {
            if (node.type === 'file') {
                allFiles.push({ name: node.name, path });
            } else if (node.children) {
                node.children.forEach(child => traverse(child, node.name === 'root' ? '' : `${path}/${node.name}`)); // Simplified path
            }
        };

        if (projectStructure.children) {
            projectStructure.children.forEach(child => traverse(child, projectStructure.name));
        }

        const count = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const shuffled = allFiles.sort(() => 0.5 - Math.random());
        setChanges(shuffled.slice(0, count));

    }, []); // Run once on mount (per session) usually, but key might change if structure changes?
    // For now, let's keep it static per mount to avoid flickering.

    return (
        <div className="flex flex-col h-full text-[#cccccc]">
            <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase">Source Control</span>
                <div className="flex gap-2">
                    <RefreshCw size={14} className="cursor-pointer hover:text-white" />
                    <Check size={14} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            <div className="px-2">
                <div className="bg-[#2a2d2e] p-2 mb-2 rounded border border-[#3c3c3c]">
                    <div className="text-xs text-gray-400 mb-1">Message (Ctrl+Enter to commit)</div>
                    <input type="text" className="w-full bg-[#1e1e1e] border-none text-white text-xs p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-gray-600" placeholder="Commit message..." />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 mt-2">
                <div className="text-xs font-bold mb-2 uppercase tracking-wide text-blue-400">
                    Changes ({changes.length})
                </div>

                {changes.map((file, i) => (
                    <div key={i} className="group flex items-center text-sm py-1 px-2 hover:bg-[#2a2d2e] cursor-pointer">
                        <span className="text-[#e2c08d] mr-2 text-xs font-bold">M</span>
                        <span className="text-gray-300 truncate">{file.name}</span>
                        <span className="text-gray-500 text-xs ml-auto truncate max-w-[80px]">{file.path}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
