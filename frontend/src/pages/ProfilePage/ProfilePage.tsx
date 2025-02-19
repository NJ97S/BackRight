import { useEffect } from "react";

import { useForm } from "react-hook-form";

import TextInput from "../../components/common/TextInput/TextInput";
import useAuthStore from "../../store/useAuthStore";
import useGetProfileImage from "../../hooks/useGetProfileImage";

import * as S from "./ProfilePageStyle";

import defaultProfileImage from "../../assets/images/default-profile.svg";
import cameraIcon from "../../assets/icons/camera.svg";
import { patchUserInfo } from "../../apis/api";

export interface ProfileEditFieldType {
  nickname: string;
  profileImgUrl: string | null;
}

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { handleEditProfileImageChange, uploadedImgUrl, imgFileName } =
    useGetProfileImage();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileEditFieldType>({
    mode: "all",
    defaultValues: {
      nickname: user?.nickname,
      profileImgUrl: user?.profileImgUrl,
    },
  });

  const currentProfileImage = user?.profileImgUrl
    ? user.profileImgUrl
    : defaultProfileImage;

  const isFormDirty = isDirty || !!uploadedImgUrl;

  const onSubmit = async (data: ProfileEditFieldType) => {
    if (!isValid || !isFormDirty) return;

    console.log(data);

    await patchUserInfo(data);
  };

  useEffect(() => {
    if (!imgFileName) return;

    setValue("profileImgUrl", imgFileName);
  }, [imgFileName]);

  return (
    <S.ProfilePageContainer>
      <S.ContentContainer>
        <S.Title>내 정보 관리</S.Title>

        <S.HiddenImageInput
          id="file"
          type="file"
          accept="image/*"
          onChange={handleEditProfileImageChange}
        />
        <S.UploadProfileImageButton htmlFor="file">
          <S.ProfileImage src={uploadedImgUrl ?? currentProfileImage} />
          <S.CameraIcon src={cameraIcon} />
        </S.UploadProfileImageButton>

        <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="이름" type="text" value={user?.name} disabled />

          <TextInput
            label="닉네임"
            type="text"
            errorMessage={errors.nickname?.message}
            placeholder="닉네임을 입력해주세요"
            {...register("nickname", {
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
            })}
          />

          <TextInput
            label="생년월일"
            type="text"
            value={user?.birthDate}
            disabled
          />

          <S.SubmitButton type="submit" disabled={!isValid || !isFormDirty}>
            수정하기
          </S.SubmitButton>
        </S.FormContainer>
      </S.ContentContainer>
    </S.ProfilePageContainer>
  );
};

export default ProfilePage;
