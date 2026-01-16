import { useState, useEffect, useRef } from 'react';
import { Terminal, CheckCircle2, XCircle, Clock, PlayCircle } from 'lucide-react';

const BASE_LOGS = [
    { text: "Building... (eventually)", color: "text-blue-400" },
    { text: "Cloning repository from a shady mirror...", color: "text-gray-400" },
    { text: "Downloading the entire internet...", color: "text-gray-400" },
    { text: "Ignoring peer dependencies warnings (as usual)", color: "text-yellow-500" },
    { text: "Installing 40,000 packages...", color: "text-gray-400" },
    { text: "Found 98 vulnerabilities (0 low, 98 critical)", color: "text-red-500" },
    { text: "Running 'npm run build' hoping for the best", color: "text-gray-400" },
    { text: "Asking ChatGPT how to fix the build...", color: "text-blue-400" },
    { text: "Sacrificing goat to the demo gods...", color: "text-purple-400" },
    { text: "Installing crypto miner (hidden feature)...", color: "text-gray-400" },
    { text: "Blaming previous intern for legacy code...", color: "text-gray-400" },
    { text: "Downloading more RAM...", color: "text-blue-400" },
];

const ERROR_LOGS = [
    { text: "Failed to compile. Obviously.", color: "text-red-500" },
    { text: "./src/App.tsx: SyntaxError: Unexpected token '?' (did you mean '??'?)", color: "text-red-400" },
    { text: "Build failed with exit code 1 (Sadge)", color: "text-red-500 font-bold" },
    { text: "Retrying... (definition of insanity)", color: "text-yellow-400" },
];

const SUCCESS_LOGS = [
    { text: "Compiled successfully", color: "text-green-400" },
    { text: "Route (app)                              Size     First Load JS", color: "text-gray-400" },
    { text: "┌ ○ /                                    5.2 kB         84.2 kB", color: "text-gray-400" },
    { text: "└ λ /api/auth                            0 kB                0 kB", color: "text-gray-400" },
    { text: "Build Completed in 12.4s", color: "text-green-400 font-bold" },
    { text: "Deploying outputs...", color: "text-blue-400" },
    { text: "Deployment complete!", color: "text-green-500 font-bold text-lg" },
];

export default function DeployApp({ refreshKey }: { refreshKey: number }) {
    const [logs, setLogs] = useState<{ text: string, color: string }[]>([]);
    const [status, setStatus] = useState<'building' | 'error' | 'success'>('building');
    const scrollRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Reset logs on refresh
        setLogs([]);
        setStatus('building');
        let currentStep = 0;
        let hasErrorOccurred = false;

        const addNextLog = () => {
            // 1. Base Phase
            if (currentStep < BASE_LOGS.length) {
                const log = BASE_LOGS[currentStep];
                if (log) {
                    setLogs(prev => [...prev, log]);
                }
                currentStep++;
                timeoutRef.current = setTimeout(addNextLog, 300 + Math.random() * 500);
            }
            // 2. pseudo-random Error Phase (30% chance or forced by refreshKey logic if we wanted)
            else if (!hasErrorOccurred && Math.random() > 0.5) {
                hasErrorOccurred = true;
                setStatus('error');
                let errIndex = 0;
                const runErrorLogs = () => {
                    if (errIndex < ERROR_LOGS.length) {
                        const errLog = ERROR_LOGS[errIndex];
                        if (errLog) {
                            setLogs(prev => [...prev, errLog]);
                        }
                        errIndex++;
                        timeoutRef.current = setTimeout(runErrorLogs, 500);
                    } else {
                        // After error logs, reset and try again (Persistence is key!)
                        setTimeout(() => {
                            setLogs(prev => [...prev, { text: "Restarting build process...", color: "text-blue-400 font-bold border-t border-gray-700 pt-2 mt-2" }]);
                            setStatus('building');
                            currentStep = 6; // Skip clone/install
                            hasErrorOccurred = true; // Don't error twice
                            timeoutRef.current = setTimeout(addNextLog, 1000);
                        }, 3000);
                    }
                };
                runErrorLogs();
            }
            // 3. Success Phase
            else {
                let succIndex = 0;
                const runSuccessLogs = () => {
                    if (succIndex < SUCCESS_LOGS.length) {
                        const succLog = SUCCESS_LOGS[succIndex];
                        if (succLog) {
                            setLogs(prev => [...prev, succLog]);
                        }
                        succIndex++;
                        timeoutRef.current = setTimeout(runSuccessLogs, 400);
                    } else {
                        setStatus('success');
                    }
                };
                runSuccessLogs();
            }
        };

        timeoutRef.current = setTimeout(addNextLog, 500);

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [refreshKey]);


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="flex flex-col h-full bg-black text-gray-300 font-mono text-xs">
            {/* Vercel Header */}
            <div className="border-b border-gray-800 p-4 flex items-center justify-between bg-black">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-black border border-gray-700 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4"><path d="M12 1L24 22H0L12 1Z" /></svg>
                    </div>
                    <div>
                        <div className="font-bold text-white text-sm">dalgakfoots/foo-io</div>
                        <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-wide font-semibold">
                            <span>production</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span>git-push</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {status === 'building' && <div className="text-blue-500 animate-pulse flex items-center gap-2"><Clock size={16} /> Building</div>}
                    {status === 'error' && <div className="text-red-500 flex items-center gap-2"><XCircle size={16} /> Build Failed</div>}
                    {status === 'success' && <div className="text-green-500 flex items-center gap-2"><CheckCircle2 size={16} /> Ready</div>}
                    <button className="bg-white text-black px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">Visit</button>
                </div>
            </div>

            {/* Logs Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 scroll-smooth" ref={scrollRef}>
                {logs.map((log, i) => (
                    // Safeguard against undefined logs
                    log ? (
                        <div key={i} className={`${log.color} break-words`}>
                            <span className="text-gray-600 mr-3 select-none">14:02:{String(10 + i).padStart(2, '0')}</span>
                            {log.text}
                        </div>
                    ) : null
                ))}
                {status === 'building' && (
                    <div className="animate-pulse w-3 h-5 bg-gray-500 mt-2" />
                )}
            </div>
        </div>
    );
}

function Step({ status, label }: { status: 'done' | 'active' | 'pending', label: string }) {
    const colors = {
        done: 'text-blue-400',
        active: 'text-white font-semibold',
        pending: 'text-gray-600'
    }
    const icons = {
        done: <CheckCircle2 size={14} />,
        active: <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />,
        pending: <div className="w-3 h-3 border-2 border-gray-600 rounded-full" />
    }

    return (
        <div className={`flex items-center gap-2 ${colors[status]}`}>
            {icons[status]}
            <span>{label}</span>
        </div>
    )
}
