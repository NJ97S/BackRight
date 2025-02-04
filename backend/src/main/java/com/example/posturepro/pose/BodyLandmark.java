package com.example.posturepro.pose;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class BodyLandmark {
	@Setter
	@Getter
	String name;
	double x, y, z;

	public BodyLandmark() {
	}

	public BodyLandmark(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	public BodyLandmark(String name, double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

}
