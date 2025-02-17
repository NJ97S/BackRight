import * as S from "./ProgressBarStyle";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <S.ProgressBarContainer>
      <S.ProgressBar $progress={progress} />
    </S.ProgressBarContainer>
  );
};

export default ProgressBar;
