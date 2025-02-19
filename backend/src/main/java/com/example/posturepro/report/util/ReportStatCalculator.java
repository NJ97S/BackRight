package com.example.posturepro.report.util;

import java.util.List;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;

public class ReportStatCalculator {
	public static int findPercentileIndex(List<DistributionSummary> summaries, int averagePoseDuration) {
		int low = 0;
		int high = summaries.size() - 1;
		int candidate = -1;

		while (low <= high) {
			int mid = low + (high - low) / 2;
			int midUpper = summaries.get(mid).getUpperBound();

			if (averagePoseDuration >= midUpper) {
				// averagePoseDuration이 mid의 upperBound보다 크거나 같다면, 후보로 저장하고 오른쪽 영역 탐색
				candidate = mid;
				low = mid + 1;
			} else {
				// averagePoseDuration이 mid의 upperBound보다 작으면 왼쪽 영역 탐색
				high = mid - 1;
			}
		}

		// candidate가 -1이면, 모든 upperBound가 averagePoseDuration보다 큰 것이므로 0번째 bin을 반환
		return candidate == -1 ? 0 : candidate;
	}

	public static int calculateAverage(List<Integer> numbers) {
		var average = numbers.stream()
			.mapToInt(Integer::intValue)
			.average()
			.orElse(0);
		return (int)Math.floor(average);
	}
}