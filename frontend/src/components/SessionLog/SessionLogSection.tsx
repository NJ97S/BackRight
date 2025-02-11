import { useState } from "react";
import { Session, Warning, SessionStatus } from "../../types/type";
import MOCK_SESSION_DATA from "../../constants/mockData";
import {
  convertISOToTimeString,
  convertISOToTimeRangeString,
} from "../../utils/timeFormatUtils";
import * as S from "./SessionLogSectionStyle";

import normalEndIcon from "../../assets/icons/normal-end.svg";
import forceEndIcon from "../../assets/icons/force-end.svg";

const StatusIcon = ({ status }: { status: SessionStatus }) => {
  const iconSrc = status === "정상 종료" ? normalEndIcon : forceEndIcon;

  return <S.Icon src={iconSrc} alt={status} />;
};

const SessionItem = ({
  sessionData,
  onClick,
}: {
  sessionData: Session;
  onClick: (session: Session) => void;
}) => (
  <S.SessionItem onClick={() => onClick(sessionData)}>
    <S.TimelineDot />
    <S.SessionContent>
      <S.SessionHeader>
        <S.SessionTime>
          {convertISOToTimeRangeString(
            sessionData.startTime,
            sessionData.endTime
          )}
        </S.SessionTime>
        <S.StatusBadge status={sessionData.status}>
          <StatusIcon status={sessionData.status} />
          <span>{sessionData.status}</span>
        </S.StatusBadge>
      </S.SessionHeader>
      <S.WarningCount>경고 {sessionData.warningCount}회</S.WarningCount>
    </S.SessionContent>
  </S.SessionItem>
);

const WarningItem = ({
  warningData,
  onClick,
}: {
  warningData: Warning;
  onClick: (warning: Warning) => void;
}) => (
  <S.WarningItem onClick={() => onClick(warningData)}>
    <S.WarningTime>
      {convertISOToTimeString(warningData.timestamp)}
    </S.WarningTime>
    <S.WarningDescription>{warningData.description}</S.WarningDescription>
  </S.WarningItem>
);

const SessionLogSection = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);

  const handleCloseModal = () => {
    setSelectedSession(null);
    setSelectedWarning(null);
  };

  return (
    <S.Container>
      <S.Title>세션 로그</S.Title>
      <S.SessionList>
        <S.TimelineWrapper sessionCount={MOCK_SESSION_DATA.length}>
          {MOCK_SESSION_DATA.map((currentSession: Session) => (
            <SessionItem
              key={currentSession.id}
              sessionData={currentSession}
              onClick={setSelectedSession}
            />
          ))}
        </S.TimelineWrapper>
      </S.SessionList>

      {selectedSession && (
        <S.Modal>
          <S.ModalOverlay onClick={handleCloseModal} />
          <S.ModalContent>
            <S.CloseButton onClick={handleCloseModal}>&times;</S.CloseButton>
            <S.ModalBody>
              <S.VideoSection>
                {selectedWarning ? (
                  <div>
                    Warning video at{" "}
                    {convertISOToTimeString(selectedWarning.timestamp)}
                  </div>
                ) : (
                  <div>Select a warning to view the video</div>
                )}
              </S.VideoSection>
              <S.WarningSection>
                <S.WarningTitle>Warnings</S.WarningTitle>
                <S.WarningList>
                  {selectedSession.warnings.map((currentWarning) => (
                    <WarningItem
                      key={currentWarning.id}
                      warningData={currentWarning}
                      onClick={setSelectedWarning}
                    />
                  ))}
                </S.WarningList>
              </S.WarningSection>
            </S.ModalBody>
          </S.ModalContent>
        </S.Modal>
      )}
    </S.Container>
  );
};

export default SessionLogSection;
