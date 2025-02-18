import { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import useGetProfileImage from "../../hooks/useGetProfileImage";
import { postUserInfo } from "../../apis/api";

import TextInput from "../../components/common/TextInput/TextInput";
import GenderSelect from "../../components/common/GenderSelect/GenderSelect";
import BirthdaySelect from "../../components/common/BirthdaySelect/BirthdaySelect";

import PATH from "../../constants/path";
import { SignUpInfoType } from "../../types/type";

import * as S from "./SignUpPageStyle";

import defaultProfileImage from "../../assets/images/default-profile.svg";
import cameraIcon from "../../assets/icons/camera.svg";

const FORM_FIELDS = [
  {
    name: "name",
    label: "이름",
    type: "text",
    placeholder: "실명을 입력해주세요",
    validation: {
      required: "이름을 입력해주세요",
      validate: (value: string | null) => {
        if (!value) return "이름을 입력해주세요";
        if (/\s/.test(value)) {
          return "이름에는 공백을 포함할 수 없습니다";
        }
        if (/[^a-zA-Z0-9ㄱ-힣]/.test(value)) {
          return "이름에는 특수문자를 사용할 수 없습니다";
        }
        if (value.length > 10) {
          return "이름은 최대 10자까지 입력 가능합니다";
        }
        return true;
      },
    },
  },
  {
    name: "nickname",
    label: "닉네임",
    type: "text",
    placeholder: "닉네임을 입력해주세요",
    validation: {
      required: "닉네임을 입력해주세요",
      validate: (value: string | null) => {
        if (!value) return "닉네임을 입력해주세요";
        if (/\s/.test(value)) {
          return "닉네임에는 공백을 포함할 수 없습니다";
        }
        if (/[^a-zA-Z0-9ㄱ-힣]/.test(value)) {
          return "닉네임에는 특수문자를 사용할 수 없습니다";
        }
        if (value.length > 10) {
          return "닉네임은 최대 10자까지 입력 가능합니다";
        }
        return true;
      },
    },
  },
] as const;

const SignUpPage = () => {
  const navigate = useNavigate();

  const profileImageInputRef = useRef<HTMLInputElement>(null);

  const { handleProfileImageChange, uploadedImgUrl, imgKey } =
    useGetProfileImage();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<SignUpInfoType>({
    mode: "all",
    defaultValues: { gender: "MALE", profileImgUrl: null },
  });

  const onSubmit = async (data: SignUpInfoType) => {
    if (!isValid) return;

    await postUserInfo(data);

    navigate(PATH.HOME);
  };

  useEffect(() => {
    if (!imgKey) return;

    setValue("profileImgUrl", imgKey);
  }, [imgKey]);

  return (
    <S.SignUpPageContainer>
      <S.ContentContainer>
        <S.HiddenImageInput
          id="file"
          type="file"
          accept="image/*"
          ref={profileImageInputRef}
          onChange={handleProfileImageChange}
        />
        <S.UploadProfileImageButton htmlFor="file">
          <S.ProfileImage src={uploadedImgUrl ?? defaultProfileImage} />
          <S.CameraIcon src={cameraIcon} />
        </S.UploadProfileImageButton>

        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          {FORM_FIELDS.map(({ name, label, type, placeholder, validation }) => (
            <TextInput
              key={name}
              label={label}
              type={type}
              errorMessage={
                errors[name as keyof SignUpInfoType]?.message as string
              }
              placeholder={placeholder}
              {...register(name as keyof SignUpInfoType, validation)}
            />
          ))}

          <Controller
            name="birthDate"
            control={control}
            rules={{ required: "생년월일을 선택해주세요" }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <BirthdaySelect
                value={value ? new Date(value) : null}
                onChange={onChange}
                errorMessage={error?.message}
              />
            )}
          />

          <GenderSelect {...register("gender")} />

          <S.SubmitButton type="submit" disabled={!isValid}>
            가입하기
          </S.SubmitButton>
        </S.FormContainer>
      </S.ContentContainer>
    </S.SignUpPageContainer>
  );
};

export default SignUpPage;
