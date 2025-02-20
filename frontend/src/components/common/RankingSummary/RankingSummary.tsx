import useAuthStore from "../../../store/useAuthStore";
import { DistributionType } from "../../../types/reportType";
import getAgeGroup from "../../../utils/getAgeGroup";
import Histogram from "../Histogram/Histogram";

import * as S from "./RankingSummaryStyle";

interface RankingSummaryProps {
  distribution: DistributionType;
  averagePoseDuration: number;
  type: "OVERALL" | "AGE" | "AGE-GENDER";
}

const RankingSummary = ({
  distribution,
  averagePoseDuration,
  type,
}: RankingSummaryProps) => {
  const { user } = useAuthStore();

  const gender = user?.gender === "MALE" ? "남성" : "여성";

  const { modeValue, minuteIndex } = distribution.groupBinCounts.reduce(
    (acc, value, index) => {
      if (value > acc.modeValue) {
        return { modeValue: value, minuteIndex: index };
      }
      return acc;
    },
    { modeValue: -Infinity, minuteIndex: -1 }
  );

  if (!user) return null;

  return (
    <S.RankingSummaryContainer>
      <S.Title>나는 상위 몇 % 일까?</S.Title>

      <S.ContentContainer>
        <S.DescriptionContainer>
          <S.Description>
            <b>{user?.name}</b> 님은 상위{" "}
            <S.MyPercent>
              {(100 - distribution.groupPercentile).toFixed(2)}%
            </S.MyPercent>
            입니다.
          </S.Description>
          <S.Description>
            <b>{user?.name}</b> 님의 평균 자세 유지 시간은{" "}
            <b>{averagePoseDuration}분</b>으로,
            <br />
            <b>
              {type === "OVERALL" ? "전체" : getAgeGroup(user.birthDate)}{" "}
              {type === "AGE-GENDER" ? gender : ""}
            </b>
            의 최빈값인 <b>{minuteIndex}분</b>
            {averagePoseDuration > minuteIndex ? (
              <>
                보다 <span>{averagePoseDuration - minuteIndex}분</span>{" "}
                높습니다.
              </>
            ) : averagePoseDuration < minuteIndex ? (
              <>
                보다 <span>{minuteIndex - averagePoseDuration}분</span>{" "}
                낮습니다.
              </>
            ) : (
              <>과 같습니다.</>
            )}
          </S.Description>
        </S.DescriptionContainer>
        <Histogram
          distribution={distribution}
          modeFromBinCounts={modeValue}
          averagePoseDuration={averagePoseDuration}
        />
      </S.ContentContainer>
    </S.RankingSummaryContainer>
  );
};

export default RankingSummary;
