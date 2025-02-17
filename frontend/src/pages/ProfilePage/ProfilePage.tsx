import { Controller, useForm } from "react-hook-form";

import TextInput from "../../components/common/TextInput/TextInput";
import BirthdaySelect from "../../components/common/BirthdaySelect/BirthdaySelect";
import GenderSelect from "../../components/common/GenderSelect/GenderSelect";

import { ProfileType } from "../../types/type";

import * as S from "./ProfilePageStyle";

const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ProfileType>({
    mode: "all",
    defaultValues: { gender: "MALE", profileImgUrl: null },
  });

  const onSubmit = (data: ProfileType) => {
    if (!isValid) return;

    console.log(data);
  };

  return (
    <S.ProfilePageContainer>
      <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
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
          수정하기
        </S.SubmitButton>
      </S.FormContainer>
    </S.ProfilePageContainer>
  );
};

export default ProfilePage;
