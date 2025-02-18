import { create } from "zustand";
import { ReceivedDataType } from "../types/type";

interface useSelectedPostureAlertStoreType {
  selectedDetectionId: number | null;
  problemPart: ReceivedDataType["problemPart"] | null;

  setSelectedDetectionId: (id: number | null) => void;
  setProblemPart: (data: ReceivedDataType["problemPart"]) => void;
}

const useSelectedPostureAlertStore = create<useSelectedPostureAlertStoreType>(
  (set) => ({
    selectedDetectionId: null,
    problemPart: null,

    setSelectedDetectionId: (id) => set({ selectedDetectionId: id }),
    setProblemPart: (data) => set({ problemPart: data }),
  })
);

export default useSelectedPostureAlertStore;
