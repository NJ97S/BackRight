import { PropsWithChildren } from "react";

import * as S from "./LoadingStyle";

interface LoadingProps {
  backgroundColor: string;
}

const Loading = ({
  backgroundColor,
  children,
}: PropsWithChildren<LoadingProps>) => (
  <S.LoadingContainer $backgroundColor={backgroundColor}>
    {children}
  </S.LoadingContainer>
);

export default Loading;
