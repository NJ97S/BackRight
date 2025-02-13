package com.example.posturepro.pose;

import lombok.Data;

@Data
public class BodyLandmark {
	double x, y, z, visibility;

	BodyLandmark() {
	}

	BodyLandmark(double x, double y, double z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}
