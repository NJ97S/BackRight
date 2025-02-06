import styled from "styled-components";

export const TabContainer = styled.div`
  width: 537.2px;
  height: 44px;
  position: absolute;
  left: 12.59px;
  top: 0;
`;

export const TabItem = styled.div<{ isActive: boolean }>`
  width: 167.88px;
  height: 44px;
  position: relative;
  background: ${(props) => (props.isActive ? "#EEEEEE" : "#76ABAE")};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const TabText = styled.div<{ isActive: boolean }>`
  width: 77.64px;
  height: 16.08px;
  position: absolute;
  left: 46.17px;
  top: 14.39px;
  color: ${(props) => (props.isActive ? "#76ABAE" : "#EEEEEE")};
  font-size: 16px;
  font-family: "Pretendard";
  font-weight: ${(props) => (props.isActive ? "700" : "400")};
`;
