import type React from "react";
import { convertMinutesToTimeString } from "../../utils/timeFormatUtils";
import { CHART_COLORS } from "../../constants/reportConstants";
import DonutChart from "../common/charts/DonutChart";
import BarChart from "../common/charts/BarChart";
import * as S from "./DailyStatsSectionStyle";

const DailyStatsSection: React.FC = () => {
  const todayMinutes = 292;
  const yesterdayMinutes = 77;
  const totalMinutes = 390;
  const diffMinutes = todayMinutes - yesterdayMinutes;

  return (
    <S.Container>
      <S.Title>일일 통계</S.Title>
      <S.Content>
        {/* 도넛 차트 영역 */}
        <DonutChart
          data={[todayMinutes, totalMinutes - todayMinutes]}
          colors={[CHART_COLORS.PRIMARY, CHART_COLORS.SECONDARY]}
          centerLabel={convertMinutesToTimeString(todayMinutes)}
        />

        {/* 막대 차트 영역 */}
        <BarChart
          data={[yesterdayMinutes, todayMinutes]}
          labels={["1일 전", "오늘"]}
          colors={[CHART_COLORS.SECONDARY, CHART_COLORS.PRIMARY]}
          formatLabel={convertMinutesToTimeString}
          maxValue={todayMinutes}
        />

        {/* 도넛 차트 설명 */}
        <S.Description>
          <S.DescriptionTitle>
            {convertMinutesToTimeString(totalMinutes)} 중
          </S.DescriptionTitle>
          <S.DescriptionText>
            <S.HighlightText>
              {convertMinutesToTimeString(todayMinutes)}
            </S.HighlightText>{" "}
            동안 정자세를 유지했어요.
          </S.DescriptionText>
        </S.Description>

        {/* 막대 차트 설명 */}
        <S.Description>
          <S.DescriptionTitle>1일 전과 비교했을 때</S.DescriptionTitle>
          <S.DescriptionText>
            <S.HighlightText>
              {convertMinutesToTimeString(diffMinutes)}
            </S.HighlightText>{" "}
            더 많이 정자세를 유지했어요.
          </S.DescriptionText>
        </S.Description>
      </S.Content>
    </S.Container>
  );
};

export default DailyStatsSection;
