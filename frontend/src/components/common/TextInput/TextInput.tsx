import { ComponentPropsWithoutRef, forwardRef } from "react";

import * as S from "./TextInputStyle";

interface TextInputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  errorMessage?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, id, errorMessage, ...restProps }, ref) => (
    <S.InputContainer>
      <S.Label htmlFor={id}>{label}</S.Label>
      <S.Input ref={ref} id={id} hasError={!!errorMessage} {...restProps} />
      {errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </S.InputContainer>
  )
);

export default TextInput;
