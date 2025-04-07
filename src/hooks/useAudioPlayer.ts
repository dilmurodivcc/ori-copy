import { create } from 'zustand';

interface AudioPlayerStore {
  isVisible: boolean;
  showPlayer: () => void;
  hidePlayer: () => void;
  togglePlayer: () => void;
}

const useAudioPlayer = create<AudioPlayerStore>((set) => ({
  isVisible: false,
  showPlayer: () => set({ isVisible: true }),
  hidePlayer: () => set({ isVisible: false }),
  togglePlayer: () => set((state) => ({ isVisible: !state.isVisible })),
}));

export default useAudioPlayer;
