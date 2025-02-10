// src/sections/DailyStats/DailyStatsSection.tsx

import type React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import * as S from "./DailyStatsSectionStyle";

// Chart.js 컴포넌트 등록
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement);

// 시간 포맷팅 유틸리티 함수
const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return `${hours}시간 ${mins}분`;
};

const DailyStatsSection: React.FC = () => {
  // 시간 데이터 (분 단위)
  const todayMinutes = 292; // 4시간 52분
  const yesterdayMinutes = 77; // 1시간 17분
  const totalMinutes = 390; // 6시간 30분
  const diffMinutes = todayMinutes - yesterdayMinutes; // 3시간 35분

  // 도넛 차트 데이터
  const donutData = {
    datasets: [
      {
        data: [todayMinutes, totalMinutes - todayMinutes],
        backgroundColor: ["#76abae", "#777777"],
        borderWidth: 0,
        borderRadius: 2,
      },
    ],
  };

  // 도넛 차트 옵션
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

  // 바 차트 데이터
  const barData = {
    labels: ["1일 전", "오늘"],
    datasets: [
      {
        data: [yesterdayMinutes, todayMinutes],
        backgroundColor: ["#777777", "#76abae"],
        borderRadius: 4,
        barThickness: 32,
      },
    ],
  };

  const barOptions = {
    indexAxis: "y" as const,
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          drawBorder: true,
          borderDash: [5, 5],
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
          callback: (value: number) => formatTime(value),
          stepSize: Math.max(yesterdayMinutes, todayMinutes), // 최대값을 기준으로 스텝 설정
        },
        min: 0,
        max: todayMinutes, // 오늘 데이터의 최대값으로 설정
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
            weight: "400",
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
        {/* 도넛 차트 섹션 */}
        <S.DonutSection>
          <S.DonutWrapper>
            <Doughnut data={donutData} options={donutOptions} />
            <S.DonutLabel>{formatTime(todayMinutes)}</S.DonutLabel>
          </S.DonutWrapper>
          <S.DonutDescription>
            <S.DescriptionTitle>
              {formatTime(totalMinutes)} 중
            </S.DescriptionTitle>
            <S.DescriptionText>
              <S.HighlightText>{formatTime(todayMinutes)}</S.HighlightText> 동안
              정자세를 유지했어요.
            </S.DescriptionText>
          </S.DonutDescription>
        </S.DonutSection>

        <S.Divider />

        {/* 바 차트 섹션 */}
        <S.BarSection>
          <S.BarWrapper>
            <Bar data={barData} options={barOptions} />
            <S.DifferenceIndicator>
              <S.DifferenceText>{formatTime(diffMinutes)}</S.DifferenceText>
            </S.DifferenceIndicator>
          </S.BarWrapper>
          <S.BarDescription>
            <S.DescriptionTitle>1일 전과 비교했을 때</S.DescriptionTitle>
            <S.DescriptionText>
              <S.HighlightText>{formatTime(diffMinutes)}</S.HighlightText> 더
              많이 정자세를 유지했어요.
            </S.DescriptionText>
          </S.BarDescription>
        </S.BarSection>
      </S.Content>
    </S.Container>
  );
};

export default DailyStatsSection;
