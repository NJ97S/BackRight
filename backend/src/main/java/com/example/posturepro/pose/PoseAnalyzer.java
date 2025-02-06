package com.example.posturepro.pose;

import java.time.Instant;
import java.util.ArrayList;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.detection.entity.DetectionDto;
import com.example.posturepro.detection.entity.DetectionType;
import com.example.posturepro.detection.service.DetectionService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class PoseAnalyzer {
	private final ObjectMapper jsonMapper;  // JSON 파싱을 위한 ObjectMapper
	private final StandardPoseHandler standardPoseHandler;    // 기준 포즈 설정 및 체크를 위한 객체

	// todo 각 도메인, 서비스 만들기
	private final DetectionService detectionService;
	private final AnalyzingSessionService analyzingSessionService;

	private DetectionDto detectionDto;
	private final AnalyzingSession session;
	private int continuousDetectionCount;

	private final int ALERT_DETECTION_COUNT = 20;

	private Map<DetectionType, Integer> detectionCounts;

	private void initializeDetectionCounts() {
		for (DetectionType type : DetectionType.values()) {
			detectionCounts.put(type, 0);
		}
	}

	public PoseAnalyzer(AnalyzingSessionService analyzingSessionService, DetectionService detectionService) {
		this.analyzingSessionService = analyzingSessionService;
		this.detectionService = detectionService;
		jsonMapper = new ObjectMapper();
		standardPoseHandler = new StandardPoseHandler();

		// todo. DB에 세션 생성 + 현재시간 들고 가야할지도?(서버랑 DB랑 시간이 같을까?)
		session = analyzingSessionService.createSession();
	}

	// 파싱된 포즈 데이터를 기준 포즈로 설정
	public String analyzePoseDataProcess(String jsonData) {
		List<BodyLandmark[]> parsedPoseDataList = parsePoseDataFromJson(jsonData);

		PoseResponse response = new PoseResponse();

		detectionCounts = new EnumMap<>(DetectionType.class);
		initializeDetectionCounts();

		for (BodyLandmark[] pose : parsedPoseDataList) {
			if (handleInitialPoseSetup(pose, response)) {
				boolean[] poseMatchingData = standardPoseHandler.isPoseMatching(pose);
				analyzePoseDetectionData(poseMatchingData);
			}
		}

		handleDetectionCounts(response);

		if (continuousDetectionCount >= ALERT_DETECTION_COUNT) {
			handleContinuousAlert(response);
		}

		return response.JSONString();
	}

	// JSON 형식의 문자열을 파싱하여 PoseNode 객체 배열로 변환
	public List<BodyLandmark[]> parsePoseDataFromJson(String jsonData) {
		List<BodyLandmark[]> parsedPosesData = new ArrayList<>();
		try {
			// JSON 문자열을 객체 배열로 파싱
			List<List<BodyLandmark>> rawPoseData = jsonMapper.readValue(jsonData,
				new TypeReference<>() {
				});

			// 각 PoseNode 배열로 변환하여 리스트에 추가
			for (List<BodyLandmark> poseArray : rawPoseData) {
				parsedPosesData.add(poseArray.toArray(new BodyLandmark[0]));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return parsedPosesData;
	}

	public void analyzePoseDetectionData(boolean[] poseMatchingData) {
		// todo. 얼굴 쪽 유효성 확인

		// 왼쪽 어깨 유효성 확인
		if (!poseMatchingData[11])
			detectionCounts.compute(DetectionType.LEFT_SHOULDER, (key, val) -> val + 1);

		// 오른쪽 어꺠 유효성 확인
		if (!poseMatchingData[12])
			detectionCounts.compute(DetectionType.RIGHT_SHOULDER, (key, val) -> val + 1);

		// 양쪽 어깨 = 허리 유효성 확인
		if (!poseMatchingData[11] && !poseMatchingData[12])
			detectionCounts.compute(DetectionType.BACK, (key, val) -> val + 1);
	}

	private boolean handleInitialPoseSetup(BodyLandmark[] pose, PoseResponse response) {
		if (!standardPoseHandler.isPoseSet()) {
			response.setInitialSet(false);
			boolean isPoseSet = standardPoseHandler.setInitialPose(pose);
			if (isPoseSet) {
				response.setInitialSet(true);
			}
			return isPoseSet;  // 초기 포즈 설정 완료
		}
		return true;  // 이미 초기 포즈가 설정됨
	}

	private void handleDetectionCounts(PoseResponse response) {
		boolean countUp = false;
		for (Map.Entry<DetectionType, Integer> entry : detectionCounts.entrySet()) {
			if (entry.getValue() == 10) {
				if (!countUp) {
					continuousDetectionCount++;
					countUp = true;
				}
				response.markDetection(entry.getKey());
			}
		}

		if (!countUp) {
			if (detectionDto != null) {
				detectionDto.setDetectionEndTime(Instant.now());
				// todo DB에 detection 등록
				detectionService.insertDetection(detectionDto, session);

				detectionDto = null;
			}
			continuousDetectionCount = 0;
		}
	}

	private void handleContinuousAlert(PoseResponse response) {
		response.setDetected(true);
		if (detectionDto == null) {
			detectionDto = new DetectionDto();
			// todo 비디오 URL 가져오기 로직 추가
			String videoUrl = "";
			detectionDto.setVideoUrl(videoUrl);
			response.setVideoUrl(videoUrl);
			detectionDto.setDetectionStartTime(Instant.now().minusSeconds(10));
		}
	}
}