'use client';

import { motion } from 'framer-motion';
import { useSimulationStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Code2, BarChart3, Briefcase } from 'lucide-react';

export default function LandingPage() {
  const setJob = useSimulationStore((state) => state.setJob);
  const router = useRouter();

  const handleSelectJob = (job: 'frontend' | 'analyst' | 'manager') => {
    setJob(job);
    router.push('/simulation');
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Lupin's Paradise
        </h1>
        <p className="text-gray-400 text-lg">
          Choose your mask. Deceive the world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <JobCard
          title="Frontend Dev"
          icon={<Code2 className="w-12 h-12 mb-4 text-blue-400" />}
          description="VS Code, Chrome DevTools, and endless Stack Overflow tabs."
          onClick={() => handleSelectJob('frontend')}
        />
        <JobCard
          title="Data Analyst"
          icon={<BarChart3 className="w-12 h-12 mb-4 text-green-400" />}
          description="Complex charts, Excel sheets, and SQL queries running forever."
          onClick={() => handleSelectJob('analyst')}
        />
        <JobCard
          title="Office Manager"
          icon={<Briefcase className="w-12 h-12 mb-4 text-orange-400" />}
          description="Email drafting, CalendarTetris, and Slack huddles."
          onClick={() => handleSelectJob('manager')}
        />
      </div>
    </main>
  );
}

function JobCard({ title, icon, description, onClick }: { title: string, icon: React.ReactNode, description: string, onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl flex flex-col items-center text-center hover:border-zinc-700 transition-colors group"
    >
      <div className="group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-zinc-500 text-sm">{description}</p>
    </motion.button>
  );
}
