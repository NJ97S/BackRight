import { useEffect, useState } from "react";

import useMeasurementStore from "../../store/useMeasurementStore";
import PostureAlertButton from "../PostureAlertButton/PostureAlertButton";
import PostureAlertList from "../PostureAlertList/PostureAlertList";

import { ReceivedDataType, SessionAlertType } from "../../types/type";

import * as S from "./PostureAlertStyle";

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
    const { startedAt, problemPart, detectionId, videoPreSignedUrl } = data;

    if (!startedAt || !videoPreSignedUrl) return;

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
