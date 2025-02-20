/* eslint-disable @typescript-eslint/no-explicit-any */

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

import { convertSecondsToTimeString } from "../../../utils/timeFormatUtils";

import * as S from "./ComparisonBarChartStyle";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

interface ComparisonBarChartProps {
  current: number;
  previous: number;
}

const ComparisonBarChart = ({ current, previous }: ComparisonBarChartProps) => {
  const diffTime = current - previous;
  const diffText = diffTime > 0 ? "더 많이" : "더 적게";

  const data = {
    labels: ["최근", "오늘"],
    datasets: [
      {
        data: [previous, current],
        backgroundColor: ["#c7c7c7", "#76abae"],
        borderWidth: 0,
        barThickness: 35,
        borderRadius: { topRight: 8, bottomRight: 8 },
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: true,
        min: 0,
        max: Math.max(previous, current),
        ticks: {
          stepSize: Math.max(previous, current),
          callback: (tickValue: string | number) => {
            if (typeof tickValue === "number" && tickValue > 0) {
              return convertSecondsToTimeString(tickValue);
            }
            return "";
          },
          font: {
            size: 14,
          },
        },
        grid: {
          drawTicks: false,
          borderDash: [4, 4],
        },
        border: {
          color: "#777777",
          width: 1.5,
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
            weight: (ctx: any) => (ctx.tick.label === "오늘" ? 700 : 400),
            color: (ctx: any) =>
              ctx.tick.label === "오늘" ? "#000000" : "#c7c7c7",
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "#777777",
          width: 1.5,
        },
      },
    },
  };

  return (
    <S.ComparisonBarChartContainer>
      <S.BarGraph>
        <Bar data={data} options={options} />
      </S.BarGraph>

      <S.DescriptionContainer>
        <S.Description>최근 데이터와 비교했을 때</S.Description>
        <S.Description>
          <span>{convertSecondsToTimeString(Math.abs(diffTime))}</span>{" "}
          {diffText} 정자세를 유지했어요.
        </S.Description>
      </S.DescriptionContainer>
    </S.ComparisonBarChartContainer>
  );
};

export default ComparisonBarChart;
