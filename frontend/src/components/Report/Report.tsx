import { useCallback } from "react";

import * as S from "./ReportStyle";

export interface BodyPartWarning {
  id: string;
  name: string;
  count: number;
  imageSrc: string;
  severity: "normal" | "warning" | "danger";
}

const BODY_PARTS: BodyPartWarning[] = [
  {
    id: "neck",
    name: "목",
    count: 20,
    imageSrc: "./src/assets/images/report/neck.svg",
    severity: "danger",
  },
  {
    id: "leftShoulder",
    name: "왼쪽 어깨",
    count: 12,
    imageSrc: "./src/assets/images/report/left-shoulder.svg",
    severity: "warning",
  },
  {
    id: "rightShoulder",
    name: "오른쪽 어깨",
    count: 27,
    imageSrc: "./src/assets/images/report/right-shoulder.svg",
    severity: "danger",
  },
  {
    id: "waist",
    name: "허리",
    count: 8,
    imageSrc: "./src/assets/images/report/waist.svg",
    severity: "normal",
  },
];

interface WarningCardProps {
  data: BodyPartWarning;
}

const WarningCard = ({ data }: WarningCardProps) => (
  <S.Card>
    <S.BodyPartImage src={data.imageSrc} alt={data.name} />
    <S.WarningCount severity={data.severity}>{data.count}</S.WarningCount>
  </S.Card>
);

const Report = () => {
  const totalWarnings = useCallback(
    () => BODY_PARTS.reduce((sum, part) => sum + part.count, 0),
    []
  );

  return (
    <S.ReportContainer>
      <S.Header>
        <S.Title>부위별 자세 경고 횟수</S.Title>
        <S.TotalWarnings>
          <span>총 경고 횟수:</span> <strong>{totalWarnings()}회</strong>
        </S.TotalWarnings>
      </S.Header>
      <S.CardsContainer>
        {BODY_PARTS.map((part) => (
          <WarningCard key={part.id} data={part} />
        ))}
      </S.CardsContainer>
    </S.ReportContainer>
  );
};

export default Report;
