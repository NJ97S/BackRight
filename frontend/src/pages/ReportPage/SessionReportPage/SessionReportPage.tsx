import { SessionType } from "../../../types/reportType";
import BODY_PARTS from "../../../constants/bodyParts";
import DoughnutGraph from "../../../components/common/DoughnutGraph/DoughnutGraph";
import * as S from "./SessionReportPageStyle";

interface SessionReportProps {
  session: SessionType;
  onClose: () => void;
}

const SessionReport = ({ session, onClose }: SessionReportProps) => {
  return (
    <S.SessionReportContainer>
      <S.Header>
        <S.TitleWrapper>
          <S.Title>세션 보고서</S.Title>
        </S.TitleWrapper>
        <S.CloseButton onClick={onClose}>×</S.CloseButton>
      </S.Header>

      <S.TimeInfoCard>
        <S.TimeInfoGrid>
          <S.TimeInfoItem>
            <S.TimeLabel>측정 시작 시간</S.TimeLabel>
            <S.TimeValue>
              {new Date(session.startedAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.TimeValue>
          </S.TimeInfoItem>
          <S.TimeInfoItem>
            <S.TimeLabel>측정 유지 시간</S.TimeLabel>
            <S.TimeValue>{session.sessionStat.sessionDuration}분</S.TimeValue>
          </S.TimeInfoItem>
          <S.TimeInfoItem>
            <S.TimeLabel>측정 종료 시간</S.TimeLabel>
            <S.TimeValue>
              {new Date(session.endedAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </S.TimeValue>
          </S.TimeInfoItem>
        </S.TimeInfoGrid>
      </S.TimeInfoCard>

      <S.GraphContainer>
        <S.GraphItem>
          <S.SemiTitle>부위 별 자세 경고 횟수</S.SemiTitle>
          <S.BodyPartList>
            {BODY_PARTS.map(({ key, label, image }) => (
              <S.BodyPart key={key}>
                <S.BodyPartImage src={image} alt={label} />
                <S.BodyPartAlertCount
                  $count={session.detectionStat.counts[key]}
                >
                  {session.detectionStat.counts[key] ?? 0}
                </S.BodyPartAlertCount>
              </S.BodyPart>
            ))}
          </S.BodyPartList>
        </S.GraphItem>
        <S.GraphItem>
          <DoughnutGraph
            totalDuration={session.sessionStat.sessionDuration}
            properPoseDuration={session.sessionStat.properPoseDuration}
          />
        </S.GraphItem>
      </S.GraphContainer>

      <S.AlertHistoryCard>
        <S.SemiTitle>자세 경고 내역</S.SemiTitle>
      </S.AlertHistoryCard>
    </S.SessionReportContainer>
  );
};

export default SessionReport;
