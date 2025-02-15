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

export const getUserInfo = async () => {
  try {
    const response = await instance.get("/members/me");

    return response.data;
  } catch (error) {
    throw new Error("유저정보 로드 실패");
  }
};
