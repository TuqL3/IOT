import { create } from 'zustand';

interface useOpenSheetProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenSheet = create<useOpenSheetProps>()((set) => ({
  isOpen: false,
  onOpen: () => set((state) => ({ isOpen: true })),
  onClose: () => set((state) => ({ isOpen: false })),
}));
