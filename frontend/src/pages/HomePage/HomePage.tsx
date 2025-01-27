import * as S from "./HomePageStyle";

import recordingStopButton from "../../assets/icons/recording-stop.svg";

const HomePage = () => (
  <S.HomePageContainer>
    <S.VideoContainer>
      <S.Video>VIDEO</S.Video>
      <S.RecordingStopButton>
        <S.RecordingStopIcon src={recordingStopButton} alt="분석 중지" />
        분석 종료
      </S.RecordingStopButton>
    </S.VideoContainer>
  </S.HomePageContainer>
);

export default HomePage;
