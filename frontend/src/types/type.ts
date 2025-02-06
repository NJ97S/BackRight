export interface ReceivedDataType {
  initialSet: boolean;
  detected: boolean;
  videoUrl: string | null;
  postureStatus: {
    neck: boolean;
    leftShoulder: boolean;
    rightShoulder: boolean;
    back: boolean;
  };
}
