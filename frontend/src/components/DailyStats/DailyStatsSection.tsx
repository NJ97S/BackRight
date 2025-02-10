import type React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import * as S from "./DailyStatsSectionStyle";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

// 시간 포맷팅 유틸리티 함수
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}시간 ${mins}분`;
};

const DailyStatsSection: React.FC = () => {
  // 통계 데이터
  const todayMinutes = 292;
  const yesterdayMinutes = 77;
  const totalMinutes = 390;
  const diffMinutes = todayMinutes - yesterdayMinutes;

  // 도넛 차트 설정
  const donutData = {
    datasets: [
      {
        data: [todayMinutes, totalMinutes - todayMinutes],
        backgroundColor: ["#76abae", "#777777"],
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const donutOptions = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  // 막대 차트 설정
  const barData = {
    labels: ["1일 전", "오늘"],
    datasets: [
      {
        data: [yesterdayMinutes, todayMinutes],
        backgroundColor: ["#777777", "#76abae"],
        borderRadius: 0,
        barThickness: 32,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    indexAxis: "y" as const,
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          drawOnChartArea: true,
        },
        border: {
          display: true,
          dash: [5, 5],
        },
        ticks: {
          display: true,
          font: {
            family: "Pretendard",
            size: 12,
          },
          color: "var(--gray-300)",
          callback(tickValue: number | string) {
            return formatTime(Number(tickValue));
          },
          stepSize: Math.max(yesterdayMinutes, todayMinutes),
        },
        min: 0,
        max: todayMinutes,
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Pretendard",
            size: 12,
            weight: 400,
          },
          color: "var(--gray-300)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <S.Container>
      <S.Title>일일 통계</S.Title>
      <S.Content>
        {/* 도넛 차트 영역 */}
        <S.DonutWrapper>
          <Doughnut data={donutData} options={donutOptions} />
          <S.DonutLabel>{formatTime(todayMinutes)}</S.DonutLabel>
        </S.DonutWrapper>

        {/* 막대 차트 영역 */}
        <S.BarWrapper>
          <Bar data={barData} options={barOptions} />
          <S.DifferenceIndicator>
            <S.DifferenceText>{formatTime(diffMinutes)}</S.DifferenceText>
          </S.DifferenceIndicator>
        </S.BarWrapper>

        {/* 도넛 차트 설명 */}
        <S.Description>
          <S.DescriptionTitle>{formatTime(totalMinutes)} 중</S.DescriptionTitle>
          <S.DescriptionText>
            <S.HighlightText>{formatTime(todayMinutes)}</S.HighlightText> 동안
            정자세를 유지했어요.
          </S.DescriptionText>
        </S.Description>

        {/* 막대 차트 설명 */}
        <S.Description>
          <S.DescriptionTitle>1일 전과 비교했을 때</S.DescriptionTitle>
          <S.DescriptionText>
            <S.HighlightText>{formatTime(diffMinutes)}</S.HighlightText> 더 많이
            정자세를 유지했어요.
          </S.DescriptionText>
        </S.Description>
      </S.Content>
    </S.Container>
  );
};

export default DailyStatsSection;
