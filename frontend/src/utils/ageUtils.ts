// src/utils/ageUtils.ts

export const calculateAgeGroup = (birthDate: string): string => {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  if (age < 20) return "10대";
  if (age < 30) return "20대";
  if (age < 40) return "30대";
  if (age < 50) return "40대";
  if (age < 60) return "50대";
  return "60대 이상";
};

export const getDistributionMessage = (
  type: "overall" | "ageRange" | "ageRangeGender",
  rank: number,
  ageGroup: string,
  gender: "MALE" | "FEMALE"
): string => {
  const genderText = gender === "MALE" ? "남성" : "여성";

  const baseMessages = {
    excellent: (scope: string) =>
      `${scope} 중 최상위 수준이에요! 정말 훌륭한 자세 관리입니다. 🌟`,
    veryGood: (scope: string) =>
      `${scope}와 비교했을 때 매우 좋은 수준이에요. 잘 유지해주세요! 👏`,
    good: (scope: string) =>
      `${scope} 중에서도 중상위권이에요. 조금만 더 노력하면 최상위권으로 도약할 수 있어요! 💪`,
    needImprovement: (scope: string) =>
      `${scope}와 비교하면 아직 개선의 여지가 있어요. 함께 더 나은 자세를 만들어보아요! 😊`,
    starting: (scope: string) =>
      `${scope} 중에서 시작 단계에요. 작은 관심으로 큰 변화를 만들어보세요! 💝`,
  };

  let scope = "전체 사용자";
  if (type === "ageRange") {
    scope = `${ageGroup} 사용자`;
  } else if (type === "ageRangeGender") {
    scope = `${ageGroup} ${genderText}`;
  }

  if (rank <= 10) return baseMessages.excellent(scope);
  if (rank <= 30) return baseMessages.veryGood(scope);
  if (rank <= 70) return baseMessages.good(scope);
  if (rank <= 90) return baseMessages.needImprovement(scope);
  return baseMessages.starting(scope);
};
