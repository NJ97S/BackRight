import BODY_PARTS from "../../../constants/bodyParts";
import { DetectionCountStatType } from "../../../types/reportType";
import Loading from "../Loading/Loading";
import * as S from "./PostureWarningSummaryStyle";

interface PostureWarningSummaryProps {
  detectionCountStat?: DetectionCountStatType;
}

const PostureWarningSummary = ({
  detectionCountStat,
}: PostureWarningSummaryProps) => (
  <S.PostureWarningSummaryContainer>
    {detectionCountStat ? (
      <>
        <S.Title>
          부위별 자세 경고 횟수
          <S.ToTalAlertCount>
            총 경고 횟수: <span>{detectionCountStat.totalDetection}회</span>
          </S.ToTalAlertCount>
        </S.Title>

        <S.BodyPartList>
          {BODY_PARTS.map(({ key, label, image }) => (
            <S.BodyPart key={key}>
              <S.BodyPartImage src={image} alt={label} />
              <S.BodyPartAlertCount $count={detectionCountStat.counts[key]}>
                {detectionCountStat.counts[key] ?? 0}
              </S.BodyPartAlertCount>
            </S.BodyPart>
          ))}
        </S.BodyPartList>
      </>
    ) : (
      <Loading backgroundColor="white">NO DATA</Loading>
    )}
  </S.PostureWarningSummaryContainer>
);

export default PostureWarningSummary;
