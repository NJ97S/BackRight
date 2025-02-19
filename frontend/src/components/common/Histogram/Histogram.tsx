/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { DistributionType } from "../../../types/reportType";

import * as S from "./HistogramStyle";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface HistogramProps {
  distribution: DistributionType;
}

const Histogram = ({ distribution }: HistogramProps) => {
  const { groupPercentile, groupProperPoseTimeDistribution } = distribution;

  const labels = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  const averageValues = groupProperPoseTimeDistribution.map(
    (d) => (d.lowerBound + d.upperBound) / 2
  );

  const percentileIndex = Math.round(groupPercentile);

  const barColors = labels.map((label, index) =>
    index + 1 === percentileIndex ? "#76abae" : "#c7c7c7"
  );

  const adjustedValues = averageValues.map((value, index) =>
    index + 1 === percentileIndex ? 60 : value
  );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Average Pose Time",
          data: adjustedValues,
          backgroundColor: barColors,
          borderColor: barColors,
          borderWidth: 1,
        },
      ],
    }),
    [adjustedValues, barColors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const index = context.dataIndex;
              const correspondingData = groupProperPoseTimeDistribution[index];

              return correspondingData
                ? `하한: ${correspondingData.lowerBound}분, 상한: ${correspondingData.upperBound}분, 평균: ${averageValues[index]}분`
                : "";
            },
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          title: {
            display: false,
          },
          grid: {
            display: false,
          },
          ticks: {
            callback: (value: any) => {
              const num = Number(value);

              return num % 10 === 0 ? num.toString() : "";
            },
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          max: 60,
          grid: {
            display: true,
          },
          ticks: {
            stepSize: 10,
          },
          title: {
            display: false,
          },
        },
      },
    }),
    [averageValues, groupProperPoseTimeDistribution]
  );

  return (
    <S.HistogramContainer>
      <Bar data={data} options={options} />
    </S.HistogramContainer>
  );
};

export default Histogram;
