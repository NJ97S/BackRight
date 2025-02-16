const BODY_PARTS = [
  { key: "NECK", label: "목", image: "/images/neck.svg" },
  {
    key: "LEFT_SHOULDER",
    label: "왼쪽 어깨",
    image: "/images/left-shoulder.svg",
  },
  {
    key: "RIGHT_SHOULDER",
    label: "오른쪽 어깨",
    image: "/images/right-shoulder.svg",
  },
  { key: "BACK", label: "허리", image: "/images/waist.svg" },
] as const;

export default BODY_PARTS;
