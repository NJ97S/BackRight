import { SignUpInfoType } from "../types/type";
import { instance, refreshTokenInstance } from "./instance";

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

export const postRefreshToken = async () => {
  try {
    const response = await refreshTokenInstance.post("/auth/refresh-token");

    return response.data;
  } catch (error) {
    throw new Error("Access token 재발급 실패");
  }
};

export const getDetectionVideo = async (detectionId: number) => {
  try {
    const response = await instance.get(`/detections/${detectionId}/video`);

    return response.data;
  } catch (error) {
    throw new Error("비디오 불러오기 실패");
  }
};
