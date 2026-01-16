import { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, ExternalLink, Menu, Share, Quote, Info, Check, Copy } from 'lucide-react';


const DOC_PAGES: Record<string, any> = {
    'intro': {
        title: "Thinking in Relax",
        category: "Quick Start",
        content: (
            <>
                <p className="text-[17px] text-[#23272f] leading-relaxed mb-6 font-medium">
                    Relax can change how you think about the designs you see and the apps you build.
                    When you build a UI with Relax, you will first break it apart into pieces called "naps".
                    Then, you will describe the different visual states for each of your naps (e.g. Deep Sleep, REM).
                </p>
                <div className="bg-[#f0f9fa] border-l-8 border-[#097c8f] rounded-2xl p-6 mb-8 mt-8">
                    <div className="flex items-center gap-2 mb-2">
                        <Info size={20} className="text-[#097c8f]" strokeWidth={2.5} />
                        <h4 className="font-bold text-[#097c8f] text-lg">Note</h4>
                    </div>
                    <p className="text-[#23272f] text-[15px] leading-7">This is a simulated documentation page. Do not take this advice seriously unless you really want to sleep at work.</p>
                </div>

                <h3 className="text-2xl font-bold text-[#23272f] mb-4 mt-8">Start with the mock</h3>
                <p className="text-[#23272f] mb-6 text-[17px] leading-8">
                    Imagine that you already have a JSON API and a mockup from a designer.
                    Just imagine it. Don't actually build it. That sounds like work.
                </p>

                <div className="bg-[#23272f]/[0.98] text-[#f8f8f2] rounded-2xl font-mono text-[13px] mb-8 overflow-hidden shadow-lg border border-[#343a46]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#343a46]/50 border-b border-[#343a46]">
                        <span className="text-gray-400">ProductTable.js</span>
                        <button className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 text-xs font-sans">
                            <Copy size={12} /> Copy
                        </button>
                    </div>
                    <div className="p-6 overflow-x-auto">
                        <span className="text-[#c678dd]">function</span> <span className="text-[#e5c07b]">ProductTable</span>({`{ products }`}) {'{'} <br />
                        &nbsp;&nbsp;<span className="text-[#c678dd]">return</span> (<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-[#e06c75]">div</span>&gt;<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'{/* ... */}'}<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-[#e06c75]">div</span>&gt;<br />
                        &nbsp;&nbsp;);<br />
                        {'}'}
                    </div>
                </div>

                <div className="bg-[#f2f7fc] border-l-8 border-[#087ea4] rounded-2xl p-6 mb-8 mt-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="bg-[#087ea4] rounded-full p-0.5"><Check size={14} className="text-white" strokeWidth={4} /></div>
                        <h4 className="font-bold text-[#087ea4] text-lg">Deep Dive</h4>
                    </div>
                    <p className="text-[#23272f] text-[15px] leading-7">
                        Relax components are JavaScript functions that return nothing. They are the building blocks of procrastination.
                    </p>
                </div>
            </>
        )
    },
    'ui': {
        title: "Describing the UI",
        category: "Learn React",
        content: <p className="text-[17px] text-[#23272f] leading-loose">React components are JavaScript functions that return markup. This section describes how to write components, pass props, and conditionally render JSX.</p>
    },
    'state': {
        title: "Managing State",
        category: "Learn React",
        content: <p className="text-[17px] text-[#23272f] leading-loose">As your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components.</p>
    },
    'escape': {
        title: "Escape Hatches",
        category: "Advanced",
        content: <p className="text-[17px] text-[#23272f] leading-loose">Some of your components may need to control and synchronize with systems outside of React. This includes browser APIs, third-party widgets, and other non-React code.</p>
    }
};

export default function DocsApp({ refreshKey }: { refreshKey: number }) {
    const [activePage, setActivePage] = useState('intro');
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const keys = Object.keys(DOC_PAGES);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        if (refreshKey > 0) setActivePage(randomKey);

        // Scroll to top on page change
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }, [refreshKey]);

    const page = DOC_PAGES[activePage] || DOC_PAGES['intro'];

    return (
        <div className="flex flex-col h-full bg-[#ffffff] font-sans antialiased text-[#23272f]">
            {/* Header */}
            <div className="h-[60px] border-b border-[rgba(0,0,0,0.05)] flex items-center px-4 md:px-6 justify-between shrink-0 sticky top-0 bg-[#ffffff]/80 backdrop-blur-md z-30">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <div className="text-[#087ea4] group-hover:animate-[spin_3s_linear_infinite]">
                            <svg width="30" height="30" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#087ea4] fill-current w-8 h-8">
                                <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                                <g stroke="currentColor" strokeWidth="1" fill="none">
                                    <ellipse rx="10" ry="4.5"></ellipse>
                                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                                </g>
                            </svg>
                        </div>
                        <span className="font-bold text-[19px] tracking-tight hidden sm:block text-[#23272f]">Relax</span>
                    </div>

                    <div className="hidden md:flex items-center gap-2 bg-[#ebf2f7] hover:bg-[#e4ebf0] px-3 py-2 rounded-full text-[#5e6674] w-full max-w-[400px] cursor-text transition-colors text-sm">
                        <Search size={18} />
                        <span className="flex-1">Search</span>
                        <div className="flex gap-1 text-[10px] font-bold text-[#99a1b3] uppercase">
                            <span className="bg-white px-1.5 py-0.5 rounded border border-[#dce3ea]">Ctrl</span>
                            <span className="bg-white px-1.5 py-0.5 rounded border border-[#dce3ea]">K</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1 font-medium text-[15px]">
                    <span className="hover:bg-[#ebf2f7] hover:text-[#087ea4] text-[#23272f] px-3 py-1.5 rounded-full cursor-pointer hidden sm:block transition-colors">Learn</span>
                    <span className="hover:bg-[#ebf2f7] hover:text-[#087ea4] text-[#23272f] px-3 py-1.5 rounded-full cursor-pointer hidden sm:block transition-colors">Reference</span>
                    <span className="hover:bg-[#ebf2f7] hover:text-[#087ea4] text-[#23272f] px-3 py-1.5 rounded-full cursor-pointer hidden sm:block transition-colors">Community</span>
                    <span className="hover:bg-[#ebf2f7] hover:text-[#087ea4] text-[#23272f] px-3 py-1.5 rounded-full cursor-pointer hidden sm:block transition-colors">Blog</span>

                    <div className="ml-2 flex items-center gap-3 text-[#23272f]">
                        <div className="hover:bg-[#ebf2f7] p-2 rounded-full cursor-pointer"><Share size={20} /></div>
                        <div className="hover:bg-[#ebf2f7] p-2 rounded-full cursor-pointer"><ExternalLink size={20} /></div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                <div className="w-[300px] pb-10 pl-4 pr-2 pt-6 overflow-y-auto hidden lg:block shrink-0 sticky top-0 h-full scroll-px-4">
                    <div className="space-y-6">
                        <Section title="Get Started" activePage={activePage} onNavigate={setActivePage} pages={['intro']} pageTitles={{ 'intro': 'Thinking in React' }} expanded />
                        <Section title="Learn React" activePage={activePage} onNavigate={setActivePage} pages={['ui', 'state']} pageTitles={{ 'ui': 'Describing the UI', 'state': 'Managing State' }} />
                        <Section title="Escape Hatches" activePage={activePage} onNavigate={setActivePage} pages={['escape']} pageTitles={{ 'escape': 'Escape Hatches' }} last />
                    </div>

                    <div className="mt-8 pt-8 border-t border-[rgba(0,0,0,0.05)]">
                        {/* Removed Sponsors Ad as requested */}
                    </div>

                </div>

                {/* Main */}
                <div className="flex-1 overflow-y-auto" ref={scrollContainerRef}>
                    <div className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-14">
                        <div className="text-[#097c8f] font-bold text-sm mb-4 flex items-center gap-2">
                            <div className="bg-[#e6f7ff] px-2 py-0.5 rounded text-[12px] font-bold tracking-wide uppercase">
                                {page.category}
                            </div>
                            <ChevronRight size={12} strokeWidth={3} />
                        </div>
                        <h1 className="text-[40px] md:text-[52px] font-bold text-[#23272f] mb-8 leading-tight tracking-tight">{page.title}</h1>

                        <div className="prose prose-lg max-w-none prose-p:text-[#23272f] prose-headings:text-[#23272f] prose-strong:text-[#23272f]">
                            {page.content}
                        </div>

                        <div className="mt-16 flex justify-between border-t border-[rgba(0,0,0,0.05)] pt-8">
                            <div className="flex flex-col gap-1 items-start cursor-pointer group">
                                <span className="text-xs uppercase font-bold text-[#5e6674] tracking-wider">Previous</span>
                                <span className="text-lg font-bold text-[#23272f] group-hover:text-[#087ea4] transition-colors">Installation</span>
                            </div>
                            <div className="flex flex-col gap-1 items-end cursor-pointer group">
                                <span className="text-xs uppercase font-bold text-[#5e6674] tracking-wider">Next</span>
                                <span className="text-lg font-bold text-[#23272f] group-hover:text-[#087ea4] transition-colors">Your First Component</span>
                            </div>
                        </div>
                    </div>
                    {/* Fake copious footer space */}
                    <div className="h-20"></div>
                </div>

                {/* Right TOC */}
                <div className="w-64 py-10 pr-6 hidden 2xl:block text-sm shrink-0 sticky top-0 h-full">
                    <h4 className="font-bold text-[#23272f] mb-4 uppercase text-xs tracking-wider ml-4">On this page</h4>
                    <ul className="space-y-3 pl-4 border-l border-[#ebf2f7]">
                        <li className="text-[#087ea4] font-bold -ml-[17px] border-l-2 border-[#087ea4] pl-4 py-0.5">Overview</li>
                        <li className="text-[#5e6674] hover:text-[#23272f] cursor-pointer pl-4 transition-colors">Start with the mock</li>
                        <li className="text-[#5e6674] hover:text-[#23272f] cursor-pointer pl-4 transition-colors">Step 1: Break the UI into a component hierarchy</li>
                        <li className="text-[#5e6674] hover:text-[#23272f] cursor-pointer pl-4 transition-colors">Step 2: Build a static version in React</li>
                        <li className="text-[#5e6674] hover:text-[#23272f] cursor-pointer pl-4 transition-colors">Step 3: Find the minimal but complete representation of UI state</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Section({ title, activePage, onNavigate, pages, pageTitles, expanded = false, last = false }: { title: string, activePage: string, onNavigate: (p: string) => void, pages: string[], pageTitles: Record<string, string>, expanded?: boolean, last?: boolean }) {
    const isActiveSection = pages.includes(activePage) || expanded;

    return (
        <div className={last ? '' : 'pb-4'}>
            <div className="font-bold mb-3 flex items-center justify-between cursor-pointer text-[#23272f] hover:text-[#087ea4] px-4 py-1 rounded transition-colors group">
                <span className="text-[15px]">{title}</span>
                {isActiveSection && <ChevronRight size={14} className="rotate-90 text-[#99a1b3] group-hover:text-[#087ea4]" strokeWidth={3} />}
            </div>
            {isActiveSection && (
                <ul className="space-y-0.5">
                    {pages.map(p => {
                        const isActive = activePage === p;
                        return (
                            <li
                                key={p}
                                onClick={() => onNavigate(p)}
                                className={`
                                    cursor-pointer px-4 py-2 rounded-r-full text-[15px] font-medium transition-colors border-l-4 ml-2
                                    ${isActive
                                        ? 'bg-[#e6f7ff] text-[#087ea4] border-[#087ea4]'
                                        : 'text-[#5e6674] hover:text-[#23272f] hover:bg-[#f3f4f6] border-transparent'
                                    }
                                `}
                            >
                                {pageTitles[p]}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
