import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Plus, Trash2, Maximize2, X, AlertTriangle, Info, Bug } from 'lucide-react';

type TabType = 'PROBLEMS' | 'OUTPUT' | 'DEBUG CONSOLE' | 'TERMINAL' | 'GITLENS';

export default function TerminalPanel() {
    const [activeTab, setActiveTab] = useState<TabType>('TERMINAL');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Terminal Logs (Persistent)
    const [terminalLogs, setTerminalLogs] = useState<string[]>([
        'Microsoft Windows [Version 10.0.19045.4291]',
        '(c) Microsoft Corporation. All rights reserved.',
        '',
        'D:\\projects\\lupins-paradise> npm run dev',
        '',
        '> lupins-paradise@0.1.0 dev',
        '> vite',
        '',
        '  VITE v4.4.9  ready in 430 ms',
        '',
        '  ➜  Local:   http://localhost:5173/',
    ]);

    // Output Logs (Ext simulation)
    const [outputLogs, setOutputLogs] = useState<string[]>([
        '[Info  - 10:23:01] Initializing generic language features...',
        '[Info  - 10:23:02] Reading .eslintrc configuration',
        '[Info  - 10:23:02] ESLint server running in node v16.14.0',
    ]);

    // Debug Logs
    const [debugLogs, setDebugLogs] = useState<string[]>([
        'Debugger attached.',
        'Waiting for inspector to disconnect...',
    ]);

    // Problems Data (Static for now)
    const problems = [
        { file: 'src/App.tsx', line: 14, message: "'useState' is defined but never used.", code: '6133', type: 'warning' },
        { file: 'src/components/Sidebar.tsx', line: 42, message: "Missing return type on function.", code: '7050', type: 'info' },
    ];

    // Simulated Log Stream for TERMINAL
    useEffect(() => {
        const possibleLogs = [
            '[webpack] Compiling...',
            '[webpack] Compiled successfully in 120ms',
            '[eslint] No issues found.',
            'Files successfully emitted',
            '[HMR] Waiting for update signal...',
            '[HMR] App is up to date.',
            'Type-checking in progress...',
        ];

        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const randomLog = possibleLogs[Math.floor(Math.random() * possibleLogs.length)];
                const timestamp = new Date().toLocaleTimeString();
                setTerminalLogs(prev => [...prev.slice(-50), `[${timestamp}] ${randomLog}`]);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Simulated Log Stream for OUTPUT
    useEffect(() => {
        const extLogs = [
            '[Info] Prettier: Code formatted.',
            '[Info] GitLens: Repository state updated.',
            '[Info] Python: Analyzed 2 files.',
            '[Info] TS Server: Request completed in 12ms.',
        ];
        const interval = setInterval(() => {
            if (Math.random() > 0.8) {
                const randomLog = extLogs[Math.floor(Math.random() * extLogs.length)];
                const timestamp = new Date().toLocaleTimeString();
                setOutputLogs(prev => [...prev.slice(-30), `[Info - ${timestamp}] ${randomLog.replace('[Info] ', '')}`]);
            }
        }, 3500);
        return () => clearInterval(interval);
    }, []);


    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [terminalLogs, outputLogs, debugLogs, activeTab]);

    const renderContent = () => {
        switch (activeTab) {
            case 'PROBLEMS':
                return (
                    <div className="flex flex-col gap-1">
                        {problems.map((p, i) => (
                            <div key={i} className="flex items-start hover:bg-[#2a2d2e] cursor-pointer p-0.5">
                                <AlertTriangle size={14} className="text-yellow-500 mt-0.5 mr-2 shrink-0" />
                                <div className="truncate">
                                    <span className="text-[#cccccc]">{p.message} </span>
                                    <span className="text-gray-500 ml-2">{p.file} [{p.line}, 1]</span>
                                </div>
                            </div>
                        ))}
                        {problems.length === 0 && <div className="text-gray-500 italic">No problems have been detected in the workspace.</div>}
                    </div>
                );
            case 'OUTPUT':
                return outputLogs.map((log, i) => <div key={i} className="whitespace-pre-wrap">{log}</div>);
            case 'DEBUG CONSOLE':
                return (
                    <>
                        {debugLogs.map((log, i) => <div key={i} className="whitespace-pre-wrap text-[#cccccc]">{log}</div>)}
                        <div className="flex items-center mt-1 text-blue-400">
                            <span className="mr-2">{'>'}</span>
                            <input type="text" className="bg-transparent border-none outline-none text-white w-full h-5" placeholder="Evaluate..." />
                        </div>
                    </>
                );
            case 'TERMINAL':
            default:
                return (
                    <>
                        {terminalLogs.map((log, i) => <div key={i} className="whitespace-pre-wrap">{log}</div>)}
                        <div className="flex items-center mt-1">
                            <span className="text-[#87d7f2]">D:\projects\lupins-paradise&gt;</span>
                            <span className="ml-2 w-2 h-4 bg-gray-400 animate-pulse"></span>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="h-full border-t border-[#3e3e3e] bg-[#1e1e1e] flex flex-col font-mono text-sm leading-relaxed shrink-0">
            {/* Header / Tabs */}
            <div className="flex justify-between items-center px-4 py-1 border-b border-[#252526] select-none bg-[#1e1e1e]">
                <div className="flex gap-6 text-[11px] font-bold text-gray-400">
                    {['PROBLEMS', 'OUTPUT', 'DEBUG CONSOLE', 'TERMINAL', 'GITLENS'].map(tab => (
                        <span
                            key={tab}
                            onClick={() => setActiveTab(tab as TabType)}
                            className={`cursor-pointer py-1 border-b-2 ${activeTab === tab ? 'text-white border-white' : 'border-transparent hover:text-white'}`}
                        >
                            {tab} {tab === 'PROBLEMS' && <span className="ml-1 bg-gray-700 text-white rounded-full px-1.5 text-[9px]">{problems.length}</span>}
                        </span>
                    ))}
                </div>
                <div className="flex gap-3 text-gray-400">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white text-xs">
                        <Plus size={14} />
                        <ChevronDown size={12} />
                    </div>
                    <Trash2 size={14} className="cursor-pointer hover:text-white" onClick={() => {
                        if (activeTab === 'TERMINAL') setTerminalLogs([]);
                        if (activeTab === 'OUTPUT') setOutputLogs([]);
                        if (activeTab === 'DEBUG CONSOLE') setDebugLogs([]);
                    }} />
                    <Maximize2 size={14} className="cursor-pointer hover:text-white" />
                    <X size={14} className="cursor-pointer hover:text-white" />
                </div>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 overflow-y-auto p-2 pl-4 custom-scrollbar text-[#cccccc]" ref={scrollRef}>
                {renderContent()}
            </div>
        </div>
    );
}
