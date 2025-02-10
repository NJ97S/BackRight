import * as S from "./PostureAlertListStyle";

import closeIcon from "../../assets/icons/close.svg";

interface PostureAlertListProps {
  onClick: () => void;
}

const PostureAlertList = ({ onClick }: PostureAlertListProps) => (
  <S.PostureAlertListContainer>
    <S.Title>자세 경고 내역</S.Title>
    <S.CloseIcon onClick={onClick} src={closeIcon} alt="닫기" />

    <S.PostureAlertContainer>
      <S.TimeLine />

      <S.PostureAlertList>
        <S.PostureAlert>
          <S.TimeCircle />
          <S.PostureAlertDetail>
            <S.AlertTime>22:10</S.AlertTime>
            <S.AlertPart>목, 왼쪽 어깨, 오른쪽 어깨, 허리</S.AlertPart>
          </S.PostureAlertDetail>
        </S.PostureAlert>

        <S.PostureAlert>
          <S.TimeCircle />
          <S.PostureAlertDetail>
            <S.AlertTime>22:10</S.AlertTime>
            <S.AlertPart>목, 왼쪽 어깨, 오른쪽 어깨, 허리</S.AlertPart>
          </S.PostureAlertDetail>
        </S.PostureAlert>
      </S.PostureAlertList>
    </S.PostureAlertContainer>
  </S.PostureAlertListContainer>
);

export default PostureAlertList;
