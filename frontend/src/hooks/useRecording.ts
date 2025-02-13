/* eslint-disable no-undef */

import { useEffect, useRef } from "react";

import axios from "axios";

import useMeasurementStore from "../store/useMeasurementStore";
import { ReceivedDataType } from "../types/type";

const DB_NAME = "VideoDB";
const STORE_NAME = "videos";
const DB_VERSION = 1;
const RECORDING_DURATION = 5000;

const useRecording = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { receivedData } = useMeasurementStore();

  const saveToIndexedDB = (blob: Blob) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "timestamp" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const videoData = {
        blob,
        timestamp: Date.now(),
      };

      store.add(videoData);
    };

    request.onerror = (e) => {
      console.error("IndexedDB 저장 실패:", e);
    };
  };

  const startRecording = (stream: MediaStream) => {
    if (!stream) return;

    recordedChunks.current = [];

    mediaRecorderRef.current = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.current.push(e.data);
      }
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });

      saveToIndexedDB(blob);
    };

    mediaRecorderRef.current.start();

    recordingTimerRef.current = setInterval(() => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.start();
      }
    }, RECORDING_DURATION);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
    }
  };

  const clearVideosBeforeTime = (targetTimeUTC: number) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const requestGetAll = store.getAll();

      requestGetAll.onsuccess = () => {
        const allVideos = requestGetAll.result;

        allVideos.forEach((video: { blob: Blob; timestamp: number }) => {
          if (video.timestamp <= targetTimeUTC) {
            store.delete(video.timestamp);
          }
        });
      };

      requestGetAll.onerror = (e) => {
        console.error("IndexedDB 데이터 조회 실패:", e);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB 열기 실패:", e);
    };
  };

  const getVideoByExactTime = (
    targetTimeUTC: number,
    callback: (videos: Blob[]) => void
  ) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const requestGetAll = store.getAll();

      requestGetAll.onsuccess = () => {
        const allVideos = requestGetAll.result;
        const matchedVideos = allVideos
          .filter(
            (video: { blob: Blob; timestamp: number }) =>
              video.timestamp <= targetTimeUTC &&
              targetTimeUTC <= video.timestamp + RECORDING_DURATION
          )
          .map((video) => video.blob);

        callback(matchedVideos);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB 검색 실패:", e);
    };
  };

  const uploadVideoToS3 = (data: ReceivedDataType) => {
    if (!data?.videoPreSignedUrl || !data.startedAt) return;

    const targetTime = new Date(data.startedAt).getTime();

    getVideoByExactTime(targetTime, async (videos) => {
      if (videos.length === 0) return;

      const videoBlob = videos[0];

      try {
        await axios.put(data.videoPreSignedUrl as string, videoBlob, {
          headers: { "Content-Type": "video/webm" },
        });

        clearVideosBeforeTime(targetTime);
      } catch (error) {
        console.error("S3 영상 업로드 실패", error);
      }
    });
  };

  const clearAllVideos = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const clearRequest = store.clear();

      clearRequest.onerror = (e) => {
        console.error("IndexedDB 삭제 실패:", e);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB 열기 실패:", e);
    };
  };

  useEffect(() => {
    if (!receivedData?.videoPreSignedUrl) return;

    uploadVideoToS3(receivedData);
  }, [receivedData]);

  return {
    startRecording,
    stopRecording,
    clearAllVideos,
  };
};

export default useRecording;
