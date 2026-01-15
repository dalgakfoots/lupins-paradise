import { Bug, Plus, Trash2, Edit3, XCircle } from 'lucide-react';

interface DebugPaneProps {
    onAddFile: () => void;
    onDeleteFile: () => void;
    onRenameFile: () => void;
}

export default function DebugPane({ onAddFile, onDeleteFile, onRenameFile }: DebugPaneProps) {
    return (
        <div className="flex flex-col h-full text-[#cccccc]">
            <div className="p-4 flex justify-between items-center">
                <span className="text-xs font-bold uppercase text-red-400">Chaos Engineering</span>
                <Bug size={14} className="text-red-400" />
            </div>

            <div className="px-4 space-y-4">
                <div className="bg-[#2a2d2e] p-3 rounded border border-[#3c3c3c]">
                    <h3 className="text-xs font-bold mb-2 text-white">Filesystem Mutations</h3>

                    <button onClick={onAddFile} className="w-full flex items-center gap-2 p-2 hover:bg-[#3c3c3c] rounded text-left mb-1 transition-colors">
                        <Plus size={14} className="text-green-400" />
                        <span className="text-sm">Scaffold Component</span>
                    </button>

                    <button onClick={onRenameFile} className="w-full flex items-center gap-2 p-2 hover:bg-[#3c3c3c] rounded text-left mb-1 transition-colors">
                        <Edit3 size={14} className="text-yellow-400" />
                        <span className="text-sm">Refactor (Rename)</span>
                    </button>

                    <button onClick={onDeleteFile} className="w-full flex items-center gap-2 p-2 hover:bg-[#3c3c3c] rounded text-left mb-1 transition-colors">
                        <Trash2 size={14} className="text-red-400" />
                        <span className="text-sm">Random Deletion</span>
                    </button>
                </div>

                <div className="bg-[#2a2d2e] p-3 rounded border border-[#3c3c3c]">
                    <h3 className="text-xs font-bold mb-2 text-white">System Events</h3>

                    <button className="w-full flex items-center gap-2 p-2 hover:bg-[#3c3c3c] rounded text-left mb-1 transition-colors opacity-50 cursor-not-allowed">
                        <XCircle size={14} className="text-orange-400" />
                        <span className="text-sm">Simulate Crash</span>
                    </button>
                </div>
            </div>

            <div className="flex-1 p-4 text-xs text-gray-500 mt-4 text-center">
                Use these tools to verify the user's reaction to unexpected environment changes.
            </div>
        </div>
    );
}
