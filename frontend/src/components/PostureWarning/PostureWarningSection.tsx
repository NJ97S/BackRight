import { useMemo } from "react";
import * as S from "./PostureWarningSectionStyle";

const getColorByCount = (count: number): string => {
  if (count >= 20) return "var(--red)";
  if (count >= 10) return "#FF893A";
  return "var(--gray-300)";
};

const warningData = {
  neck: 20,
  leftShoulder: 12,
  rightShoulder: 27,
  waist: 8,
};

const PostureWarningSection = () => {
  const totalWarnings = useMemo(
    () => Object.values(warningData).reduce((acc, curr) => acc + curr, 0),
    []
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>부위별 자세 경고 횟수</S.Title>
        <S.TotalWarnings>
          총 경고 횟수: <S.WarningCount>{totalWarnings}회</S.WarningCount>
        </S.TotalWarnings>
      </S.Header>

      <S.CardContainer>
        <S.Card>
          <S.CardImage
            src="/src/assets/images/report/neck.svg"
            alt="목 이미지"
          />
          <S.CardCount style={{ color: getColorByCount(warningData.neck) }}>
            {warningData.neck}
          </S.CardCount>
        </S.Card>

        <S.Card>
          <S.CardImage
            src="/src/assets/images/report/leftShoulder.svg"
            alt="왼쪽 어깨 이미지"
          />
          <S.CardCount
            style={{ color: getColorByCount(warningData.leftShoulder) }}
          >
            {warningData.leftShoulder}
          </S.CardCount>
        </S.Card>

        <S.Card>
          <S.CardImage
            src="/src/assets/images/report/rightShoulder.svg"
            alt="오른쪽 어깨 이미지"
          />
          <S.CardCount
            style={{ color: getColorByCount(warningData.rightShoulder) }}
          >
            {warningData.rightShoulder}
          </S.CardCount>
        </S.Card>

        <S.Card>
          <S.CardImage
            src="/src/assets/images/report/waist.svg"
            alt="허리 이미지"
          />
          <S.CardCount style={{ color: getColorByCount(warningData.waist) }}>
            {warningData.waist}
          </S.CardCount>
        </S.Card>
      </S.CardContainer>
    </S.Container>
  );
};

export default PostureWarningSection;
