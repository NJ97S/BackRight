package com.example.posturepro.analyzingsession.entity;

public enum AnalyzingSessionStatus {
	RUNNING,   // 진행 중
	FINISHED,  // 종료됨
	ABSENT,    // 자리비움 (감지되지 않음)
	FORCED     // 강제 종료 (잘못된 자세가 너무 오래 지속됨)
}