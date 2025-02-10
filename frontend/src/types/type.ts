export interface ReceivedDataType {
  initialSet: boolean;
  detected: boolean;
  videoUrl: string | null;
  detectionStartAt: string | null;
  problemPart: {
    neck: boolean;
    leftShoulder: boolean;
    rightShoulder: boolean;
    back: boolean;
  };
}

export interface SignUpInfoType {
  name: string;
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
}
