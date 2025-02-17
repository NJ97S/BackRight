package com.example.posturepro.report.dto;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import com.example.posturepro.report.entity.DailyStat;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class DailyStatDto {
	private LocalDate targetDay;

	private int averagePoseDuration;

	private DailyStatDto(Instant targetDay, int averagePoseDuration) {
		this.targetDay = targetDay.atZone(ZoneId.of("Asia/Seoul")).toLocalDate();
		this.averagePoseDuration = averagePoseDuration;
	}

	public static DailyStatDto from(DailyStat dailyStat) {
		return new DailyStatDto(dailyStat.getTargetDay(), dailyStat.getAveragePoseDuration());
	}
}
