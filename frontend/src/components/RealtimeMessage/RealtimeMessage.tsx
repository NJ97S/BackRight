import { PropsWithChildren } from "react";

import * as S from "./RealtimeMessageStyle";

interface RealtimeMessageProps {
  type: "setting" | "alert";
  isDisplayed: boolean;
}

const RealtimeMessage = ({
  type,
  isDisplayed,
  children,
}: PropsWithChildren<RealtimeMessageProps>) => (
  <S.RealtimeMessage type={type} isDisplayed={isDisplayed}>
    {children}
  </S.RealtimeMessage>
);

export default RealtimeMessage;
