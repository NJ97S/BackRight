interface LampState {
  id: "INITIAL" | "ACTIVE" | "FINAL";
  src: string;
}

const LAMP_STATES: LampState[] = [
  {
    id: "INITIAL",
    src: "/images/lamp-state-1.webp",
  },
  {
    id: "ACTIVE",
    src: "/images/lamp-state-2.webp",
  },
  {
    id: "FINAL",
    src: "/images/lamp-state-3.webp",
  },
] as const;

export default LAMP_STATES;
