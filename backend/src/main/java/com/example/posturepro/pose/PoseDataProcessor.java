package com.example.posturepro.pose;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PoseDataProcessor {
	private final ObjectMapper objectMapper;  // JSON 파싱을 위한 ObjectMapper
	private final InitialPose initialPose;    // 기준 포즈 설정 및 체크를 위한 객체

	public PoseDataProcessor() {
		objectMapper = new ObjectMapper();
		initialPose = new InitialPose();
	}

	// JSON 형식의 문자열을 파싱하여 PoseNode 객체 배열로 변환
	public List<BodyLandmark[]> parsePoseData(String jsonData) {
		List<BodyLandmark[]> parsedData = new ArrayList<>();
		try {
			// JSON 문자열을 객체 배열로 파싱
			List<List<BodyLandmark>> rawPoseData = objectMapper.readValue(jsonData,
				new TypeReference<>() {
				});

			// 각 PoseNode 배열로 변환하여 리스트에 추가
			for (List<BodyLandmark> poseArray : rawPoseData) {
				BodyLandmark[] bodyLandmarks = poseArray.toArray(new BodyLandmark[0]);
				parsedData.add(bodyLandmarks);
			}
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("JSON 데이터를 파싱하는 중 오류 발생");
		}
		return parsedData;
	}

	public void analyzeErrorPoseData(boolean[] isValid, int[] errorCount) {
		// 얼굴 쪽 유효성 확인

		// 왼쪽 어깨 유효성 확인
		if (isValid[11])
			errorCount[1]++;
		// 오른쪽 어꺠 유효성 확인
		if (isValid[12])
			errorCount[2]++;
		// 양쪽 어깨 = 허리 유효성 확인
		if (isValid[11] && isValid[12])
			errorCount[3]++;
	}

	// 파싱된 포즈 데이터를 기준 포즈로 설정
	public String processPoseData(String jsonData) {
		List<BodyLandmark[]> poseList = parsePoseData(jsonData);
		PoseResponse response = new PoseResponse();
		int[] errorCount = new int[4];

		for (BodyLandmark[] pose : poseList) {
			if (!initialPose.getSet()) { // 아직 초기자세 세팅이 안되었을 떄
				boolean isSet = initialPose.setInitialPose(pose);
				if (isSet) {
					response.setInitialSet(true);
				}
			} else {
				boolean[] isValid = initialPose.checkPose(pose);
				analyzeErrorPoseData(isValid, errorCount);
			}
		}

		for (int i = 0; i < 4; i++) {
			if (errorCount[i] == 10) {
				response.addError(i);
			}
		}
		return response.JSONString();
	}

	// 테스트용 코드 나중에 없앨 것
	public static void main(String[] args) {
		PoseDataProcessor processor = new PoseDataProcessor();

		// JSON 포즈 데이터를 예시로 처리
		String jsonExample = "[[{\"x\":0.1,\"y\":0.2,\"z\":0.4},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7},{\"x\":0.5,\"y\":0.6,\"z\":0.7}]]";

		processor.processPoseData(jsonExample);
	}
}