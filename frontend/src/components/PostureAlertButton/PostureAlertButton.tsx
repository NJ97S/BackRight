import { useState } from "react";

import * as S from "./PostureAlertButtonStyle";

import listIcon from "../../assets/icons/list.svg";
import alertIcon from "../../assets/icons/alert.svg";

interface PostureAlertButtonProps {
  onClick: () => void;
  newAlertCount: number;
}

const PostureAlertButton = ({
  onClick,
  newAlertCount,
}: PostureAlertButtonProps) => {
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
        {newAlertCount > 0 ? (
          <S.StatusAlertMessage>
            미확인 경고 내역이 <span>{newAlertCount}건</span> 있습니다.
          </S.StatusAlertMessage>
        ) : (
          <S.StatusMessage>미확인 경고 내역이 없습니다.</S.StatusMessage>
        )}
        <S.Triangle />
      </S.AlertStatusContainer>

      <S.PostureAlertButton
        onClick={onClick}
        onMouseEnter={handleAlertButtonMouseEnter}
        onMouseLeave={handleAlertButtonMouseLeave}
      >
        <S.ListIcon
          src={newAlertCount > 0 ? alertIcon : listIcon}
          alt="경고목록"
        />
      </S.PostureAlertButton>
    </>
  );
};

export default PostureAlertButton;
