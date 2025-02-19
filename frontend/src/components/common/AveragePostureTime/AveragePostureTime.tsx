import AveragePostureTimeGraph from "./AveragePostureTimeGraph";

import * as S from "./AveragePostureTimeStyle";

interface AveragePostureTimeProps {
  data: number[];
  labels: string[];
}

const AveragePostureTime = ({ data, labels }: AveragePostureTimeProps) => (
  <S.AveragePostureTimeContainer>
    <S.Title>시간당 바른 자세 유지 시간</S.Title>

    <S.GraphContainer>
      <AveragePostureTimeGraph data={data} labels={labels} />
    </S.GraphContainer>
  </S.AveragePostureTimeContainer>
);

export default AveragePostureTime;
