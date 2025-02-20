export interface SignUpInfoType {
  name: string;
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
  profileImgUrl: string | null;
}

export interface UserInfoType {
  providerId: string;
  name: string;
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
  profileImgUrl: string | null;
  message: string | null;
}

export interface ProfileType {
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
  profileImgUrl: string | null;
}

export interface ReceivedDataType {
  responseType: "POSE_RESPONSE" | "DISCONNECT_RESPONSE";
  referenceSet: boolean;
  poseCollapsed: boolean;
  sessionId: number;
  detectionId: number;
  videoPreSignedUrl: string | null;
  startedAt: string | null;
  problemPart: {
    neck: boolean;
    leftShoulder: boolean;
    rightShoulder: boolean;
    back: boolean;
  };
}

export interface SessionAlertType {
  startedAt: string;
  problemPart: ReceivedDataType["problemPart"];
  detectionId: number;
}
