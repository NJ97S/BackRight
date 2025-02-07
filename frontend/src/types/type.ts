export interface ReceivedDataType {
  initialSet: boolean;
  detected: boolean;
  videoUrl: string | null;
  problemCode: number;
}

export interface SignUpInfoType {
  name: string;
  nickname: string;
  birthDate: string;
  gender: "FEMALE" | "MALE";
}
