import { create } from 'zustand';

type ModalState = {
  isAuthModalOpen: boolean;
  isOnboardingModalOpen: boolean;
  isPitchModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openOnboardingModal: () => void;
  closeOnboardingModal: () => void;
  openPitchModal: () => void;
  closePitchModal: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isAuthModalOpen: false,
  isOnboardingModalOpen: false,
  isPitchModalOpen: false,
  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  openOnboardingModal: () => set({ isOnboardingModalOpen: true }),
  closeOnboardingModal: () => set({ isOnboardingModalOpen: false }),
  openPitchModal: () => set({ isPitchModalOpen: true }),
  closePitchModal: () => set({ isPitchModalOpen: false }),
}));
