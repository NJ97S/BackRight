import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import type { DonutChartProps } from "../../../types/charts";

ChartJS.register(ArcElement);

const ChartWrapper = styled.div`
  position: relative;
  width: 13.75rem;
  height: 13.75rem;
  justify-self: center;
  align-self: center;
`;

const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  color: var(--mint);
  font-size: 1.125rem;
  font-weight: 700;
`;

const DonutChart = ({ data, colors, centerLabel }: DonutChartProps) => {
  const chartData = {
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
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

  return (
    <ChartWrapper>
      <Doughnut data={chartData} options={options} />
      <CenterLabel>{centerLabel}</CenterLabel>
    </ChartWrapper>
  );
};

export default DonutChart;
