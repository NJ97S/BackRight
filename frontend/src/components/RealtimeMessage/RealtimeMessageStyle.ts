import styled from "styled-components";

interface RealtimeAlertProps {
  type: "setting" | "alert";
  isDisplayed: boolean;
}

export const RealtimeMessage = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "type" && prop !== "isDisplayed",
})<RealtimeAlertProps>`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 1rem 2.5rem;
  border-radius: 12px;
  background: ${({ type }) =>
    type === "setting"
      ? "rgba(118, 171, 174, 0.80)"
      : "rgba(255, 68, 68, 0.6)"};
  color: var(--white);
  font-size: 0.875rem;
  text-align: center;

  opacity: ${({ isDisplayed }) => (isDisplayed ? 1 : 0)};
  visibility: ${({ isDisplayed }) => (isDisplayed ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
`;

export const empty = styled.div``;
