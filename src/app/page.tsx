'use client';

import { motion } from 'framer-motion';
import { useSimulationStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Code2, Monitor, Keyboard, Terminal, Play } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const setJob = useSimulationStore((state) => state.setJob);

  const handleStart = () => {
    setJob('frontend');
    router.push('/simulation');
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-gray-200 selection:bg-green-500/30 flex flex-col items-center p-6 relative overflow-hidden font-sans">

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none" />
      <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. Header & Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center mt-20 mb-16 z-10"
      >
        <div className="inline-block px-3 py-1 mb-6 border border-green-500/30 rounded-full bg-green-500/10 text-green-400 text-xs font-mono uppercase tracking-wider">
          System V.1.0 Online
        </div>
        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight">
          Lupin's Paradise
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate <span className="text-green-400 font-semibold">work simulator</span>.
          A high-fidelity environment designed to make you look incredibly busy while you do absolutely nothing.
        </p>
      </motion.div>

      {/* 2. Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full mb-20"
      >
        <FeatureCard
          icon={<Code2 className="text-blue-400" size={32} />}
          title="Fake VS Code"
          desc="A realistic editor that writes code for you. Just mash your keyboard."
        />
        <FeatureCard
          icon={<Monitor className="text-purple-400" size={32} />}
          title="Browser Simulation"
          desc="Browse StackOverflow and read docs without leaving the 'safe' zone."
        />
        <FeatureCard
          icon={<Terminal className="text-orange-400" size={32} />}
          title="Interactive Terminal"
          desc="Run fake commands and look like a 10x developer."
        />
      </motion.div>

      {/* 3. Controls / Cheat Sheet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl w-full bg-[#161616] border border-[#333] rounded-2xl p-8 mb-16 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Keyboard size={120} />
        </div>

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-green-500 rounded-full" />
          Control Center
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <ShortcutItem keys={['Ctrl', 'Alt', 'N']} action="New File" />
          <ShortcutItem keys={['Ctrl', 'Alt', 'R']} action="Rename File" />
          <ShortcutItem keys={['Ctrl', 'Alt', 'D']} action="Delete File" />
          <ShortcutItem keys={['Ctrl', 'Shift', 'E']} action="Project Explorer" />
          <ShortcutItem keys={['Any Key']} action="Generate Code (Typing Mode)" desc="Just type anything!" />
        </div>
      </motion.div>

      {/* 4. CTA / Start Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-20"
      >
        <button
          onClick={handleStart}
          className="group relative px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95"
        >
          <span>Enter Simulation</span>
          <Play size={20} className="fill-black group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      {/* Footer */}
      <footer className="text-gray-600 text-sm pb-8">
        © {new Date().getFullYear()} Lupin's Paradise. Built for the art of looking busy.
      </footer>

    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-[#111] border border-[#222] p-6 rounded-xl hover:border-[#444] transition-colors group">
      <div className="mb-4 bg-[#1a1a1a] w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-200">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  )
}

function ShortcutItem({ keys, action, desc }: { keys: string[], action: string, desc?: string }) {
  return (
    <div className="flex items-start justify-between group">
      <div className="flex flex-col">
        <span className="font-medium text-gray-300 group-hover:text-green-400 transition-colors">{action}</span>
        {desc && <span className="text-xs text-gray-500 mt-1">{desc}</span>}
      </div>
      <div className="flex gap-1">
        {keys.map((k, i) => (
          <kbd key={i} className="px-2 py-1 bg-[#222] border border-[#333] rounded text-xs font-mono text-gray-400 min-w-[24px] text-center shadow-sm">
            {k}
          </kbd>
        ))}
      </div>
    </div>
  )
}
