package com.example.posturepro.domain.distributionsummary.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

public record PercentileBinDto(int bin, int lowerBound, int upperBound, int memberCount) {

	public static PercentileBinDto from(ResultSet rs, int _rowNum) throws SQLException {
		return new PercentileBinDto(
			rs.getInt("bin"),
			rs.getInt("lower_bound"),
			rs.getInt("upper_bound"),
			rs.getInt("member_count")
		);
	}
}
