package com.example.posturepro.domain.distributionsummary.util;

import java.time.LocalDate;
import java.time.Period;

public class AgeUtil {
	public static String getAgeRange(LocalDate birthDate) {
		if (birthDate == null) {
			throw new IllegalArgumentException("birthDate cannot be null");
		}

		int age = Period.between(birthDate, LocalDate.now()).getYears();

		if (age < 20) {
			return "-19";
		}
		if (age < 30) {
			return "20-29";
		}
		if (age < 40) {
			return "30-39";
		}
		if (age < 50) {
			return "40-49";
		}
		if (age < 60) {
			return "50-59";
		}
		return "60-";
	}
}