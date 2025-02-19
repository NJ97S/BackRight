import React, { useState } from "react";
import { WeeklyReportType } from "../../../types/reportType";
import DistributionBarChart from "../DistributionBarChart/DistributionBarChart";
import useAuthStore from "../../../store/useAuthStore";
import {
  calculateAgeGroup,
  getDistributionMessage,
} from "../../../utils/ageUtils";
import * as S from "./RankingSummaryStyle";

interface RankingSummaryProps {
  report: WeeklyReportType;
}

type DistributionType = "overall" | "ageRange" | "ageRangeGender";

const distributionLabels: Record<DistributionType, string> = {
  overall: "전체",
  ageRange: "연령대",
  ageRangeGender: "연령대/성별",
};

const RankingSummary = ({ report }: RankingSummaryProps) => {
  const { user } = useAuthStore();
  const [selectedDistribution, setSelectedDistribution] =
    useState<DistributionType>("overall");

  if (!user) {
    return null; // 또는 로딩 상태나 에러 처리
  }

  const ageGroup = calculateAgeGroup(user.birthDate);

  const distributionData = {
    overall: report.overallDistribution,
    ageRange: report.ageRangeDistribution,
    ageRangeGender: report.ageRangeGenderDistribution,
  };

  const currentDistribution = distributionData[selectedDistribution];
  const averageMinutes = Math.floor(
    report.dailyProperPoseMinutesPerHours.reduce((acc, curr) => acc + curr, 0) /
      report.dailyProperPoseMinutesPerHours.length
  );

  const rank = Math.round(100 - currentDistribution.groupPercentile);
  const message = getDistributionMessage(
    selectedDistribution,
    rank,
    ageGroup,
    user.gender
  );

  return (
    <S.Container>
      <S.Title>나의 바른 자세 성취도</S.Title>
      <S.ContentWrapper>
        <S.StatisticsContainer>
          <S.CategorySelector>
            {Object.entries(distributionLabels).map(([key, label]) => (
              <S.CategoryButton
                key={key}
                $isSelected={selectedDistribution === key}
                onClick={() => setSelectedDistribution(key as DistributionType)}
              >
                {label}
              </S.CategoryButton>
            ))}
          </S.CategorySelector>
          <S.RankContainer>
            <S.StatisticsText>
              <S.BoldText>{user.nickname}</S.BoldText>님은 100명 중
              <S.HighlightText>{rank}번째</S.HighlightText>예요!
            </S.StatisticsText>
            <S.MessageText>{message}</S.MessageText>
          </S.RankContainer>
          <S.SubText>
            시간당 평균 <S.BoldText>{averageMinutes}분</S.BoldText> 동안 바른
            자세를 유지했어요
          </S.SubText>
        </S.StatisticsContainer>
        <DistributionBarChart
          data={currentDistribution.groupProperPoseTimeDistribution}
          highlightValue={averageMinutes}
        />
      </S.ContentWrapper>
    </S.Container>
  );
};

export default RankingSummary;
