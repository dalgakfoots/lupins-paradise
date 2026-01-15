'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import MonacoWrapper from './MonacoWrapper';
import FakeBrowser from './FakeBrowser';
import ActivityBar from './layout/ActivityBar';
import Sidebar from './layout/Sidebar';
import StatusBar from './layout/StatusBar';
import TabBar from './layout/TabBar';
import { useGhostTyper } from '@/hooks/useGhostTyper';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { CODE_SNIPPETS, MOCK_SO_QUESTIONS } from '@/lib/simulation/content';
import { REACT_PROJECT_structure } from '@/lib/simulation/fileSystems';
import { addRandomFile, deleteRandomFile, renameRandomFile } from '@/lib/simulation/fileUtils';
import { generateFileContent } from '@/lib/simulation/fileContent';
import { INFINITE_SNIPPETS } from '@/lib/simulation/codeSnippets';
import TerminalPanel from './layout/TerminalPanel';

export default function FrontendDevScene() {
    // Layout State
    const [activeView, setActiveView] = useState('explorer');
    const [projectStructure, setProjectStructure] = useState(REACT_PROJECT_structure);

    // Tab State
    const [openFiles, setOpenFiles] = useState<string[]>(['App.tsx']);
    const [activeFile, setActiveFile] = useState<string | null>('App.tsx');

    // Hacker Typer State
    const [fullContent, setFullContent] = useState('');
    const [revealedIndex, setRevealedIndex] = useState(0);

    // Sidebar Resize State
    const [sidebarWidth, setSidebarWidth] = useState(240);
    const [isResizing, setIsResizing] = useState(false);

    // Terminal Resize State
    const [terminalHeight, setTerminalHeight] = useState(192); // Default to h-48 approx
    const [isResizingTerminal, setIsResizingTerminal] = useState(false);

    // Browser Resize State
    const [browserWidth, setBrowserWidth] = useState(400);
    const [isResizingBrowser, setIsResizingBrowser] = useState(false);

    // Initialize initial file
    useEffect(() => {
        const initial = generateFileContent('App.tsx');
        setFullContent(initial);
        setRevealedIndex(initial.length);
    }, []);

    // Resize Handlers (Sidebar)
    const startResizing = useCallback(() => setIsResizing(true), []);
    const stopResizing = useCallback(() => setIsResizing(false), []);
    const resize = useCallback((e: MouseEvent) => {
        if (isResizing) {
            // Constrain width
            const newWidth = Math.max(170, Math.min(e.clientX - 48, 600)); // 48 is ActivityBar width roughly
            setSidebarWidth(newWidth);
        }
        if (isResizingTerminal) {
            // Constrain height (drag UP increases height, so calculate from bottom?)
            // Actually, simply: Window Height - Mouse Y - Status Bar Height (approx 22px)
            const newHeight = window.innerHeight - e.clientY - 22;
            const constrained = Math.max(100, Math.min(newHeight, window.innerHeight - 100)); // Min 100px, Max full-ish
            setTerminalHeight(constrained);
        }
        if (isResizingBrowser) {
            // Constrain browser width (drag LEFT increases width)
            const newWidth = window.innerWidth - e.clientX;
            const constrained = Math.max(200, Math.min(newWidth, window.innerWidth - 400)); // Min 200px
            setBrowserWidth(constrained);
        }
    }, [isResizing, isResizingTerminal, isResizingBrowser]);

    // Terminal Resize Handlers
    const startResizingTerminal = useCallback(() => setIsResizingTerminal(true), []);
    const stopResizingTerminal = useCallback(() => setIsResizingTerminal(false), []);

    // Browser Resize Handlers
    const startResizingBrowser = useCallback(() => setIsResizingBrowser(true), []);
    const stopResizingBrowser = useCallback(() => setIsResizingBrowser(false), []);


    useEffect(() => {
        if (isResizing || isResizingTerminal || isResizingBrowser) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
            window.addEventListener('mouseup', stopResizingTerminal);
            window.addEventListener('mouseup', stopResizingBrowser);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
            window.removeEventListener('mouseup', stopResizingTerminal);
            window.removeEventListener('mouseup', stopResizingBrowser);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
            window.removeEventListener('mouseup', stopResizingTerminal);
            window.removeEventListener('mouseup', stopResizingBrowser);
        };
    }, [isResizing, isResizingTerminal, isResizingBrowser, resize, stopResizing, stopResizingTerminal, stopResizingBrowser]);


    // When active file changes, load its new full content
    useEffect(() => {
        if (activeFile) {
            const content = generateFileContent(activeFile);
            setFullContent(content);
            setRevealedIndex(content.length);
        } else {
            setFullContent('');
            setRevealedIndex(0);
        }
    }, [activeFile]);


    const handleAddFile = () => setProjectStructure(prev => addRandomFile(prev));
    const handleDeleteFile = () => setProjectStructure(prev => deleteRandomFile(prev));
    const handleRenameFile = () => setProjectStructure(prev => renameRandomFile(prev));

    const handleType = () => {
        // Random typing speed
        const speed = Math.floor(Math.random() * 5) + 2;

        if (revealedIndex < fullContent.length) {
            // Normal filling
            setRevealedIndex(prev => Math.min(prev + speed, fullContent.length));
        } else {
            // Infinite mode: Only for .ts and .tsx files
            if (activeFile && (activeFile.endsWith('.ts') || activeFile.endsWith('.tsx'))) {
                const nextSnippet = INFINITE_SNIPPETS[Math.floor(Math.random() * INFINITE_SNIPPETS.length)];

                // Add a newline before snippet
                const contentToAdd = '\n' + nextSnippet;

                // Update content
                setFullContent(prev => prev + contentToAdd);
                // Immediately reveal
                setRevealedIndex(prev => prev + speed);
            }
            // If not TS/TSX, do nothing (stop typing)
        }
    };

    const handleOpenFile = (fileName: string) => {
        if (!openFiles.includes(fileName)) {
            setOpenFiles([...openFiles, fileName]);
        }
        setActiveFile(fileName);
    };

    const handleCloseFile = (fileName: string) => {
        const newFiles = openFiles.filter(f => f !== fileName);
        setOpenFiles(newFiles);
        if (activeFile === fileName) {
            setActiveFile(newFiles.length > 0 ? newFiles[newFiles.length - 1] : null);
        }
    };

    const handleCloseAll = () => {
        setOpenFiles([]);
        setActiveFile(null);
    };

    useKeyboardShortcuts({
        'Explorer': { combo: { key: 'e', ctrl: true, shift: true }, action: () => setActiveView('explorer') },
        'Search': { combo: { key: 'f', ctrl: true, shift: true }, action: () => setActiveView('search') },
        'Source Control': { combo: { key: 'g', ctrl: true, shift: true }, action: () => setActiveView('scm') },
        'Debug': { combo: { key: 'd', ctrl: true, shift: true }, action: () => setActiveView('debug') },
        'New File': { combo: { key: 'n', ctrl: true, alt: true }, action: handleAddFile },
        'Refactor': { combo: { key: 'r', ctrl: true, alt: true }, action: handleRenameFile },
        'Delete': { combo: { key: 'd', ctrl: true, alt: true }, action: handleDeleteFile },
    });

    const displayedCode = fullContent.slice(0, revealedIndex);

    return (
        <div className="flex flex-col h-screen w-full bg-[#1e1e1e] overflow-hidden">
            <div className="flex flex-1 overflow-hidden" onMouseUp={() => { stopResizing(); stopResizingTerminal(); stopResizingBrowser(); }}>
                {/* Activity Bar */}
                <ActivityBar activeView={activeView} onViewChange={setActiveView} />

                {/* Sidebar */}
                <div style={{ width: sidebarWidth, flexShrink: 0 }} className="flex">
                    <Sidebar
                        projectStructure={projectStructure}
                        activeView={activeView}
                        onAddFile={handleAddFile}
                        onDeleteFile={handleDeleteFile}
                        onRenameFile={handleRenameFile}
                        onOpenFile={handleOpenFile}
                    />
                </div>

                {/* Sidebar Resize Handle */}
                <div
                    className="w-[4px] cursor-col-resize hover:bg-blue-500 bg-[#333] transition-colors z-10"
                    onMouseDown={startResizing}
                />

                {/* Main Editor Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
                    <div className="flex-1 flex overflow-hidden flex-col">
                        {/* Editor Column */}
                        <div className="flex-1 relative min-w-0 flex flex-col min-h-0">
                            <TabBar
                                openFiles={openFiles}
                                activeFile={activeFile}
                                onTabClick={handleOpenFile}
                                onCloseTab={handleCloseFile}
                                onCloseAll={handleCloseAll}
                            />
                            {activeFile ? (
                                <MonacoWrapper
                                    code={displayedCode}
                                    onType={handleType}
                                />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-600">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4 opacity-20">Lupin</div>
                                        <div>Select a file or create new one</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terminal Resize Handle */}
                        <div
                            className="h-[4px] cursor-row-resize hover:bg-blue-500 bg-[#333] transition-colors z-10 w-full"
                            onMouseDown={startResizingTerminal}
                        />

                        {/* Integrated Terminal (Resizable) */}
                        <div style={{ height: terminalHeight, flexShrink: 0 }}>
                            <TerminalPanel />
                        </div>
                    </div>
                </div>

                {/* Browser Resize Handle */}
                <div
                    className="w-[4px] cursor-col-resize hover:bg-blue-500 bg-[#333] transition-colors z-10"
                    onMouseDown={startResizingBrowser}
                />

                {/* Split Pane: Browser / Docs (Right Side) - Now properly separated */}
                <div style={{ width: browserWidth, flexShrink: 0 }} className="flex flex-col bg-white">
                    <FakeBrowser url="https://stackoverflow.com/questions/how-to-exit-vim">
                        <StackOverflowContent />
                    </FakeBrowser>
                </div>
            </div>

            {/* Status Bar */}
            <StatusBar />
        </div>
    );
}

function StackOverflowContent() {
    return (
        <div className="p-4 h-full overflow-y-auto">
            <h1 className="text-xl text-blue-600 mb-2 hover:underline cursor-pointer">
                {MOCK_SO_QUESTIONS[0].title}
            </h1>
            <div className="flex gap-4 text-xs text-gray-500 mb-4 border-b pb-2">
                <span>Asked 3 years ago</span>
                <span>Viewed 12M times</span>
            </div>

            <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <div className="text-xl">▲</div>
                    <div className="font-bold text-lg">{MOCK_SO_QUESTIONS[0].votes}</div>
                    <div className="text-xl">▼</div>
                </div>
                <div className="flex-1">
                    <p className="mb-4 text-gray-800">I accidentally entered Vim and now I can't leave. I've been here for days. Send help.</p>

                    <div className="bg-gray-200 p-2 rounded text-sm font-mono mb-4 text-black">
                        :q!<br />
                        :wq
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold mb-4 text-black">{MOCK_SO_QUESTIONS[0].answers.length} Answer</h2>
                {MOCK_SO_QUESTIONS[0].answers.map((ans, i) => (
                    <div key={i} className="border-t py-4 text-gray-800">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <div className="text-xl">▲</div>
                                <div className="font-bold text-lg">{ans.score}</div>
                                <div className="text-xl">▼</div>
                                <div className="text-green-500 text-2xl">✓</div>
                            </div>
                            <div>
                                <p className="whitespace-pre-line text-sm">{ans.content}</p>
                                <div className="mt-2 text-xs text-blue-500">{ans.author}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 border-2 border-dashed border-gray-300 p-4 bg-gray-50 rounded text-center text-gray-400 text-sm">
                [AdSense Banner: "Best Cloud Hosting for Vim Users"]
            </div>
        </div>
    );
}
