import { useState } from "react";

import * as S from "./PostureAlertButtonStyle";

import listIcon from "../../assets/icons/list.svg";

interface PostureAlertButtonProps {
  onClick: () => void;
}

const PostureAlertButton = ({ onClick }: PostureAlertButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAlertButtonMouseEnter = () => {
    setIsHovered(true);
  };

  const handleAlertButtonMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <S.AlertStatusContainer isHovered={isHovered}>
        <S.StatusMessage>미확인 경고 내역이 없습니다.</S.StatusMessage>
        <S.Triangle />
      </S.AlertStatusContainer>

      <S.PostureAlertButton
        onClick={onClick}
        onMouseEnter={handleAlertButtonMouseEnter}
        onMouseLeave={handleAlertButtonMouseLeave}
      >
        <S.ListIcon src={listIcon} alt="경고목록" />
      </S.PostureAlertButton>
    </>
  );
};

export default PostureAlertButton;
