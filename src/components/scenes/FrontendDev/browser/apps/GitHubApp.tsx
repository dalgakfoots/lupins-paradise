import { useState, useEffect } from 'react';
import { GitPullRequest, Check, X, MessageSquare, FileCode, RotateCw } from 'lucide-react';

const MOCK_SCENARIOS = [
    {
        title: "feat: Implement new AuthProvider context",
        id: "28912",
        status: "open",
        author: "shadcn",
        checks: "passing",
        diff: `+ const AuthContext = createContext<AuthContextType | null>(null);
+
+ export function AuthProvider({children}: {children: React.ReactNode }) {
+   const [user, setUser] = useState<User | null>(null);
+   
+   useEffect(() => {
+     // Check local storage
+     const stored = localStorage.getItem('user');
+     if (stored) setUser(JSON.parse(stored));
+   }, []);
+
+   return (
+     <AuthContext.Provider value={{ user, setUser }}>
+       {children}
+     </AuthContext.Provider>
+   );
+ }`,
        comment: "LGTM! Just one small nit: maybe memoize the context value?"
    },
    {
        title: "fix: Resolve hydration mismatch in Sidebar",
        id: "28915",
        status: "merged",
        author: "dalgakfoots",
        checks: "passing",
        diff: `- <div className={window.innerWidth > 768 ? 'visible' : 'hidden'}>
+ <div className="hidden md:block">
    {/* Use CSS media queries instead of JS for initial render */}
    <SidebarContent />
</div>`,
        comment: "Great fix! This definitely solves the flickering issue on load. Merging now."
    },
    {
        title: "chore: Upgrade dependencies to latest",
        id: "28918",
        status: "open",
        author: "dependabot",
        checks: "failing",
        diff: `- "react": "^18.2.0",
- "react-dom": "^18.2.0",
+ "react": "^19.0.0-rc.1",
+ "react-dom": "^19.0.0-rc.1",`,
        comment: "Tests are failing. It seems like the new breaking changes in concurrent mode are affecting our test suite."
    },
    {
        title: "feat: WIP WIP WIP DO NOT MERGE",
        id: "28999",
        status: "open",
        author: "sleepy-dev",
        checks: "failing",
        diff: `+ console.log("here");
+ console.log("here 2");
+ console.log("please work");`,
        comment: "Just backing up my code before my laptop dies."
    },
    {
        title: "revert: Undo everything I did yesterday",
        id: "29001",
        status: "merged",
        author: "regretful-dev",
        checks: "passing",
        diff: `- const complexLogic = () => { ... }
+ // It was a bad idea.`,
        comment: "Let's pretend this never happened."
    }
];

export default function GitHubApp({ refreshKey }: { refreshKey: number }) {
    const [scenario, setScenario] = useState(MOCK_SCENARIOS[0]);
    const [activeTab, setActiveTab] = useState('files');

    useEffect(() => {
        const index = refreshKey % MOCK_SCENARIOS.length;
        setScenario(MOCK_SCENARIOS[index]);
    }, [refreshKey]);

    return (
        <div className="flex flex-col h-full bg-[#0d1117] text-[#c9d1d9] font-sans text-sm">
            {/* Header */}
            <div className="bg-[#161b22] px-6 py-4 border-b border-[#30363d]">
                <h1 className="text-xl font-normal text-white mb-2">
                    {scenario.title} <span className="text-[#8b949e]">#{scenario.id}</span>
                </h1>
                <div className="flex items-center gap-2 text-sm">
                    {scenario.status === 'open' && (
                        <span className="bg-[#238636] text-white px-3 py-1 rounded-full flex items-center gap-1">
                            <GitPullRequest size={14} /> Open
                        </span>
                    )}
                    {scenario.status === 'merged' && (
                        <span className="bg-[#8957e5] text-white px-3 py-1 rounded-full flex items-center gap-1">
                            <GitPullRequest size={14} /> Merged
                        </span>
                    )}
                    <span className="font-bold text-white">{scenario.author}</span>
                    <span className="text-[#8b949e]">wants to merge 1 commit into <span className="font-mono text-[#58a6ff] bg-[#58a6ff]/10 px-1 rounded">main</span></span>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-[#30363d] flex gap-6 mt-4">
                <div className={`pb-3 cursor-pointer flex items-center gap-2 border-b-2 ${activeTab === 'conversation' ? 'border-[#f78166] text-white' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`} onClick={() => setActiveTab('conversation')}>
                    <MessageSquare size={16} /> Conversation <span className="bg-[#30363d] px-1.5 rounded-full text-xs">1</span>
                </div>
                <div className={`pb-3 cursor-pointer flex items-center gap-2 border-b-2 ${activeTab === 'files' ? 'border-[#f78166] text-white' : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'}`} onClick={() => setActiveTab('files')}>
                    <FileCode size={16} /> Files changed <span className="bg-[#30363d] px-1.5 rounded-full text-xs">1</span>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-[#0d1117]">
                {/* Diff Viewer */}
                {activeTab === 'files' && (
                    <div className="border border-[#30363d] rounded-md overflow-hidden bg-[#0d1117]">
                        <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex justify-between items-center text-xs text-[#8b949e]">
                            <div className="font-mono">src/components/AuthProvider.tsx</div>
                            <div>Viewed</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse font-mono text-[12px] leading-5">
                                <tbody>
                                    {scenario.diff.split('\n').map((line, i) => (
                                        <tr key={i} className={line.startsWith('+') ? 'bg-[#2ea043]/15' : line.startsWith('-') ? 'bg-[#f85149]/15' : ''}>
                                            <td className="w-8 text-right pr-4 text-[#6e7681] select-none border-r border-[#30363d]">{i + 1}</td>
                                            <td className="pl-4 text-[#e6edf3] whitespace-pre">{line}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Conversation / Status Checks */}
                <div className="mt-6 border border-[#30363d] rounded-md bg-[#161b22] p-4">
                    <div className="flex items-center gap-4 mb-4">
                        {scenario.checks === 'passing' ? (
                            <div className="w-8 h-8 rounded-full bg-[#238636] flex items-center justify-center"><Check size={20} className="text-white" /></div>
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#da3633] flex items-center justify-center"><X size={20} className="text-white" /></div>
                        )}
                        <div>
                            <div className="font-bold text-white">{scenario.checks === 'passing' ? 'All checks passed' : 'Checks failed'}</div>
                            <div className="text-xs text-[#8b949e]">2 successful, 0 neutral checks</div>
                        </div>
                    </div>
                    {scenario.status === 'open' && scenario.checks === 'passing' && (
                        <button className="w-full bg-[#238636] hover:bg-[#2ea043] text-white font-bold py-2 rounded-md border border-[rgba(240,246,252,0.1)] transition-colors">
                            Merge pull request
                        </button>
                    )}
                    {scenario.status === 'open' && scenario.checks === 'failing' && (
                        <button className="w-full bg-[#30363d] text-[#8b949e] font-bold py-2 rounded-md border border-[rgba(240,246,252,0.1)] cursor-not-allowed opacity-50">
                            Mergers blocked
                        </button>
                    )}
                    {scenario.status === 'merged' && (
                        <div className="p-3 bg-[#6e40c9]/20 text-[#a371f7] rounded border border-[#6e40c9]/40 text-center font-bold">
                            Pull request successfully merged and closed
                        </div>
                    )}
                </div>

                {/* Mock Comment */}
                <div className="mt-8 flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">TL</div>
                    <div className="flex-1 border border-[#30363d] rounded-md bg-[#161b22]">
                        <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex justify-between items-center">
                            <span className="font-bold text-white text-xs">TeamLead <span className="font-normal text-[#8b949e]">commented yesterday</span></span>
                            <div className="flex gap-1">
                                <span className="px-2 py-0.5 rounded-full border border-[#30363d] text-xs">Owner</span>
                            </div>
                        </div>
                        <div className="p-4 text-[#e6edf3]">
                            {scenario.comment}
                        </div>
                    </div>
                </div>
            </div>

            {/* Fake Status Bar */}
            <div className="bg-[#161b22] px-4 py-2 border-t border-[#30363d] flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-[#238636]">
                    <Check size={14} /> <span>All checks passed</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                    <RotateCw size={12} /> <span>1 review pending</span>
                </div>
            </div>
        </div>
    );
}
