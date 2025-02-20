import axios from "axios";

import { SignUpInfoType } from "../types/type";
import { instance, refreshTokenInstance } from "./instance";
import { ProfileEditFieldType } from "../pages/ProfilePage/ProfilePage";

export const postSignUpPreSignedImageUrl = async (
  profileImgFileName: string
) => {
  try {
    const response = await instance.post(
      `/members/signup/imgpresigned-url?profileImgFileName=${profileImgFileName}`
    );

    return response.data;
  } catch (error) {
    throw new Error("프로필 이미지 업로드 실패");
  }
};

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

export const patchUserInfo = async (updateInfo: ProfileEditFieldType) => {
  try {
    const response = await instance.patch("/members/update", updateInfo);

    return response.data;
  } catch (error) {
    throw new Error("유저정보 수정 실패");
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

export const getDailyReport = async (date: string) => {
  try {
    const response = await instance.get(`/reports/daily?date=${date}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) return null;
    }

    throw new Error("일일보고서 불러오기 실패");
  }
};

export const getWeeklyReport = async (date: string) => {
  try {
    const response = await instance.get(`/reports/weekly?date=${date}`);

    return response.data;
  } catch (error) {
    throw new Error("주간보고서 불러오기 실패");
  }
};

export const getMonthlyReport = async (date: string) => {
  try {
    const response = await instance.get(`/reports/monthly?date=${date}`);

    return response.data;
  } catch (error) {
    throw new Error("월간보고서 불러오기 실패");
  }
};

export const postLogout = async () => {
  try {
    const response = await instance.post("/auth/logout");

    return response.data;
  } catch (error) {
    throw new Error("로그아웃 실패");
  }
};

export const patchSessionStateToAbsent = async (sessionId: number) => {
  try {
    const response = await instance.patch(`/sessions/${sessionId}`);

    return response.data;
  } catch (error) {
    throw new Error("업데이트 실패")
  }
}