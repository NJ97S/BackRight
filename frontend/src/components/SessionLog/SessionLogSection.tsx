import { useState, useCallback } from "react";
import type { LocalSession, LocalWarning, SessionStatus } from "../../types";
import SESSION_DATA from "../../mocks/sessionMocks";
import {
  convertISOToTimeString,
  convertISOToTimeRangeString,
} from "../../utils/timeFormatUtils";
import * as S from "./SessionLogSectionStyle";

const StatusIcon = ({ status }: { status: SessionStatus }) => (
  <S.Icon
    src={
      status === "정상 종료"
        ? "/src/assets/icons/normal-end.svg"
        : "/src/assets/icons/force-end.svg"
    }
    alt={status}
  />
);

interface SessionItemProps {
  session: LocalSession;
  onSelect: (session: LocalSession) => void;
}

const SessionItem = ({ session, onSelect }: SessionItemProps) => (
  <S.SessionItem onClick={() => onSelect(session)}>
    <S.TimelineDot />
    <S.SessionContent>
      <S.SessionHeader>
        <S.SessionTime>
          {convertISOToTimeRangeString(session.startTime, session.endTime)}
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

interface WarningItemProps {
  warning: LocalWarning;
  onSelect: (warning: LocalWarning) => void;
}

const WarningItem = ({ warning, onSelect }: WarningItemProps) => (
  <S.WarningItem onClick={() => onSelect(warning)}>
    <S.WarningTime>{convertISOToTimeString(warning.timestamp)}</S.WarningTime>
    <S.WarningDescription>{warning.description}</S.WarningDescription>
  </S.WarningItem>
);

interface VideoSectionProps {
  selectedWarning: LocalWarning | null;
}

const VideoSection = ({ selectedWarning }: VideoSectionProps) => (
  <S.VideoSection>
    {selectedWarning ? (
      <div>
        Warning video at {convertISOToTimeString(selectedWarning.timestamp)}
      </div>
    ) : (
      <div>Select a warning to view the video</div>
    )}
  </S.VideoSection>
);

const SessionLogSection = () => {
  const [selectedSession, setSelectedSession] = useState<LocalSession | null>(
    null
  );
  const [selectedWarning, setSelectedWarning] = useState<LocalWarning | null>(
    null
  );

  const handleCloseModal = useCallback(() => {
    setSelectedSession(null);
    setSelectedWarning(null);
  }, []);

  return (
    <S.Container>
      <S.Title>세션 로그</S.Title>
      <S.SessionList>
        <S.TimelineWrapper sessionCount={SESSION_DATA.length}>
          {SESSION_DATA.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              onSelect={setSelectedSession}
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
              <VideoSection selectedWarning={selectedWarning} />
              <S.WarningSection>
                <S.WarningTitle>Warnings</S.WarningTitle>
                <S.WarningList>
                  {selectedSession.warnings.map((warning) => (
                    <WarningItem
                      key={warning.id}
                      warning={warning}
                      onSelect={setSelectedWarning}
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
