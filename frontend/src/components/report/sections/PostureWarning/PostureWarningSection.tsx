// PostureWarningSection.tsx
import { useMemo } from "react";
import * as S from "./PostureWarningSectionStyle";

// 경고 횟수에 따른 색상 결정 함수
const getColorByCount = (count: number): string => {
  if (count >= 20) return "var(--red)";
  if (count >= 10) return "#FF893A";
  return "var(--gray-300)";
};

// 더미 데이터
const warningData = {
  neck: 20,
  leftShoulder: 12,
  rightShoulder: 27,
  waist: 8,
};

const PostureWarningSection = () => {
  // 총 경고 횟수 계산
  const totalWarnings = useMemo(
    () => Object.values(warningData).reduce((acc, curr) => acc + curr, 0),
    []
  );

  return (
    <S.Container>
      {/* 헤더 섹션 */}
      <S.Header>
        <S.Title>부위별 자세 경고 횟수</S.Title>
        <S.TotalWarnings>
          총 경고 횟수: <S.WarningCount>{totalWarnings}회</S.WarningCount>
        </S.TotalWarnings>
      </S.Header>

      {/* 카드 섹션 */}
      <S.CardContainer>
        {/* 목 */}
        <S.Card>
          <S.CardImage
            src="/src/assets/images/report/neck.svg"
            alt="목 이미지"
          />
          <S.CardCount style={{ color: getColorByCount(warningData.neck) }}>
            {warningData.neck}
          </S.CardCount>
        </S.Card>

        {/* 왼쪽 어깨 */}
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

        {/* 오른쪽 어깨 */}
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

        {/* 허리 */}
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
