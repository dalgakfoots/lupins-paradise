import { useState } from 'react';
import { MoreHorizontal, Plus, CheckCircle2, Clock, AlertCircle, X, ChevronDown } from 'lucide-react';

export default function JiraApp({ refreshKey }: { refreshKey: number }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col h-full bg-[#f4f5f7] font-sans text-sm text-[#172b4d] relative">
            {/* Jira Header */}
            <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="font-semibold text-gray-600">Frontend Squad Bored</div>
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs font-bold">SPRINT-Zzz</span>
                </div>
                <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">U{i}</div>
                    ))}
                    <div className="cursor-pointer hover:bg-gray-700 w-8 h-8 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center text-white text-xs font-bold" onClick={() => setIsModalOpen(true)}>+</div>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto p-4 flex gap-4 items-start">
                <Column title="To Do" count={99} onCreate={() => setIsModalOpen(true)}>
                    <Card id="FE-1029" title="Make the logo bigger (client request)" type="bug" priority="critical" />
                    <Card id="FE-1033" title="Refactor entire codebase to COBOL" type="task" priority="low" />
                    <Card id="FE-1044" title="Fix bug that only happens on Tuesdays" type="bug" priority="high" />
                    <Card id="FE-1055" title="Replace all buttons with 'Maybe' options" type="story" priority="medium" />
                    <Card id="FE-1066" title="Add 'Darker Mode' (Black screen)" type="story" priority="low" />
                </Column>
                <Column title="In Progress" count={2} onCreate={() => setIsModalOpen(true)}>
                    <Card id="FE-1021" title="Centering div (Day 4)" type="story" priority="medium" assignee="ME" />
                    <Card id="FE-1004" title="Pretending to work on optimization" type="bug" priority="medium" />
                    <Card id="FE-1001" title="Google searching 'How to quit job'" type="chore" priority="highest" />
                </Column>
                <Column title="Code Review" count={4} onCreate={() => setIsModalOpen(true)}>
                    <Card id="FE-998" title="Delete tests to pass CI/CD" type="task" priority="critical" />
                    <Card id="FE-992" title="Add 5000 lines of spaghetti code" type="story" priority="high" />
                    <Card id="FE-988" title="Change button color (again)" type="story" priority="medium" />
                    <Card id="FE-985" title="Update dependencies that break everything" type="chore" priority="low" />
                </Column>
                <Column title="Done" count={12} onCreate={() => setIsModalOpen(true)}>
                    <Card id="FE-950" title="Drank coffee" type="chore" priority="high" />
                </Column>
            </div>

            {/* Create Issue Modal */}
            {isModalOpen && (
                <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div className="bg-white w-[600px] h-[500px] rounded-lg shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl font-medium text-gray-900">Create issue</h2>
                            <div className="p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => setIsModalOpen(false)}>
                                <X size={20} className="text-gray-500" />
                            </div>
                        </div>
                        <div className="p-6 flex-1 space-y-6 overflow-y-auto">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Project</label>
                                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-300">
                                    <div className="w-4 h-4 bg-blue-500 rounded" />
                                    <span>Frontend (FE)</span>
                                    <ChevronDown size={14} className="ml-auto text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Issue Type</label>
                                <div className="flex items-center gap-2 p-2 bg-gray-100 rounded border border-gray-300">
                                    <CheckCircle2 size={14} className="text-green-500" />
                                    <span>Story</span>
                                    <ChevronDown size={14} className="ml-auto text-gray-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Summary</label>
                                <input className="w-full p-2 border border-gray-300 rounded focus:ring-2 ring-blue-500 outline-none" placeholder="What needs to be done?" autoFocus />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                                <textarea className="w-full p-2 border border-gray-300 rounded h-32 resize-none focus:ring-2 ring-blue-500 outline-none" placeholder="Describe the issue..." />
                            </div>
                        </div>
                        <div className="p-4 border-t flex justify-end gap-2 bg-gray-50 rounded-b-lg">
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 hover:bg-gray-200 rounded font-medium text-gray-700">Cancel</button>
                            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium">Create</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Column({ title, count, children, onCreate }: { title: string, count: number, children: React.ReactNode, onCreate: () => void }) {
    return (
        <div className="w-[280px] shrink-0 bg-[#ebecf0] rounded-md flex flex-col max-h-full">
            <div className="p-3 pr-2 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wide">
                <div>{title} <span className="ml-1">{count}</span></div>
                <div className="hover:bg-gray-300 p-1 rounded"><MoreHorizontal size={14} /></div>
            </div>
            <div className="p-2 pt-0 flex flex-col gap-2 overflow-y-auto min-h-[100px]">
                {children}
            </div>
            <div className="p-2 hover:bg-gray-200 m-1 rounded flex items-center gap-1 text-gray-600 cursor-pointer" onClick={onCreate}>
                <Plus size={14} /> <span className="text-sm font-medium">Create issue</span>
            </div>
        </div>
    );
}

function Card({ id, title, type, priority, assignee }: { id: string, title: string, type: 'bug' | 'story' | 'task' | 'chore', priority: string, assignee?: string }) {
    const typeIcons = {
        bug: <AlertCircle size={14} className="text-red-500 fill-red-100" />,
        story: <CheckCircle2 size={14} className="text-green-500 fill-green-100" />,
        task: <CheckCircle2 size={14} className="text-blue-500 fill-blue-100" />,
        chore: <Clock size={14} className="text-gray-500" />
    }

    const priorityColors: Record<string, string> = {
        critical: 'text-red-600 bg-red-100',
        high: 'text-orange-600 bg-orange-100',
        medium: 'text-yellow-600 bg-yellow-100',
        low: 'text-blue-600 bg-blue-100'
    }

    return (
        <div className="bg-white p-3 rounded shadow-sm border border-gray-200 hover:bg-gray-50 cursor-pointer group">
            <div className="mb-2 text-sm text-[#172b4d] font-normal leading-tight group-hover:text-blue-600 transition-colors">
                {title}
            </div>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                    {typeIcons[type]}
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${priorityColors[priority]}`}>
                        {priority === 'critical' ? '⚡' : ''} {priority}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                    <span>{id}</span>
                    {assignee && (
                        <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[9px] border border-white">
                            {assignee}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
