import AveragePostureTimeGraph from "./AveragePostureTimeGraph";

import * as S from "./AveragePostureTimeStyle";

interface AveragePostureTimeProps {
  dailyProperPostureMinutesPerHours: number[];
}

const AveragePostureTime = ({
  dailyProperPostureMinutesPerHours,
}: AveragePostureTimeProps) => (
  <S.AveragePostureTimeContainer>
    <S.Title>시간당 평균 자세 유지 시간</S.Title>

    <S.GraphContainer>
      <AveragePostureTimeGraph data={dailyProperPostureMinutesPerHours} />
    </S.GraphContainer>
  </S.AveragePostureTimeContainer>
);

export default AveragePostureTime;
