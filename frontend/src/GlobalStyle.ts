import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Pretendard";
  }

  :root {
    --white: #ffffff;
    --black: #000000;

    --gray-100: #c7c7c7;
    --gray-200: #a7a7a7;
    --gray-300: #777777;
    --gray-400: #35373d;
    --gray-500: #2b2d31;

    --navy-100: #31363f;
    --navy-200: #222831;

    --mint: #76abae;

    --cream: #EEEEEE;

    --red: #FF0000;
    --blue: #0055FF;

    --kakao: #fee500;
    --naver: #03C75A;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  input {
    border: none;
    padding: none;
  }

  input:focus {
    outline: none;
  }

  button {
    border: none;
    padding: unset;
    background-color: unset;
    cursor: pointer;
  }
`;

export default GlobalStyle;
