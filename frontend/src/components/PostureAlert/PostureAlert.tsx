import { useEffect, useRef, useState } from "react";

import useMeasurementStore from "../../store/useMeasurementStore";
import PostureAlertButton from "../PostureAlertButton/PostureAlertButton";
import PostureAlertList from "../PostureAlertList/PostureAlertList";

import * as S from "./PostureAlertStyle";

const PostureAlert = () => {
  const [isAlertListOpened, setIsAlertListOpened] = useState(false);

  const isFirstRendering = useRef(true);

  const { stream, sessionAlertList, newAlertCount, setNewAlertCount } =
    useMeasurementStore();

  const openAlertList = () => {
    setIsAlertListOpened(true);
  };

  const closeAlertList = () => {
    setIsAlertListOpened(false);
  };

  useEffect(() => {
    if (isFirstRendering.current) {
      isFirstRendering.current = false;

      return;
    }

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
