import { PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { create } from "zustand";

import { ReceivedDataType, SessionAlertType } from "../types/type";

interface MeasurementState {
  stream: MediaStream | null;
  elapsedTime: number;
  receivedData: ReceivedDataType | null;
  isMeasuring: boolean;

  landmarkResult: PoseLandmarkerResult | null;
  sessionAlertList: SessionAlertType[];
  newAlertCount: number;

  startMeasurement: () => void;
  stopMeasurement: () => void;

  setStream: (stream: MediaStream | null) => void;
  setElapsedTime: () => void;
  setReceivedData: (data: ReceivedDataType | null) => void;
  setLandmarkResult: (data: PoseLandmarkerResult | null) => void;

  addSessionAlert: (data: ReceivedDataType) => void;
  clearSessionAlerts: () => void;
  setNewAlertCount: (count: number) => void;
}

const useMeasurementStore = create<MeasurementState>((set) => ({
  stream: null,
  elapsedTime: 0,
  receivedData: null,
  isMeasuring: false,

  landmarkResult: null,
  sessionAlertList: [],
  newAlertCount: 0,

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

  addSessionAlert: (data) =>
    set((state) => {
      const { startedAt, problemPart, detectionId, videoPreSignedUrl } = data;

      if (!startedAt || !videoPreSignedUrl) return state;

      const newAlert: SessionAlertType = {
        startedAt,
        problemPart,
        detectionId,
      };

      return { sessionAlertList: [newAlert, ...state.sessionAlertList] };
    }),
  clearSessionAlerts: () => set({ sessionAlertList: [] }),
  setNewAlertCount: (count) => set({ newAlertCount: count }),
}));

export default useMeasurementStore;
