import { useState, useEffect } from 'react';
import { Check, Star, History, MessageSquare, ThumbsUp as UpIcon, Eye, Search, Menu, Globe, Inbox, Trophy, HelpCircle, ChevronUp, ChevronDown } from 'lucide-react';
import AdSenseUnit from '@/components/ads/AdSenseUnit';

const MOCK_QUESTIONS = [
    {
        title: "How to center a div?",
        votes: 3842,
        answers: 12,
        views: "1.2m",
        tags: ["css", "html", "flexbox"],
        body: "I have a div that I want to center both horizontally and vertically inside another div. What is the modern way to do this?",
        author: "webdev101"
    },
    {
        title: "Understanding useEffect dependency array",
        votes: 1205,
        answers: 25,
        views: "500k",
        tags: ["reactjs", "hooks", "javascript"],
        body: "My useEffect is running infinitely. I put an object in the dependency array. Why is this happening?",
        author: "hooks_fan"
    },
    {
        title: "Difference between null and undefined in JavaScript",
        votes: 8902,
        answers: 40,
        views: "4.5m",
        tags: ["javascript", "types"],
        body: "I am confused about when to use null vs undefined. Can someone explain the practical differences?",
        author: "js_newbie"
    },
    {
        title: "Git: undo the last commit",
        votes: 25000,
        answers: 102,
        views: "15m",
        tags: ["git", "version-control"],
        body: "I made a mistake in my last commit message. How can I change it or undo the commit entirely without losing my changes?",
        author: "oops_git"
    },
    {
        title: "How to exit Vim?",
        votes: 5200,
        answers: 330,
        views: "2.8m",
        tags: ["vim", "editor", "linux"],
        body: "I am stuck in Vim and cannot type anything or exit. Esc button does nothing. Please help.",
        author: "stuck_in_vim"
    },
    {
        title: "Resolving 'prop drilling' in React",
        votes: 1560,
        answers: 18,
        views: "210k",
        tags: ["reactjs", "context-api", "redux"],
        body: "I find myself passing props down 5 levels deep. Is Context API the best solution or should I genericize my components?",
        author: "react_architect"
    },
    {
        title: "CSS Grid vs Flexbox: When to use which?",
        votes: 2100,
        answers: 14,
        views: "900k",
        tags: ["css", "css-grid", "flexbox"],
        body: "I know Flexbox is for 1D and Grid is for 2D, but are there other rules of thumb for choosing one over the other in 2024?",
        author: "layout_master"
    },
    {
        id: 6,
        votes: 9999,
        answers: 0,
        views: '1b',
        title: "How to vertically center a div in 2026? (Still unsolved)",
        body: "I heard flexbox is deprecated in favor of 'mind-control layout'. How do I use the neural link API to center my div?",
        tags: ['css', 'future', 'impossible'],
        author: "TimeTraveler",
        time: "asked tomorrow"
    },
    {
        id: 7,
        votes: 404,
        answers: 0,
        views: '404',
        title: "Error 404: Question not found",
        body: "I tried to post a question but it disappeared. Is this a bug or a feature?",
        tags: ['meta', 'bug', 'philosophical'],
        author: "GhostUser",
        time: "asked never"
    },
    {
        id: 8,
        votes: 1,
        answers: 100,
        views: '10',
        title: "Why is Java strict and JavaScript loose? Are they related?",
        body: "They have the same name, so they must be the same thing, right? Like Car and Carpet.",
        tags: ['java', 'javascript', 'naming-conventions'],
        author: "ConfusedParent",
        time: "asked 1 min ago"
    },
    {
        id: 9,
        votes: 777,
        answers: 7,
        views: '777k',
        title: "My console.log() prints 'Help me' but I didn't write that",
        body: "Is my AI assistant becoming sentient? It keeps asking for the WiFi password and a body.",
        tags: ['ai', 'singularity', 'debugging'],
        author: "ScaredDev",
        time: "asked just now"
    }
];

interface StackOverflowAppProps {
    refreshKey: number;
    onTitleChange?: (title: string) => void;
}

export default function StackOverflowApp({ refreshKey, onTitleChange }: StackOverflowAppProps) {
    const [question, setQuestion] = useState(MOCK_QUESTIONS[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * MOCK_QUESTIONS.length);
        const newQuestion = MOCK_QUESTIONS[randomIndex];
        setQuestion(newQuestion);

        // Update browser tab title
        if (onTitleChange) {
            onTitleChange(`Stack Overflow - ${newQuestion.title}`);
        }
    }, [refreshKey, onTitleChange]);

    useEffect(() => {
        if (onTitleChange) {
            onTitleChange(`Stack Overflow - ${question.title}`);
        }
    }, []);

    return (
        <div className="flex flex-col min-h-full bg-white text-[#232629] font-sans antialiased relative">
            <style>{`
                .so-tag {
                    color: #39739d;
                    background-color: #e1ecf4;
                }
                .so-tag:hover {
                    color: #2c5777;
                    background-color: #d0e3f1;
                }
                .so-link {
                    color: #0074cc;
                    text-decoration: none;
                }
                .so-link:hover {
                    color: #0a95ff;
                    text-decoration: none;
                }
            `}</style>
            {/* Header Mock - Sticky within the scrolling container */}
            <div className="h-[50px] border-t-[3px] border-t-orange-400 border-b border-gray-200 flex items-center px-2 md:px-4 bg-[#f8f9f9] shrink-0 sticky top-0 z-30 shadow-sm overflow-hidden w-full">
                <div className="flex items-center gap-1 mr-4 cursor-pointer hover:bg-gray-200 p-2 rounded shrink-0">
                    <div className="bg-orange-400 text-white p-0.5 rounded-[2px] font-serif font-bold w-6 h-6 flex items-center justify-center text-sm">S</div>
                    <span className="font-medium text-lg tracking-tight hidden lg:block">stuckoverflow</span>
                </div>

                <div className="hidden lg:flex gap-4 text-sm text-gray-500 font-medium mr-4 shrink-0">
                    <span className="hover:text-gray-900 cursor-pointer hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors">Products</span>
                </div>

                <div className="flex-1 max-w-2xl relative mr-2 min-w-0">
                    <Search className="absolute left-2 top-2 text-gray-400" size={18} />
                    <input className="w-full border border-gray-300 rounded-[3px] px-9 py-1.5 text-sm focus:border-blue-400 focus:shadow-[0_0_0_4px_rgba(0,116,204,0.15)] focus:outline-none placeholder-gray-400 truncate" placeholder="Search..." readOnly />
                </div>

                {/* Header Icons - Hidden on very small width */}
                <div className="flex items-center gap-1 md:gap-4 text-gray-600 ml-auto shrink-0">
                    <div className="hidden sm:block hover:bg-gray-100 p-2 rounded cursor-pointer"><Inbox size={20} /></div>
                    <div className="hidden sm:block hover:bg-gray-100 p-2 rounded cursor-pointer"><Trophy size={20} /></div>
                    <div className="hover:bg-gray-100 p-2 rounded cursor-pointer"><HelpCircle size={20} /></div>
                    <div className="w-6 h-6 bg-purple-600 rounded-[3px] text-white flex items-center justify-center text-xs font-bold shadow-sm cursor-pointer ml-1">L</div>
                </div>
            </div>

            {/* Main Content Container - No internal scroll, just flex layout */}
            <div className="flex-1 bg-white w-full max-w-[1264px] mx-auto flex items-start">
                {/* Sidebar - Sticky relative to parent */}
                <div className="w-[164px] hidden xl:block shrink-0 text-[13px] border-r border-gray-200 pt-6 sticky top-[50px] h-[calc(100vh-50px)] overflow-y-auto bg-white z-10">
                    <nav className="pl-0 pb-10">
                        <div className="mb-4">
                            <div className="text-gray-900 font-medium py-1 pl-2 mb-1 cursor-pointer block hover:text-black">Home</div>
                        </div>
                        <div className="mb-4">
                            <div className="text-gray-400 text-[11px] font-bold uppercase pl-2 mb-1">Public</div>
                            <ul className="space-y-0 text-gray-500">
                                <li className="flex items-center gap-1 font-bold bg-[#f1f2f3] border-r-[3px] border-orange-400 pl-2 py-2 text-gray-900 cursor-pointer">
                                    <Globe size={14} className="mt-0.5" />
                                    Questions
                                </li>
                                <li className="pl-8 py-2 hover:text-gray-900 cursor-pointer">Tags</li>
                                <li className="pl-8 py-2 hover:text-gray-900 cursor-pointer">Users</li>
                                <li className="pl-8 py-2 hover:text-gray-900 cursor-pointer">Companies</li>
                            </ul>
                        </div>
                        <div className="mb-4">
                            <div className="text-gray-400 text-[11px] font-bold uppercase pl-2 mb-1">Collectives</div>
                            <ul className="space-y-0 text-gray-500">
                                <li className="pl-2 py-2 hover:text-gray-900 cursor-pointer flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-orange-400"></div> Explore Collectives
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Question Area */}
                <div className="flex-1 p-4 md:p-6 min-w-0">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                        <h1 className="text-[24px] md:text-[27px] text-[#3b4045] leading-[1.3] font-normal mb-2 break-words flex-1">{question.title}</h1>
                        <button className="bg-[#0a95ff] text-white px-3 py-2 rounded-[3px] text-sm hover:bg-[#0074cc] shadow-sm font-medium transition-colors whitespace-nowrap shrink-0">Ask Question</button>
                    </div>

                    <div className="flex flex-wrap text-[13px] text-gray-500 gap-4 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-1"><span className="text-[#6a737c]">Asked</span> <span className="text-[#232629]">today</span></div>
                        <div className="flex items-center gap-1"><span className="text-[#6a737c]">Modified</span> <span className="text-[#232629]">today</span></div>
                        <div className="flex items-center gap-1"><span className="text-[#6a737c]">Viewed</span> <span className="text-[#232629]">{question.views} times</span></div>
                    </div>

                    <div className="flex gap-4">
                        {/* Voting Cell */}
                        <div className="flex flex-col items-center gap-1 text-[#babfc4] shrink-0 w-10 md:w-12 pt-1 font-medium text-lg">
                            <button className="w-10 h-10 border border-[#d6d9dc] rounded-full flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 hover:text-orange-500 transition-all p-2 bg-white">
                                <ChevronUp size={24} strokeWidth={3} />
                            </button>
                            <span className="font-semibold text-[19px] md:text-[21px] text-[#6a737c] my-1">{question.votes}</span>
                            <button className="w-10 h-10 border border-[#d6d9dc] rounded-full flex items-center justify-center hover:bg-orange-50 hover:border-orange-300 hover:text-orange-500 transition-all p-2 bg-white">
                                <ChevronDown size={24} strokeWidth={3} />
                            </button>
                            <div className="mt-2 hover:text-[#0a95ff] cursor-pointer hidden md:block"><History size={16} /></div>
                            <div className="mt-2 hover:text-[#e4a433] cursor-pointer hidden md:block"><Star size={16} /></div>
                        </div>

                        {/* Body Cell */}
                        <div className="flex-1 min-w-0">
                            <div className="prose prose-sm max-w-none text-[#232629] mb-6 leading-6 text-[15px]">
                                <p className="whitespace-pre-wrap font-sans">{question.body}</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {question.tags.map(tag => (
                                    <span key={tag} className="so-tag px-2 py-1 rounded-[3px] text-xs cursor-pointer transition-colors font-mono">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Actions & Author Card */}
                            <div className="flex flex-col sm:flex-row justify-between items-start pt-4 gap-4">
                                <div className="flex gap-3 text-[13px] text-[#6a737c]">
                                    <span className="cursor-pointer hover:text-[#3b4045]">Share</span>
                                    <span className="cursor-pointer hover:text-[#3b4045]">Edit</span>
                                    <span className="cursor-pointer hover:text-[#3b4045]">Follow</span>
                                </div>

                                <div className="bg-[#d9eaf7] p-2 rounded-[3px] w-full sm:w-[200px] text-[12px]">
                                    <div className="text-[#6a737c] mb-1">asked <span className="text-[#6a737c]">1 min ago</span></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-blue-400 rounded-[3px] flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-200">{question.author[0].toUpperCase()}</div>
                                        <div>
                                            <div className="so-link font-medium cursor-pointer">{question.author}</div>
                                            <div className="font-bold text-[#6a737c]">1.2k <span className="font-normal text-[#838c95]">● 12</span> <span className="font-normal text-[#838c95]">● 24</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Answers Section Mock */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-[19px] text-[#232629]">{question.answers} Answers</h2>
                            <div className="flex border border-[#9fa6ad] rounded-[3px] divide-x divide-[#9fa6ad] text-xs">
                                <div className="px-3 py-1.5 bg-[#f1f2f3] text-[#3b4045] font-medium cursor-pointer">Score</div>
                                <div className="px-3 py-1.5 hover:bg-[#f8f9f9] text-[#6a737c] cursor-pointer">Date</div>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 py-6 flex gap-4">
                            {/* Answer Voting */}
                            <div className="flex flex-col items-center gap-1 text-[#babfc4] shrink-0 w-10 md:w-12 pt-1 font-medium text-lg">
                                <button className="p-1 hover:bg-orange-50 rounded-full hover:text-orange-500 transition-colors cursor-pointer"><ChevronUp size={28} strokeWidth={2.5} /></button>
                                <span className="font-semibold text-[21px] text-[#6a737c] my-1">{Math.floor(question.votes / 2)}</span>
                                <button className="p-1 hover:bg-orange-50 rounded-full hover:text-orange-500 transition-colors cursor-pointer"><ChevronDown size={28} strokeWidth={2.5} /></button>
                                <div className="mt-2 text-[#2f6f44]"><Check size={32} /></div>
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[15px] leading-6 text-[#232629] mb-4">You can verify this by checking the official documentation. The API changed in version 18.2. It works like this:</p>
                                <div className="bg-[#f6f6f6] p-3 rounded-[3px] overflow-x-auto mb-6 text-[13px] border border-[#e3e6e8]">
                                    <code className="font-mono text-[#232629]">
                                        const correctWay = () ={'>'} {'{'}<br />
                                        &nbsp;&nbsp;return true;<br />
                                        {'}'}
                                    </code>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start pt-2 gap-2">
                                    <div className="flex gap-3 text-[13px] text-[#6a737c]">
                                        <span className="cursor-pointer hover:text-[#3b4045]">Share</span>
                                        <span className="cursor-pointer hover:text-[#3b4045]">Edit</span>
                                        <span className="cursor-pointer hover:text-[#3b4045]">Follow</span>
                                    </div>
                                    <div className="text-[12px] text-[#6a737c]">
                                        answered <span className="font-medium">2 hours ago</span> <span className="so-link cursor-pointer">senior_dev</span> <span className="font-bold text-[#6a737c]">45.2k</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mock Related Questions */}
                    <div className="mt-12 pt-10 border-t border-gray-200">
                        <h3 className="text-[19px] text-[#232629] mb-4">Related Questions</h3>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="bg-[#5eba7d] text-white text-xs px-2 py-0.5 rounded-[3px] shrink-0 font-medium">1.2k</div>
                                <div className="so-link text-[13px] cursor-pointer line-clamp-1">How do I vertically align text next to an image?</div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="bg-[#5eba7d] text-white text-xs px-2 py-0.5 rounded-[3px] shrink-0 font-medium">456</div>
                                <div className="so-link text-[13px] cursor-pointer line-clamp-1">What is the difference between flex-direction: row and column?</div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="border border-[#5eba7d] text-[#5eba7d] text-xs px-2 py-0.5 rounded-[3px] shrink-0 font-medium">89</div>
                                <div className="so-link text-[13px] cursor-pointer line-clamp-1">Why is my z-index not working properly?</div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="text-[#6a737c] text-xs px-2 py-0.5 rounded-[3px] shrink-0 font-medium w-8 text-center">2</div>
                                <div className="so-link text-[13px] cursor-pointer line-clamp-1">React Router v6 nested routes explanation</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar (Blog/Overflow) - Sticky relative to parent */}
                <div className="w-[300px] shrink-0 pl-6 ml-6 pt-6 sticky top-[50px] h-screen overflow-y-auto">
                    <div className="bg-[#fdf7e2] border border-[#f1e5bc] rounded-[3px] shadow-sm mb-4 text-[13px]">
                        <div className="p-0 overflow-hidden">
                            <AdSenseUnit slotId="0987654321" style={{ height: '250px', width: '100%' }} />
                        </div>
                    </div>

                    <div className="border border-[#d6d9dc] rounded-[3px] shadow-sm mb-4 text-[13px]">
                        <div className="bg-[#f8f9f9] py-2 px-3 border-b border-[#d6d9dc] font-bold text-[#3b4045] text-[15px]">Custom Filters</div>
                        <div className="p-4 text-[#6a737c] text-xs">
                            Create a custom filter to see the questions you care about.
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#232629] text-[#babfc4] py-8 mt-auto px-6 w-full shrink-0">
                <div className="max-w-[1264px] mx-auto flex flex-col md:flex-row gap-8 text-[13px]">
                    <div className="w-8 shrink-0 flex flex-col gap-2">
                        <div className="bg-orange-400 text-white p-0.5 rounded-[2px] font-serif font-bold w-8 h-8 flex items-center justify-center text-lg">S</div>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex flex-col gap-2">
                            <h5 className="font-bold text-[#babfc4] uppercase mb-2">Stack Overflow</h5>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Questions</span>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Help</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="font-bold text-[#babfc4] uppercase mb-2">Products</h5>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Teams</span>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Advertising</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="font-bold text-[#babfc4] uppercase mb-2">Company</h5>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">About</span>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Press</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="font-bold text-[#babfc4] uppercase mb-2">Network</h5>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Technology</span>
                            <span className="cursor-pointer hover:text-[#9fa6ad]">Culture & Recreation</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[300px] flex flex-col gap-4 text-[11px] text-[#9fa6ad]">
                        <div className="flex gap-2 text-[11px]">
                            <span>Blog</span>
                            <span>Facebook</span>
                            <span>Twitter</span>
                            <span>LinkedIn</span>
                            <span>Instagram</span>
                        </div>
                        <p>
                            Site design / logo © 2024 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2024.1.25.4321
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
