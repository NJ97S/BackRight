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
  modeFromBinCounts: number;
  averagePoseDuration: number;
}

const Histogram = ({
  distribution,
  modeFromBinCounts,
  averagePoseDuration,
}: HistogramProps) => {
  const { groupBinCounts } = distribution;

  const labels = Array.from({ length: 60 }, (_, i) => i.toString());

  const barColors = labels.map((_, index) =>
    index === averagePoseDuration ? "#76abae" : "#c7c7c7"
  );

  // const adjustedValues = groupBinCounts.map((value, index) =>
  //   index + 1 === percentileIndex ? 60 : value
  // );

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "count",
          data: groupBinCounts,
          backgroundColor: barColors,
          borderColor: barColors,
          borderWidth: 1,
        },
      ],
    }),
    [groupBinCounts, barColors]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
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
          max: Math.max(
            Math.floor(modeFromBinCounts * 1.1),
            Math.floor(modeFromBinCounts / 10 + 1) * 10
          ),
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
    [groupBinCounts]
  );

  return (
    <S.HistogramContainer>
      <Bar data={data} options={options} />
    </S.HistogramContainer>
  );
};

export default Histogram;
