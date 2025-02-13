import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface BarChartProps {
  data: number[];
  labels: string[];
  colors: string[];
  formatLabel?: (value: number) => string;
  maxValue?: number;
}

const ChartWrapper = styled.div`
  position: relative;
  height: 11.5rem;
  justify-self: center;
  align-self: center;
`;

const DifferenceIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const DifferenceText = styled.span`
  color: var(--mint);
  font-size: 0.75rem;
  font-weight: 700;
`;

const BarChart = ({
  data,
  labels,
  colors,
  formatLabel,
  maxValue,
}: BarChartProps) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderRadius: 0,
        barThickness: 32,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
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
          callback(tickValue) {
            return formatLabel ? formatLabel(Number(tickValue)) : tickValue;
          },
          stepSize: maxValue || Math.max(...data),
        },
        min: 0,
        max: maxValue || Math.max(...data),
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

  const difference = data[1] - data[0];

  return (
    <ChartWrapper>
      <Bar data={chartData} options={options} />
      {formatLabel && (
        <DifferenceIndicator>
          <DifferenceText>{formatLabel(difference)}</DifferenceText>
        </DifferenceIndicator>
      )}
    </ChartWrapper>
  );
};

export default BarChart;
