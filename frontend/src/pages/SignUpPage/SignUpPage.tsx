import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { postUserInfo } from "../../apis/api";

import TextInput from "../../components/common/TextInput/TextInput";
import GenderSelect from "../../components/common/GenderSelect/GenderSelect";
import BirthdaySelect from "../../components/common/BirthdaySelect/BirthdaySelect";

import FORM_FIELDS from "../../constants/formFields";
import PATH from "../../constants/path";
import { SignUpInfoType } from "../../types/type";

import * as S from "./SignUpPageStyle";

const SignUpPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
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

  return (
    <S.SignUpPageContainer>
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
    </S.SignUpPageContainer>
  );
};

export default SignUpPage;
