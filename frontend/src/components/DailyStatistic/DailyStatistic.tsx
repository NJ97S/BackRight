import { DailyStatType } from "../../types/reportType";
import ComparisonBarChart from "../common/ComparisonBarChart/ComparisonBarChart";
import DoughnutGraph from "../common/DoughnutGraph/DoughnutGraph";
import * as S from "./DailyStatisticStyle";

interface DailyStatisticProps {
  dailyStat: DailyStatType;
  previousDailyStat: DailyStatType | null;
}

const DailyStatistic = ({
  dailyStat,
  previousDailyStat,
}: DailyStatisticProps) => (
  <S.DailyStatisticContainer>
    <S.Title>일일 통계</S.Title>

    <S.GraphContainer>
      <DoughnutGraph
        totalDuration={dailyStat.totalDuration}
        properPoseDuration={dailyStat.properPoseDuration}
      />
      <S.Divider />
      {previousDailyStat && (
        <ComparisonBarChart
          current={dailyStat.properPoseDuration}
          previous={previousDailyStat?.properPoseDuration}
        />
      )}
    </S.GraphContainer>
  </S.DailyStatisticContainer>
);

export default DailyStatistic;
