import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import * as S from "./DoughnutGraphStyle";
import { convertMinutesToTimeString } from "../../../utils/timeFormatUtils";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutGraphProps {
  totalDuration: number;
  properPoseDuration: number;
}

const DoughnutGraph = ({
  totalDuration,
  properPoseDuration,
}: DoughnutGraphProps) => {
  const data = {
    datasets: [
      {
        data: [properPoseDuration, totalDuration - properPoseDuration],
        backgroundColor: ["#76abae", "#c7c7c7"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <S.DoughnutGraphContainer>
      <S.DoughnutGraph>
        <Doughnut data={data} options={options} />

        <S.CenterText>
          {convertMinutesToTimeString(properPoseDuration)}
        </S.CenterText>
      </S.DoughnutGraph>

      <S.DescriptionContainer>
        <S.Description>
          {convertMinutesToTimeString(totalDuration)} 중
        </S.Description>
        <S.Description>
          <span>{convertMinutesToTimeString(properPoseDuration)}</span> 동안
          정자세를 유지했어요.
        </S.Description>
      </S.DescriptionContainer>
    </S.DoughnutGraphContainer>
  );
};

export default DoughnutGraph;
