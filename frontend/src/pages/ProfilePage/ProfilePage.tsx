import { useNavigate } from "react-router-dom";
import { postLogout } from "../../apis/api";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogoutButtonClick = async () => {
    await postLogout();

    navigate("/sign-in");
  };

  return (
    <>
      <h1>마이 페이지</h1>
      <button onClick={handleLogoutButtonClick}>로그아웃</button>
    </>
  );
};

export default ProfilePage;
