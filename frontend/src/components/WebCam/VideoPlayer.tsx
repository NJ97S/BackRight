import useRecording from "../../hooks/useRecording";

/**
 * 저장된 blob 보기 위한 테스트 용도
 */

const VideoPlayer = () => {
  const { getAllVideos, clearAllVideos } = useRecording();

  const playVideos = () => {
    getAllVideos((videos) => {
      videos.forEach((blob) => {
        const videoUrl = URL.createObjectURL(blob);
        const videoElement = document.createElement("video");

        videoElement.src = videoUrl;
        videoElement.controls = true;
        document.body.appendChild(videoElement);
      });
    });
  };

  return (
    <div>
      <button onClick={playVideos}>저장된 영상 보기</button>
      <button onClick={clearAllVideos}>모든 영상 삭제</button>
    </div>
  );
};

export default VideoPlayer;
