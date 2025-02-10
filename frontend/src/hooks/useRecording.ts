/* eslint-disable no-undef */

import { useRef } from "react";

const DB_NAME = "VideoDB";
const STORE_NAME = "videos";
const DB_VERSION = 1;
const RECORDING_DURATION = 5000;

const useRecording = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

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

      // console.log("나 블롭 저장해따!! >_<");
    };

    request.onerror = (e) => {
      console.error("IndexedDB 저장 실패:", e);
    };
  };

  const startRecording = (stream: MediaStream) => {
    if (!stream) return;

    // console.log("나 레코딩 시작한다!! >ㅁ<");

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

  const getAllVideos = (callback: (videos: Blob[]) => void) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const getRequest = store.getAll();

      getRequest.onsuccess = () => {
        callback(getRequest.result);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB 불러오기 실패:", e);
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

  const clearAllVideos = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const clearRequest = store.clear();

      // clearRequest.onsuccess = () => {
      //   console.log("나 블롭 다 지워따!! >ㅁ<");
      // };

      clearRequest.onerror = (e) => {
        console.error("IndexedDB 삭제 실패:", e);
      };
    };

    request.onerror = (e) => {
      console.error("IndexedDB 열기 실패:", e);
    };
  };

  return {
    startRecording,
    stopRecording,
    getAllVideos,
    getVideoByExactTime,
    clearAllVideos,
  };
};

export default useRecording;
