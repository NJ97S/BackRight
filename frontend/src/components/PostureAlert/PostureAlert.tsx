import { useState } from "react";

import useMeasurementStore from "../../store/useMeasurementStore";
import PostureAlertButton from "../PostureAlertButton/PostureAlertButton";
import PostureAlertList from "../PostureAlertList/PostureAlertList";

import * as S from "./PostureAlertStyle";

const PostureAlert = () => {
  const [isAlertListOpened, setIsAlertListOpened] = useState(false);

  const { stream } = useMeasurementStore();

  const openAlertList = () => {
    setIsAlertListOpened(true);
  };

  const closeAlertList = () => {
    setIsAlertListOpened(false);
  };

  return (
    <S.PostureAlert isStreaming={stream !== null}>
      {isAlertListOpened ? (
        <PostureAlertList onClick={closeAlertList} />
      ) : (
        <PostureAlertButton onClick={openAlertList} />
      )}
    </S.PostureAlert>
  );
};

export default PostureAlert;
