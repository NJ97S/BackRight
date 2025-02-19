import { useEffect } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

import TextInput from "../../components/common/TextInput/TextInput";
import useAuthStore from "../../store/useAuthStore";
import useGetProfileImage from "../../hooks/useGetProfileImage";
import { patchUserInfo } from "../../apis/api";

import * as S from "./ProfilePageStyle";

import defaultProfileImage from "../../assets/images/default-profile.svg";
import cameraIcon from "../../assets/icons/camera.svg";

export interface ProfileEditFieldType {
  nickname: string;
  profileImgUrl: string | null;
}

const ProfilePage = () => {
  const { user, fetchUserInfo } = useAuthStore();
  const { handleEditProfileImageChange, uploadedImgUrl, imgFile } =
    useGetProfileImage();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileEditFieldType>({
    mode: "all",
    defaultValues: {
      nickname: user?.nickname,
      profileImgUrl: null,
    },
  });

  const currentProfileImage = user?.profileImgUrl
    ? user.profileImgUrl
    : defaultProfileImage;

  const isFormDirty = isDirty || !!getValues("profileImgUrl");

  const onSubmit = async (data: ProfileEditFieldType) => {
    if (!isValid || !isFormDirty) return;

    const { preSignedUrl } = await patchUserInfo(data);

    if (!preSignedUrl) {
      fetchUserInfo();
      return;
    }

    await axios.put(preSignedUrl, imgFile, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });

    fetchUserInfo();
  };

  useEffect(() => {
    if (!imgFile?.name) return;

    setValue("profileImgUrl", imgFile?.name);
  }, [imgFile]);

  useEffect(() => {
    if (!user) return;

    reset({
      nickname: user.nickname,
      profileImgUrl: null,
    });
  }, [user]);

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
