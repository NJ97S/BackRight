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
  referenceSet: boolean;
  poseCollapsed: boolean;
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
