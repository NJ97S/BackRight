import { useEffect, useState } from "react";

import useMeasurementStore from "../../store/useMeasurementStore";
import PostureAlertButton from "../PostureAlertButton/PostureAlertButton";
import PostureAlertList from "../PostureAlertList/PostureAlertList";

import * as S from "./PostureAlertStyle";
import { ReceivedDataType, SessionAlertType } from "../../types/type";

const PostureAlert = () => {
  const [isAlertListOpened, setIsAlertListOpened] = useState(false);
  const [newAlertCount, setNewAlertCount] = useState(0);
  const [sessionAlertList, setSessionAlertList] = useState<SessionAlertType[]>(
    []
  );

  const { stream, receivedData } = useMeasurementStore();

  const openAlertList = () => {
    setIsAlertListOpened(true);
  };

  const closeAlertList = () => {
    setIsAlertListOpened(false);
  };

  const addSessionAlert = (data: ReceivedDataType) => {
    const { startedAt, problemPart, detectionId, videoUrl } = data;

    if (!startedAt || videoUrl === null) return; // TODO: videoUrl 조건 falsy로 수정 필요

    const newAlert: SessionAlertType = {
      startedAt,
      problemPart,
      detectionId,
    };

    setSessionAlertList((prev) => [newAlert, ...prev]);

    setNewAlertCount((prev) => prev + 1);
  };

  useEffect(() => {
    if (!stream) setSessionAlertList([]);
  }, [stream]);

  useEffect(() => {
    if (!receivedData) return;

    addSessionAlert(receivedData);
  }, [receivedData]);

  useEffect(() => {
    if (!isAlertListOpened) setNewAlertCount(0);
  }, [isAlertListOpened]);

  return (
    <S.PostureAlert isStreaming={stream !== null}>
      {isAlertListOpened ? (
        <PostureAlertList
          onClick={closeAlertList}
          sessionAlertList={sessionAlertList}
        />
      ) : (
        <PostureAlertButton
          onClick={openAlertList}
          newAlertCount={newAlertCount}
        />
      )}
    </S.PostureAlert>
  );
};

export default PostureAlert;
