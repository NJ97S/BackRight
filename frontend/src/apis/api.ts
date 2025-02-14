import { SignUpInfoType } from "../types/type";
import instance from "./instance";

export const postUserInfo = async (userInfo: SignUpInfoType) => {
  try {
    const response = await instance.post("/members/signup", userInfo);

    return response.data;
  } catch (error) {
    throw new Error("회원가입 실패");
  }
};

export const postLogout = async () => {
  try {
    const resposne = await instance.post("/auth/logout");

    return resposne.data;
  } catch (error) {
    throw new Error("로그아웃 실패");
  }
};
