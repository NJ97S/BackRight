import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #ffffff;
    --black: #000000;

    --gray-100: #a7a7a7;
    --gray-200: #777777;
    --gray-300: #35373d;
    --gray-400: #2b2d31;
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
