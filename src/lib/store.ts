import { create } from 'zustand';

type JobMode = 'frontend' | 'analyst' | 'manager' | null;
type SimStatus = 'idle' | 'running' | 'paused' | 'panic';

interface SimulationState {
    job: JobMode;
    status: SimStatus;

    setJob: (job: JobMode) => void;
    setStatus: (status: SimStatus) => void;
    toggleSimulation: () => void;
    triggerPanic: () => void;
    resetPanic: () => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
    job: null,
    status: 'idle',

    setJob: (job) => set({ job }),
    setStatus: (status) => set({ status }),

    toggleSimulation: () => set((state) => ({
        status: state.status === 'running' ? 'paused' : 'running'
    })),

    triggerPanic: () => set({ status: 'panic' }),
    resetPanic: () => set({ status: 'idle' })
}));
