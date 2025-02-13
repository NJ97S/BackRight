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

export default FORM_FIELDS;
