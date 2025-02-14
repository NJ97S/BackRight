import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import ProgressBar from "../ProgressBar/ProgressBar";
import STANDARD_POSE_GUIDE from "../../constants/standardPoseGuide";

import * as S from "./StandardPoseGuideStyle";

import arrowIcon from "../../assets/icons/arrow-in-circle.svg";

interface StandardPoseGuideProps {
  onClick: () => void;
}

const StandardPoseGuide = ({ onClick }: StandardPoseGuideProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);

  const handlePreviousButtonClick = () => {
    if (step === 0) return;

    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleNextButtonClick = () => {
    if (step >= STANDARD_POSE_GUIDE.length - 1) return;

    setDirection(1);
    setStep((prev) => prev + 1);
  };

  return (
    <S.StandardPoseGuideContainer>
      <S.PreviousButton
        onClick={handlePreviousButtonClick}
        src={arrowIcon}
        alt="화살표"
        $isDisplayed={step > 0}
      />

      <S.ContentContainer>
        <ProgressBar step={step} totalSteps={STANDARD_POSE_GUIDE.length} />

        <S.ContentTitle>
          바른 자세의 기준은 다음과 같아요
          <span>아래의 가이드를 참고해주세요</span>
        </S.ContentTitle>

        <S.SlideContainer>
          <AnimatePresence mode="wait">
            <S.Slide
              key={step}
              initial={{ x: direction * 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -100, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <S.SlideImageContainer>
                <S.SlideImage
                  src={STANDARD_POSE_GUIDE[step].src}
                  alt="가이드"
                />
              </S.SlideImageContainer>
              <S.SlideDescription>
                {STANDARD_POSE_GUIDE[step].description}
              </S.SlideDescription>
            </S.Slide>
          </AnimatePresence>
        </S.SlideContainer>
      </S.ContentContainer>

      <S.NextButton
        onClick={handleNextButtonClick}
        src={arrowIcon}
        alt="화살표"
        $isDisplayed={step < STANDARD_POSE_GUIDE.length - 1}
      />

      <S.CloseButton type="button" onClick={onClick}>
        돌아가기
      </S.CloseButton>
    </S.StandardPoseGuideContainer>
  );
};

export default StandardPoseGuide;
