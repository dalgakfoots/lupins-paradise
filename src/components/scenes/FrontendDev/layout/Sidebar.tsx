import { ChevronDown, ChevronRight, FileCode, Folder, Hash, FileJson, FileType, FileText } from 'lucide-react';
import { useState } from 'react';
import { FileNode } from '@/lib/simulation/types';
import SearchPane from './panes/SearchPane';
import SourceControlPane from './panes/SourceControlPane';
import DebugPane from './panes/DebugPane';
import ExtensionsPane from './panes/ExtensionsPane';

interface SidebarProps {
    projectStructure: FileNode;
    activeView: string;
    onAddFile?: () => void;
    onDeleteFile?: () => void;
    onRenameFile?: () => void;
    onOpenFile?: (fileName: string) => void;
}

export default function Sidebar({ projectStructure, activeView, onAddFile, onDeleteFile, onRenameFile, onOpenFile }: SidebarProps) {
    return (
        <div className="w-full h-full bg-[#252526] text-[#cccccc] text-sm flex flex-col border-r border-[#1e1e1e] select-none">
            {activeView === 'explorer' && <ExplorerPane projectStructure={projectStructure} onOpenFile={onOpenFile} />}
            {activeView === 'search' && <SearchPane projectStructure={projectStructure} />}
            {activeView === 'scm' && <SourceControlPane projectStructure={projectStructure} />}
            {activeView === 'debug' && <DebugPane onAddFile={onAddFile!} onDeleteFile={onDeleteFile!} onRenameFile={onRenameFile!} />}
            {activeView === 'extensions' && <ExtensionsPane />}
        </div>
    );
}

function ExplorerPane({ projectStructure, onOpenFile }: { projectStructure: FileNode, onOpenFile?: (name: string) => void }) {
    return (
        <>
            <div className="p-2 text-xs font-bold pl-4 flex justify-between items-center group">
                <span>EXPLORER</span>
                <span className="opacity-0 group-hover:opacity-100 text-[10px] tracking-widest text-gray-500 mr-2">...</span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {projectStructure ? (
                    <FileTreeItem node={projectStructure} indent={0} isRoot onOpenFile={onOpenFile} />
                ) : (
                    <div className="p-4 text-xs text-gray-500">No folder opened</div>
                )}
            </div>
        </>
    );
}

function FileTreeItem({ node, indent, isRoot, onOpenFile }: { node: FileNode, indent: number, isRoot?: boolean, onOpenFile?: (name: string) => void }) {
    const [isOpen, setIsOpen] = useState(node.isOpen ?? false);

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.type === 'folder') {
            setIsOpen(!isOpen);
        } else {
            // It's a file
            onOpenFile?.(node.name);
        }
    };

    // Root node (Project Name) logic
    if (isRoot) {
        return (
            <div>
                <div
                    className="flex items-center font-bold px-1 py-1 cursor-pointer hover:bg-[#37373d] text-xs mb-1"
                    onClick={handleToggle}
                >
                    {isOpen ? <ChevronDown size={14} className="mr-1" /> : <ChevronRight size={14} className="mr-1" />}
                    <span>{node.name}</span>
                </div>
                {isOpen && node.children && (
                    <div className="flex flex-col">
                        {node.children.map((child, i) => (
                            <FileTreeItem key={child.name + i} node={child} indent={indent + 1} onOpenFile={onOpenFile} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    // Determine Icon
    const getIcon = () => {
        if (node.type === 'folder') {
            const hasChildren = node.children && node.children.length > 0;
            // Slightly different colors for some standard folders could be added here
            if (['src', 'components', 'lib', 'api'].includes(node.name)) return <Folder size={14} className="mr-1.5 text-blue-400" />;
            if (['node_modules', 'dist', 'build'].includes(node.name)) return <Folder size={14} className="mr-1.5 text-green-400" />;
            return <Folder size={14} className="mr-1.5 text-blue-300" />;
        }

        // File Icons
        if (node.name.endsWith('.tsx') || node.name.endsWith('.ts')) return <FileCode size={14} className="mr-1.5 text-blue-400" />;
        if (node.name.endsWith('.css') || node.name.endsWith('.scss')) return <Hash size={14} className="mr-1.5 text-blue-300" />;
        if (node.name.endsWith('.json')) return <FileJson size={14} className="mr-1.5 text-yellow-400" />;
        if (node.name.endsWith('.md')) return <FileText size={14} className="mr-1.5 text-gray-400" />;
        if (node.name.startsWith('.')) return <FileType size={14} className="mr-1.5 text-gray-500" />;

        return <FileCode size={14} className="mr-1.5 text-gray-400" />;
    };

    return (
        <div>
            <div
                className={`flex items-center py-0.5 cursor-pointer hover:bg-[#2a2d2e]`}
                style={{ paddingLeft: `${indent * 12 + (node.type === 'folder' ? 0 : 20)}px` }}
                onClick={handleToggle}
            >
                {/* Folder Arrow */}
                {node.type === 'folder' && (
                    <span className="mr-0.5">
                        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </span>
                )}

                {getIcon()}
                <span>{node.name}</span>
            </div>

            {/* Recursively render children if folder is open */}
            {node.type === 'folder' && isOpen && node.children && (
                <div>
                    {node.children.map((child, i) => (
                        <FileTreeItem key={child.name + i} node={child} indent={indent + 1} onOpenFile={onOpenFile} />
                    ))}
                </div>
            )}
        </div>
    );
}
