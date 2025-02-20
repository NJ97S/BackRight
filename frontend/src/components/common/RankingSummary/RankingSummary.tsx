import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Histogram from "../Histogram/Histogram";
import useAuthStore from "../../../store/useAuthStore";
import { DistributionType } from "../../../types/reportType";
import getAgeGroup from "../../../utils/getAgeGroup";

import * as S from "./RankingSummaryStyle";

interface RankingSummaryProps {
  distribution: {
    overall: DistributionType;
    ageRange: DistributionType;
    ageRangeGender: DistributionType;
  };
  averagePoseDuration: number;
}

const rankingTypes = ["overall", "ageRange", "ageRangeGender"] as const;

const RankingSummary = ({
  distribution,
  averagePoseDuration,
}: RankingSummaryProps) => {
  const { user } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!user) return null;

  const currentType = rankingTypes[currentIndex];
  const currentDistribution = distribution[currentType];

  const gender = user?.gender === "MALE" ? "남성" : "여성";

  const getRange = () => {
    switch (currentType) {
      case "overall":
        return "전체";
      case "ageRange":
        return getAgeGroup(user.birthDate);
      case "ageRangeGender":
        return `${getAgeGroup(user.birthDate)} ${gender}`;
      default:
        return null;
    }
  };

  const { modeValue, minuteIndex } = currentDistribution.groupBinCounts.reduce(
    (acc, value, index) => {
      if (value > acc.modeValue) {
        return { modeValue: value, minuteIndex: index };
      }
      return acc;
    },
    { modeValue: -Infinity, minuteIndex: -1 }
  );

  const diffTime = averagePoseDuration - minuteIndex;
  const diffText = diffTime > 0 ? "많습니다" : "적습니다";

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % rankingTypes.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + rankingTypes.length) % rankingTypes.length
    );
  };

  return (
    <S.RankingSummaryContainer>
      <S.Title>나는 상위 몇 % 일까?</S.Title>

      <S.PrevButton onClick={prevSlide}>{"<"}</S.PrevButton>
      <S.NextButton onClick={nextSlide}>{">"}</S.NextButton>

      <S.CarouselContainer>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentType}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <S.ContentContainer>
              <S.DescriptionContainer>
                <S.Description>
                  <b>{user?.name}</b> 님은 상위{" "}
                  <S.MyPercent>
                    {(100 - currentDistribution.groupPercentile).toFixed(2)}%
                  </S.MyPercent>
                  입니다.
                </S.Description>
                <S.Description>
                  <b>{user?.name}</b> 님의 평균 자세 유지 시간은{" "}
                  <b>{averagePoseDuration}분</b>으로,
                  <br />
                  <b>{getRange()}</b>의 최빈값인 <b>{minuteIndex}분</b>보다{" "}
                  <span>{diffTime}분</span> {diffText}
                </S.Description>
              </S.DescriptionContainer>
              <Histogram
                distribution={currentDistribution}
                modeFromBinCounts={modeValue}
                averagePoseDuration={averagePoseDuration}
              />
            </S.ContentContainer>
          </motion.div>
        </AnimatePresence>
      </S.CarouselContainer>
    </S.RankingSummaryContainer>
  );
};

export default RankingSummary;
