import useRecording from "../../hooks/useRecording";

/**
 * 저장된 blob 보기 위한 테스트 용도
 */

const VideoFilter = () => {
  const { getVideoByExactTime } = useRecording();

  const findVideo = () => {
    const targetTime = Date.now() - 2000; // 현재 시간에서 2초 전 영상 검색 (TEST)

    getVideoByExactTime(targetTime, (videos) => {
      if (videos.length === 0) {
        console.log("해당 시간에 포함된 영상 없음");
        return;
      }

      videos.forEach((blob) => {
        const videoUrl = URL.createObjectURL(blob);
        const videoElement = document.createElement("video");

        videoElement.src = videoUrl;
        videoElement.controls = true;
        document.body.appendChild(videoElement);
      });
    });
  };

  return <button onClick={findVideo}>특정 시간의 영상 검색</button>;
};

export default VideoFilter;
