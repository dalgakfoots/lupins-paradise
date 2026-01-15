import { useState } from 'react';
import { Search, Settings, MoreHorizontal } from 'lucide-react';

interface Extension {
    id: string;
    name: string;
    description: string;
    author: string;
    downloads: string;
    installed: boolean;
}

const MOCK_EXTENSIONS: Extension[] = [
    { id: '1', name: 'Prettier - Code formatter', description: 'Code formatter using prettier', author: 'Prettier', downloads: '38M', installed: true },
    { id: '2', name: 'ESLint', description: 'Integrates ESLint JavaScript into VS Code.', author: 'Microsoft', downloads: '28M', installed: true },
    { id: '3', name: 'GitLens — Git supercharged', description: 'Supercharge Git within VS Code', author: 'GitKraken', downloads: '25M', installed: false },
    { id: '4', name: 'Python', description: 'IntelliSense (Pylance), Linting, Debugging', author: 'Microsoft', downloads: '100M', installed: false },
    { id: '5', name: 'Dracula Official', description: 'Official Dracula Theme. A dark theme for many', author: 'Dracula Theme', downloads: '5M', installed: false },
    { id: '6', name: 'Docker', description: 'Makes it easy to create, manage, and debug container applications', author: 'Microsoft', downloads: '22M', installed: false },
    { id: '7', name: 'Live Server', description: 'Launch a development local Server with live reload', author: 'Ritwick Dey', downloads: '40M', installed: false },
];

export default function ExtensionsPane() {
    const [extensions, setExtensions] = useState(MOCK_EXTENSIONS);
    const [query, setQuery] = useState('');

    const handleInstall = (id: string) => {
        setExtensions(prev => prev.map(ext => {
            if (ext.id === id) {
                return { ...ext, installed: true };
            }
            return ext;
        }));
    };

    const filtered = extensions.filter(ext => ext.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="flex flex-col h-full text-[#cccccc]">
            <div className="p-4 flex justify-between items-center text-xs font-bold uppercase">
                <span>Extensions</span>
                <MoreHorizontal size={16} className="cursor-pointer hover:text-white" />
            </div>

            {/* Search */}
            <div className="px-4 pb-2 border-b border-[#252526]">
                <div className="bg-[#3c3c3c] flex items-center p-1 border border-[#3c3c3c] focus-within:border-blue-500 mb-2">
                    <input
                        type="text"
                        placeholder="Search Extensions in Marketplace"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent border-none text-xs text-white focus:outline-none w-full placeholder-gray-400"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-2">
                {filtered.map(ext => (
                    <div key={ext.id} className="flex gap-3 p-2 hover:bg-[#2a2d2e] cursor-pointer group mb-1">
                        {/* Icon Mock */}
                        <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-xs font-bold text-gray-400">
                            {ext.name.substring(0, 2).toUpperCase()}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-sm truncate pr-2">{ext.name}</span>
                            </div>
                            <div className="text-xs text-gray-500 truncate">{ext.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-gray-500">{ext.author}</span>
                                <span className="text-[10px] text-gray-600 px-1 py-0.5 bg-gray-800 rounded">{ext.downloads}</span>
                            </div>

                            <div className="mt-2 flex gap-2">
                                {ext.installed ? (
                                    <button className="text-xs bg-[#2d2d2d] text-gray-400 px-2 py-0.5 rounded cursor-default border border-transparent">Installed</button>
                                ) : (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleInstall(ext.id); }}
                                        className="text-xs bg-[#0e639c] text-white px-2 py-0.5 rounded hover:bg-[#1177bb]"
                                    >
                                        Install
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
