const BODY_PARTS = [
  { key: "neck", label: "목", image: "/images/neck.svg" },
  {
    key: "leftShoulder",
    label: "왼쪽 어깨",
    image: "/images/left-shoulder.svg",
  },
  {
    key: "rightShoulder",
    label: "오른쪽 어깨",
    image: "/images/right-shoulder.svg",
  },
  { key: "back", label: "허리", image: "/images/waist.svg" },
] as const;

export default BODY_PARTS;
