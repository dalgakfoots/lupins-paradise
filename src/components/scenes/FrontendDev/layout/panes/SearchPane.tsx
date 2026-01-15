import { useState, useMemo } from 'react';
import { FileNode } from '@/lib/simulation/types';
import { ChevronRight, ChevronDown, FileCode, Folder } from 'lucide-react';

interface SearchPaneProps {
    projectStructure?: FileNode;
}

export default function SearchPane({ projectStructure }: SearchPaneProps) {
    const [query, setQuery] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);

    const activeProject = projectStructure;

    const results = useMemo(() => {
        if (!query || !activeProject) return [];

        const hits: { file: FileNode; path: string }[] = [];

        const traverse = (node: FileNode, path: string) => {
            if (node.type === 'file') {
                if (node.name.toLowerCase().includes(query.toLowerCase())) {
                    hits.push({ file: node, path });
                }
            } else if (node.children) {
                node.children.forEach(child => traverse(child, `${path}/${node.name}`));
            }
        };

        // Start search from children of root
        if (activeProject.children) {
            activeProject.children.forEach(child => traverse(child, activeProject.name));
        }

        return hits;
    }, [query, activeProject]);

    return (
        <div className="flex flex-col h-full text-[#cccccc]">
            <div className="p-4 text-xs font-bold uppercase flex justify-between">
                <span>Search</span>
            </div>
            <div className="px-4 pb-4 border-b border-[#252526]">
                <div className="bg-[#3c3c3c] flex items-center p-1 border border-[#3c3c3c] focus-within:border-blue-500">
                    <input
                        type="text"
                        placeholder="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent border-none text-sm text-white focus:outline-none w-full placeholder-gray-400"
                    />
                </div>
                {query && (
                    <div className="mt-2 text-xs text-gray-500">
                        {results.length} results found
                    </div>
                )}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {query ? (
                    results.length > 0 ? (
                        <div className="flex flex-col">
                            {results.map((hit, i) => (
                                <div key={i} className="flex flex-col cursor-pointer hover:bg-[#2a2d2e] px-4 py-1">
                                    <div className="flex items-center text-sm font-medium text-gray-300">
                                        <FileCode size={14} className="mr-2 text-blue-400" />
                                        {hit.file.name}
                                    </div>
                                    <div className="text-[10px] text-gray-500 pl-6 truncate">
                                        {hit.path}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-4 text-center text-sm text-gray-500 mt-4">
                            No results found.
                        </div>
                    )
                ) : (
                    <div className="p-4 text-center text-sm text-gray-500 mt-10">
                        Type to search...
                    </div>
                )}
            </div>
        </div>
    );
}
