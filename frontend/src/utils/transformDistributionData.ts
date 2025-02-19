import { DistributionType } from "../types/reportType";

const transformDistributionData = (distribution: DistributionType) => {
  const bins: { range: string; frequency: number }[] = [];

  distribution.groupProperPoseTimeDistribution.forEach((item) => {
    const range = `${item.lowerBound} - ${item.upperBound}`;
    const existingBin = bins.find((bin) => bin.range === range);

    if (existingBin) {
      existingBin.frequency += 1;
    } else {
      bins.push({ range, frequency: 1 });
    }
  });

  return bins;
};

export default transformDistributionData;
