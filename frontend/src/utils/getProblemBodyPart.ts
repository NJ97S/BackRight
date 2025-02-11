import PROBLEM_BODY_PART from "../constants/problemBodyPart";

const getProblemPart = (problemPart: Record<string, boolean>): string =>
  Object.entries(problemPart)
    .filter(([, value]) => value)
    .map(([key]) => PROBLEM_BODY_PART[key as keyof typeof PROBLEM_BODY_PART])
    .join(", ");

export default getProblemPart;
