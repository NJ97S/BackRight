import { useMemo } from "react";
import WARNING_ITEMS from "../../constants/warningConstants";
import * as S from "./PostureWarningSectionStyle";

const PostureWarningSection = () => {
  const totalWarnings = useMemo(
    () => WARNING_ITEMS.reduce((acc, item) => acc + item.count, 0),
    []
  );

  return (
    <S.Container>
      <S.HeaderWrapper>
        <S.Title>부위별 자세 경고 횟수</S.Title>
        <S.TotalWarnings>
          총 경고 횟수: <S.WarningCount>{totalWarnings}회</S.WarningCount>
        </S.TotalWarnings>
      </S.HeaderWrapper>
      <S.CardContainer>
        {WARNING_ITEMS.map(({ key, label, count, image }) => (
          <S.Card key={key}>
            <S.CardImage src={image} alt={`${label} 이미지`} />
            <S.CardCount count={count}>{count}</S.CardCount>
          </S.Card>
        ))}
      </S.CardContainer>
    </S.Container>
  );
};

export default PostureWarningSection;
