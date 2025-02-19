import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import * as S from "./DistributionBarChartStyle";

interface DistributionBarChartProps {
  data: Array<{
    minute: number;
    count: number;
    fill: string;
  }>;
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
  const chartData = data.map((item) => ({
    ...item,
    fill: item.minute === highlightValue ? highlightColor : baseColor,
  }));

  return (
    <S.ChartContainer style={{ height: `${height}rem` }}>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 0, left: 0, bottom: 5 }}
        >
          <XAxis
            dataKey="minute"
            interval={xAxisInterval}
            tick={{ fontSize: 12, fill: "var(--gray-300)" }}
          />
          <YAxis hide={true} />
          <Tooltip
            cursor={false}
            content={({ payload }) => {
              if (!payload?.length) return null;
              const tooltipData = payload[0].payload;

              return (
                <S.TooltipContainer>
                  <span>{tooltipData.minute}분</span>
                  <span>{tooltipData.count}명</span>
                </S.TooltipContainer>
              );
            }}
          />
          <Bar
            dataKey="count"
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
