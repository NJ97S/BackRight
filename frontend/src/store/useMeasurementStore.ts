import { PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { create } from "zustand";

import { ReceivedDataType } from "../types/type";

interface MeasurementState {
  stream: MediaStream | null;
  elapsedTime: number;
  receivedData: ReceivedDataType | null;
  isMeasuring: boolean;
  landmarkResult: PoseLandmarkerResult | null;

  startMeasurement: () => void;
  stopMeasurement: () => void;

  setStream: (stream: MediaStream | null) => void;
  setElapsedTime: () => void;
  setReceivedData: (data: ReceivedDataType | null) => void;
  setLandmarkResult: (data: PoseLandmarkerResult | null) => void;
}

const useMeasurementStore = create<MeasurementState>((set) => ({
  stream: null,
  elapsedTime: 0,
  receivedData: null,
  isMeasuring: false,
  landmarkResult: null,

  startMeasurement: () => set({ isMeasuring: true }),
  stopMeasurement: () =>
    set({
      isMeasuring: false,
      stream: null,
      elapsedTime: 0,
      receivedData: null,
    }),

  setStream: (stream) => set({ stream }),
  setElapsedTime: () =>
    set((state) => ({ elapsedTime: state.elapsedTime + 1 })),
  setReceivedData: (data) => set({ receivedData: data }),
  setLandmarkResult: (data) => set({ landmarkResult: data }),
}));

export default useMeasurementStore;
