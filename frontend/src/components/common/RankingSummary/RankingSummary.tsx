import MOCK_DATA from "../../../pages/ReportPage/MonthlyReportPage/mockData";
import useAuthStore from "../../../store/useAuthStore";
import getAgeGroup from "../../../utils/getAgeGroup";
import Histogram from "../Histogram/Histogram";

import * as S from "./RankingSummaryStyle";

const { overallDistribution } = MOCK_DATA;

const RankingSummary = () => {
  const { user } = useAuthStore();

  const getAverageTime = () => {
    const userValue =
      overallDistribution.groupProperPoseTimeDistribution[
        overallDistribution.groupPercentile
      ];

    return Math.round(userValue.upperBound - userValue.lowerBound);
  };

  const gender = user?.gender === "MALE" ? "남성" : "여성";

  if (!user) return null;

  return (
    <S.RankingSummaryContainer>
      <S.Title>나는 상위 몇 % 일까?</S.Title>

      <S.ContentContainer>
        <S.DescriptionContainer>
          <S.Description>
            <b>{user?.name}</b> 님은 상위{" "}
            <S.MyPercent>{overallDistribution.groupPercentile}%</S.MyPercent>
            입니다.
          </S.Description>
          <S.Description>
            <b>{user?.name}</b> 님의 평균 자세 유지 시간은{" "}
            <b>{getAverageTime()}분</b>으로,
            <br />
            <b>
              {getAgeGroup(user.birthDate)} {gender}
            </b>
            의 평균인 <b>27분</b>보다 <span>29분</span> 많습니다.
          </S.Description>
        </S.DescriptionContainer>
        <Histogram distribution={overallDistribution} />
      </S.ContentContainer>
    </S.RankingSummaryContainer>
  );
};

export default RankingSummary;
