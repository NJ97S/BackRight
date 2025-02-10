// SessionLogSection.tsx
import { useState, useCallback, memo } from "react";
import { Session, Warning, SessionStatus } from "../../../../types/type";
import { MOCK_SESSION_DATA } from "../../../../constants/constants";
import * as S from "./SessionLogSectionStyle";

// StatusIcon 컴포넌트 - 메모이제이션 적용
const StatusIcon = memo<{ status: SessionStatus }>(({ status }) => {
  if (status === "정상 종료") {
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.6667 3.5L5.25 9.91667L2.33333 7"
          stroke="var(--mint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 5.83333V7M7 9.33333H7.00667M3.85333 11.6667H10.1467C10.8533 11.6667 11.34 10.9733 11.0733 10.3267L7.92667 4.15333C7.66 3.50667 6.34 3.50667 6.07333 4.15333L2.92667 10.3267C2.66 10.9733 3.14667 11.6667 3.85333 11.6667Z"
        stroke="var(--red)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});

StatusIcon.displayName = "StatusIcon";

// 유틸리티 함수
const formatTimeRange = (start: string, end: string) => {
  const formatTime = (time: string) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${formatTime(start)} ~ ${formatTime(end)}`;
};

const formatTime = (isoString: string) => {
  const date = new Date(isoString);

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

// SessionItem 컴포넌트 - 메모이제이션 적용
const SessionItem = memo<{
  session: Session;
  onClick: (session: Session) => void;
}>(({ session, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(session);
  }, [session, onClick]);

  return (
    <S.SessionItem onClick={handleClick}>
      <S.TimelineDot />
      <S.SessionContent>
        <S.SessionHeader>
          <S.SessionTime>
            {formatTimeRange(session.startTime, session.endTime)}
          </S.SessionTime>
          <S.StatusBadge status={session.status}>
            <StatusIcon status={session.status} />
            <span>{session.status}</span>
          </S.StatusBadge>
        </S.SessionHeader>
        <S.WarningCount>경고 {session.warningCount}회</S.WarningCount>
      </S.SessionContent>
    </S.SessionItem>
  );
});

SessionItem.displayName = "SessionItem";

// WarningItem 컴포넌트 - 메모이제이션 적용
const WarningItem = memo<{
  warning: Warning;
  onClick: (warning: Warning) => void;
}>(({ warning, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(warning);
  }, [warning, onClick]);

  return (
    <S.WarningItem onClick={handleClick}>
      <S.WarningTime>{formatTime(warning.timestamp)}</S.WarningTime>
      <S.WarningDescription>{warning.description}</S.WarningDescription>
    </S.WarningItem>
  );
});

WarningItem.displayName = "WarningItem";

// 메인 SessionLogSection 컴포넌트
const SessionLogSection = () => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedWarning, setSelectedWarning] = useState<Warning | null>(null);

  const handleSessionClick = useCallback((session: Session) => {
    setSelectedSession(session);
  }, []);

  const handleWarningClick = useCallback((warning: Warning) => {
    setSelectedWarning(warning);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedSession(null);
    setSelectedWarning(null);
  }, []);

  return (
    <S.Container>
      <S.Title>세션 로그</S.Title>
      <S.SessionList>
        <S.TimelineWrapper sessionCount={MOCK_SESSION_DATA.length}>
          {MOCK_SESSION_DATA.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              onClick={handleSessionClick}
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
                    Warning video at {formatTime(selectedWarning.timestamp)}
                  </div>
                ) : (
                  <div>Select a warning to view the video</div>
                )}
              </S.VideoSection>
              <S.WarningSection>
                <S.WarningTitle>Warnings</S.WarningTitle>
                <S.WarningList>
                  {selectedSession.warnings.map((warning) => (
                    <WarningItem
                      key={warning.id}
                      warning={warning}
                      onClick={handleWarningClick}
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
