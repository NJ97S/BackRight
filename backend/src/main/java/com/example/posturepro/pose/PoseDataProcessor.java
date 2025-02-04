package com.example.posturepro.pose;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PoseDataProcessor {
	private final ObjectMapper objectMapper;  // JSON 파싱을 위한 ObjectMapper
	private final InitialPose initialPose;    // 기준 포즈 설정 및 체크를 위한 객체

	// todo 각 도메인, 서비스 만들기
	// private DetectionService detectionService;
	// private SessionService sessionService;

	private LocalDateTime detectionEndTime;
	private LocalDateTime detectionStartTime;
	private String videoUrl;
	private int detectionCode;
	private int alertCount;

	public PoseDataProcessor() {
		objectMapper = new ObjectMapper();
		initialPose = new InitialPose();
		// detectionService = new DetectionServiceImpl();

		// todo. DB에 세션 생성 + 현재시간 들고 가야할지도?(서버랑 DB랑 시간이 같을까?)

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
			System.out.println("JSON 데이터를 파싱하는 중 오류 발생" + jsonData);
		}
		return parsedData;
	}

	public void analyzeErrorPoseData(boolean[] isValid, int[] detectionCount) {
		// todo. 얼굴 쪽 유효성 확인

		// 왼쪽 어깨 유효성 확인
		if (!isValid[11])
			detectionCount[1]++;

		// 오른쪽 어꺠 유효성 확인
		if (!isValid[12])
			detectionCount[2]++;

		// 양쪽 어깨 = 허리 유효성 확인
		if (!isValid[11] && !isValid[12])
			detectionCount[3]++;

	}

	// 파싱된 포즈 데이터를 기준 포즈로 설정
	public String processPoseData(String jsonData) {
		List<BodyLandmark[]> poseList = parsePoseData(jsonData);
		PoseResponse response = new PoseResponse();
		int[] detectionCount = new int[4];

		for (BodyLandmark[] pose : poseList) {
			if (!initialPose.getSet()) { // 아직 초기자세 세팅이 안되었을 떄
				response.setInitialSet(false);
				boolean isSet = initialPose.setInitialPose(pose);

				if (isSet)
					response.setInitialSet(true);

			} else {
				boolean[] isValid = initialPose.checkPose(pose);
				analyzeErrorPoseData(isValid, detectionCount);
			}
		}

		boolean countUp = false;
		for (int i = 0; i < 4; i++) {
			if (detectionCount[i] == 10) {
				if (!countUp) {
					alertCount++;
					countUp = true;
				}
				response.addError(i);
			}
		}

		if (!countUp) {
			if (detectionStartTime != null) {
				detectionEndTime = LocalDateTime.now();
				// todo DB에 detection 등록
				// detectionService.insertDetection(sessionInfo.id, detectionStartTime, detectionEndTime, videoUrl,
				// 	detectionCode);
				detectionStartTime = null;
			}
			alertCount = 0;
		}

		if (alertCount >= 20) {
			response.setDetected(true);
			if (detectionStartTime == null) {
				// todo videoUrl 받아오기
				// videoUrl = dosomething
				response.setVideoUrl(videoUrl);
				detectionStartTime = LocalDateTime.now().minusSeconds(10);
			}
		}

		return response.JSONString();
	}

}