import React from "react";

import { useNavigate } from "react-router-dom";

import { postUserInfo } from "../../apis/api";
import { SignUpInfoType } from "../../types/type";

import * as S from "./SignUpPageStyle";

const SignUpPage = () => {
  const navigate = useNavigate();

  const requestSignUp = async (data: SignUpInfoType) => {
    try {
      await postUserInfo(data);

      navigate("/");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  const parseSignUpFormData = (formData: FormData): SignUpInfoType | null => {
    const data = Object.fromEntries(formData.entries());

    if (
      typeof data.name === "string" &&
      typeof data.nickname === "string" &&
      typeof data.birthDate === "string" &&
      (data.gender === "FEMALE" || data.gender === "MALE")
    ) {
      return data as unknown as SignUpInfoType;
    }

    return null;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const signUpInfo = parseSignUpFormData(formData);

    if (signUpInfo === null) return;

    try {
      await requestSignUp(signUpInfo);
    } catch (error) {
      console.error(`회원가입 실패`, error);
    }
  };

  return (
    <S.SignUpPageContianer>
      <S.SignUpForm onSubmit={handleFormSubmit}>
        <S.InputContainer>
          <S.Label htmlFor="name">이름</S.Label>
          <S.Input type="text" id="name" name="name" placeholder="소샤이" />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label htmlFor="nickname">닉네임</S.Label>
          <S.Input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="크와아앙"
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label htmlFor="birthDate">생일</S.Label>
          <S.Input
            type="text"
            id="birthDate"
            name="birthDate"
            placeholder="1997-11-17"
          />
        </S.InputContainer>

        <S.InputContainer>
          <S.Label htmlFor="gender">성별</S.Label>
          <S.Input
            type="text"
            id="gender"
            name="gender"
            placeholder="FEMALE / MALE"
          />
        </S.InputContainer>

        <S.SubmitButton>회원가입</S.SubmitButton>
      </S.SignUpForm>
    </S.SignUpPageContianer>
  );
};

export default SignUpPage;
