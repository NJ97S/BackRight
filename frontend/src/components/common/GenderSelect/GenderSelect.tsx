import { forwardRef } from "react";

import * as S from "./GenderSelectStyle";

const GenderSelect = forwardRef<HTMLInputElement>(({ ...restProps }, ref) => (
  <S.GenderSelectContainer>
    <S.Label>성별</S.Label>

    <S.RadioGroup>
      <S.RadioButton>
        <S.RadioInput
          type="radio"
          name="gender"
          id="male"
          value="MALE"
          {...restProps}
          ref={ref}
        />
        <S.RadioLabel htmlFor="male">남자</S.RadioLabel>
      </S.RadioButton>
      <S.RadioButton>
        <S.RadioInput
          type="radio"
          name="gender"
          id="female"
          value="FEMALE"
          {...restProps}
          ref={ref}
        />
        <S.RadioLabel htmlFor="female">여자</S.RadioLabel>
      </S.RadioButton>
    </S.RadioGroup>
  </S.GenderSelectContainer>
));

export default GenderSelect;
