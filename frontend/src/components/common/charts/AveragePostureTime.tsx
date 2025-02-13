import type React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CHART_COLORS } from "../../../constants/reportConstants";
import * as S from "./AveragePostureTimeStyle";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface AveragePostureTimeProps {
  data: number[];
  labels: string[];
}

const AveragePostureTime: React.FC<AveragePostureTimeProps> = ({
  data,
  labels,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: CHART_COLORS.PRIMARY,
        borderRadius: 4,
        barThickness: 38,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
    scales: {
      y: {
        display: true,
        ticks: {
          font: {
            family: "Pretendard",
            size: 12,
          },
          color: "var(--gray-100)",
          stepSize: 10,
          callback: (value) => `${value}`,
        },
        min: 0,
        max: 60,
        title: {
          display: true,
          text: "(분)",
          font: {
            family: "Pretendard",
            size: 12,
          },
          color: "var(--gray-300)",
          padding: { bottom: 10 },
        },
      },
      x: {
        display: true,
        grid: {
          display: false,
        },
        border: {
          display: true,
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
        enabled: true,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.y}분`,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <S.Container>
      <S.Title>평균 자세 유지 시간</S.Title>
      <S.ChartContainer>
        <Bar data={chartData} options={options} />
      </S.ChartContainer>
    </S.Container>
  );
};

export default AveragePostureTime;
