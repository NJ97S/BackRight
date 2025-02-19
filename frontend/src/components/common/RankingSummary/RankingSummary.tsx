import { WeeklyReportType, MonthlyReportType } from "../../../types/reportType";
import DistributionBarChart from "../DistributionBarChart/DistributionBarChart";
import * as S from "./RankingSummaryStyle";

interface RankingSummaryProps {
  report: WeeklyReportType | MonthlyReportType;
}

const RankingSummary = ({ report }: RankingSummaryProps) => {
  const {
    ageGroupPercentile,
    ageGroupPostureTimeDistribution,
    userAgeGroup,
    ageGroupAverageTime,
    userName,
  } = report;

  const properPostureMinutes =
    "weeklyProperPostureMinutesPerHours" in report
      ? report.weeklyProperPostureMinutesPerHours
      : report.dailyProperPostureMinutesPerHours;

  const averageMinutes = Math.floor(
    properPostureMinutes.reduce((acc, curr) => acc + curr, 0) /
      properPostureMinutes.length
  );

  const chartData = ageGroupPostureTimeDistribution.map((count, index) => ({
    minute: index,
    count,
    fill: "var(--gray-100)",
  }));

  return (
    <S.Container>
      <S.Title>나는 상위 몇 % 일까?</S.Title>
      <S.ContentWrapper>
        <S.StatisticsContainer>
          <S.StatisticsText>
            <S.BoldText>{userName}</S.BoldText>님은 상위{" "}
            <S.HighlightText>{ageGroupPercentile}%</S.HighlightText> 입니다.
          </S.StatisticsText>
          <S.SubText>
            <S.BoldText>{userName}</S.BoldText> 님의 시간당 바른 자세(분)은{" "}
            <S.BoldText>{averageMinutes}분</S.BoldText>으로,
            <br />
            <S.BoldText>{userAgeGroup}</S.BoldText>의 평균인{" "}
            <S.BoldText>{ageGroupAverageTime}분</S.BoldText>
            {(() => {
              const difference = averageMinutes - ageGroupAverageTime;

              if (difference > 0) {
                return (
                  <>
                    보다 <S.MintText>{difference}분</S.MintText> 많습니다.
                  </>
                );
              }
              if (difference < 0) {
                return (
                  <>
                    보다 <S.MintText>{Math.abs(difference)}분</S.MintText>{" "}
                    적습니다.
                  </>
                );
              }
              return "과 같습니다.";
            })()}
          </S.SubText>
        </S.StatisticsContainer>
        <DistributionBarChart
          data={chartData}
          highlightValue={averageMinutes}
        />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default RankingSummary;
