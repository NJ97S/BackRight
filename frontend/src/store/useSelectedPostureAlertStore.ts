import { create } from "zustand";

interface useSelectedPostureAlertStoreType {
  selectedDetectionId: number | null;

  setSelectedDetectionId: (id: number | null) => void;
}

const useSelectedPostureAlertStore = create<useSelectedPostureAlertStoreType>(
  (set) => ({
    selectedDetectionId: null,

    setSelectedDetectionId: (id) => set({ selectedDetectionId: id }),
  })
);

export default useSelectedPostureAlertStore;
