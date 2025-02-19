import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TimeDistribution } from "../../../types/reportType";
import * as S from "./DistributionBarChartStyle";

interface DistributionBarChartProps {
  data: TimeDistribution[];
  highlightValue?: number;
  highlightColor?: string;
  baseColor?: string;
  xAxisInterval?: number;
  height?: number;
}

const DistributionBarChart = ({
  data,
  highlightValue,
  highlightColor = "var(--mint)",
  baseColor = "var(--gray-100)",
  xAxisInterval = 4,
  height = 10,
}: DistributionBarChartProps) => {
  const chartData = data.map((item, index) => {
    const isHighlighted =
      highlightValue !== undefined &&
      highlightValue >= item.lowerBound &&
      highlightValue <= item.upperBound;

    return {
      timeRange: `${item.lowerBound}-${item.upperBound}`,
      value: 1, // Each interval represents one bin in the distribution
      fill: isHighlighted ? highlightColor : baseColor,
      lowerBound: item.lowerBound,
      upperBound: item.upperBound,
    };
  });

  return (
    <S.ChartContainer style={{ height: `${height}rem` }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="timeRange"
            interval={xAxisInterval}
            tick={{ fontSize: 12, fill: "var(--gray-300)" }}
          />
          <YAxis hide />
          <Tooltip
            cursor={false}
            content={({ payload }) => {
              if (!payload?.length) return null;
              const data = payload[0].payload;

              return (
                <S.TooltipContainer>
                  <span>
                    {data.lowerBound}~{data.upperBound}분
                  </span>
                  <span>구간</span>
                </S.TooltipContainer>
              );
            }}
          />
          <Bar
            dataKey="value"
            fill="var(--gray-100)"
            fillOpacity={1}
            radius={[2, 2, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  );
};

export default DistributionBarChart;
