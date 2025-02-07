// SessionLogSection.tsx

import * as S from "./SessionLogSectionStyle";

// 세션 상태를 정의하는 타입
type SessionStatus = "정상 종료" | "강제 종료";

// 세션 데이터의 인터페이스 정의
interface SessionData {
  id: number;
  time: string;
  warningCount: number;
  status: SessionStatus;
}

// 상태 아이콘 컴포넌트
const StatusIcon = ({ status }: { status: SessionStatus }) => {
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
};

// 임시 더미 데이터
const MOCK_SESSION_DATA: SessionData[] = [
  { id: 1, time: "22:10 ~ 23:58", warningCount: 12, status: "정상 종료" },
  { id: 2, time: "19:03 ~ 19:28", warningCount: 7, status: "강제 종료" },
  { id: 3, time: "15:51 ~ 16:30", warningCount: 20, status: "정상 종료" },
  { id: 4, time: "10:20 ~ 12:01", warningCount: 34, status: "정상 종료" },
  { id: 5, time: "08:00 ~ 09:10", warningCount: 12, status: "정상 종료" },
];

const SessionLogSection = () => {
  return (
    <S.Container>
      <S.Title>세션 로그</S.Title>
      <S.SessionList>
        {/* Timeline 세로선 */}
        <S.Timeline />

        {/* 세션 목록 */}
        {MOCK_SESSION_DATA.map((session) => (
          <S.SessionItem key={session.id}>
            {/* Timeline 점 */}
            <S.TimelineDot />

            <S.SessionContent>
              {/* 시간과 상태 뱃지 */}
              <S.SessionHeader>
                <S.SessionTime>{session.time}</S.SessionTime>
                <S.StatusBadge status={session.status}>
                  <StatusIcon status={session.status} />
                  <span>{session.status}</span>
                </S.StatusBadge>
              </S.SessionHeader>

              {/* 경고 횟수 */}
              <S.WarningCount>경고 {session.warningCount}회</S.WarningCount>
            </S.SessionContent>
          </S.SessionItem>
        ))}
      </S.SessionList>
    </S.Container>
  );
};

export default SessionLogSection;
