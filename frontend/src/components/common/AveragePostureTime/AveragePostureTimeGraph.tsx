import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";

import * as S from "./AveragePostureTimeGraphStyle";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface AveragePostureTimeGraphProps {
  data: number[];
  labels: string[];
}

const AveragePostureTimeGraph = ({
  data,
  labels,
}: AveragePostureTimeGraphProps) => {
  const dataInMinutes = data.map((seconds) => Math.floor(seconds / 60));

  const chartData = {
    labels,
    datasets: [
      {
        label: "자세 유지 시간 (분)",
        data: dataInMinutes,
        backgroundColor: "#76abae",
        borderRadius: 8,
        barThickness: 36,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#777777",
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
        bodySpacing: 4,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 }, color: "#35373D" },
        border: { color: "#35373D" },
      },
      y: {
        beginAtZero: true,
        suggestedMin: 0,
        suggestedMax: 60,
        ticks: { font: { size: 12 }, color: "#35373D", stepSize: 10 },
        border: { color: "#35373D" },
        grid: {
          drawBorder: false,
          color: "#c7c7c7",
          lineWidth: 1,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
      },
    },
  };

  return (
    <S.ChartContainer>
      <Bar data={chartData} options={options} />
    </S.ChartContainer>
  );
};

export default AveragePostureTimeGraph;
