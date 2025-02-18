import useSelectedPostureAlertStore from "../../store/useSelectedPostureAlertStore";
import { SessionAlertType } from "../../types/type";
import formatAlertTime from "../../utils/formatAlertTime";
import getProblemPart from "../../utils/getProblemBodyPart";

import * as S from "./PostureAlertDetailStyle";

interface PostureAlertDetailProps {
  sessionAlert: SessionAlertType;
}

const PostureAlertDetail = ({ sessionAlert }: PostureAlertDetailProps) => {
  const { setSelectedDetectionId, setProblemPart } =
    useSelectedPostureAlertStore();

  const handleAlertClick = () => {
    setSelectedDetectionId(sessionAlert.detectionId);
    setProblemPart(sessionAlert.problemPart);
  };

  return (
    <S.PostureAlertDetailContainer onClick={handleAlertClick}>
      <S.TimeCircle />
      <S.PostureAlertDetail>
        <S.AlertTime>{formatAlertTime(sessionAlert.startedAt)}</S.AlertTime>
        <S.AlertPart>{getProblemPart(sessionAlert.problemPart)}</S.AlertPart>
      </S.PostureAlertDetail>
    </S.PostureAlertDetailContainer>
  );
};

export default PostureAlertDetail;
