import { DailyReportType } from "../../types/reportType";
import ComparisonBarChart from "../common/ComparisonBarChart/ComparisonBarChart";
import DoughnutGraph from "../common/DoughnutGraph/DoughnutGraph";
import Loading from "../common/Loading/Loading";

import * as S from "./DailyStatisticStyle";

interface DailyStatisticProps {
  dailyReport: DailyReportType | null;
}

const DailyStatistic = ({ dailyReport }: DailyStatisticProps) => (
  <S.DailyStatisticContainer>
    {dailyReport ? (
      <>
        <S.Title>일일 통계</S.Title>
        <S.GraphContainer>
          <DoughnutGraph
            totalDuration={dailyReport.dailyStat.totalDuration}
            properPoseDuration={dailyReport.dailyStat.properPoseDuration}
          />
          <S.Divider />
          {dailyReport.previousDailyStat ? (
            <ComparisonBarChart
              current={dailyReport.dailyStat.properPoseDuration}
              previous={dailyReport.previousDailyStat.properPoseDuration}
            />
          ) : (
            <S.NoPreviousGraph>NO DATA</S.NoPreviousGraph>
          )}
        </S.GraphContainer>
      </>
    ) : (
      <Loading backgroundColor="white">NO DATA</Loading>
    )}
  </S.DailyStatisticContainer>
);

export default DailyStatistic;
