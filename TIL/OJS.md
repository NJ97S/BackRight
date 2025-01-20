# TIL (Today I Learned)
## 2025-01-13
- 프로젝트 기획 과정에서 고려해야 할 것
    - Pain Point와 Charming Point

## 2025-01-14
- 프로젝트 기획 과정에서 고려해야 할 것 2...
    - 같은 기능이라도 조금 더 구체적이고 공감할 수 있는 상황과 페르소나

## 2025-01-15
- Git 기초와 branch 전략
    - commit, branch, merge
    - git flow, github flow, gitlab flow
        - 프로젝트 환경에 맞는 브랜치 전략 사용하기
- Pose Estimation AI [리서치](https://github.com/google-ai-edge/mediapipe) 및 [테스트](https://mediapipe-studio.webapps.google.com/demo/pose_landmarker?hl=ko)
- 자세 예측으로 나온 결과물을 바탕으로 올바른 자세인지 확인하는 문제를 어떻게 치환시킬지?
    - classification이라면 [예시](https://teachablemachine.withgoogle.com/train/pose)

## 2025-01-16
### 개인 생산성 향상법
- TODO -> 더 나은 무언가는 없나?

- GTD (Get Things Done)
    - 할 일을 알고리즘에 따라 분류
        - Is actionable? 	-> trash | reference | someday
    - 다음 액션
        - 싱글
            - 2분 바로
            - no -> defer | delegate
        - 멀티

    - PQ 맨 밑에서 계속 남는다면 버린다

- 아이젠하워 매트릭스
    - Urgent, Important, Not Urgent, Not Important

- 만트라트
    - 오타니

- 뽀모도로
    - 25분 5분 -> 4번 후 휴식 

- 타임 박싱
    - 일정 시간 내에 특정 작업을 끝내겠다는 목표를 세우는 것

- 타임 블로킹
    - Focus time -> 특정 시간 동안 자기 업무에만

- PARA method
    - Project: 진행중
    - Area: 관심
    - Resource: 링크 같은 것
    - Archive: 완료 후 아카이빙
    - second brain
        - 내 뇌와 비슷한 방식으로 정보를 저장해두자

- 제텔카스텐 (메모 상자)
    1. 임시적, 영구적 메모를 수시로 작성
    2. 연관된 메모들을 인덱스 카드로 관리
    3. 연관된 메모들끼리도 서로 가리키게 기록

### WebRTC
- 플러그인 없이 웹 브라우저에서 실시간 통신을 구현
- 프로젝트에서 어떻게 WebRTC 사용할 지 구상

### 프로젝트
- 프로젝트 기획 구체화
- Jira 설정

## 2025-01-17
### 프로젝트와 기술, 포폴
- 왜 이 기술을 썼는가
- 기술에 대한 당위성
- FAQ
    - Q1. 프로젝트가 많아야 할까요?
    - A. 많으면 Job Description에 딱 맞는 포폴할 땐 Good
    - Q2. 프로젝트가 화려해야할까요?
    - A. Y -> 공채 필터링 피해야 N -> 팀별 모집 팀에 맞는 스택 | 경험
- Base가 되는 포폴 하나를 두고 지원할 때마다 조금씩- 튜닝
### 기획 구체화
- 예상되는 문제점들을 정리하고 해당 문제들을 어떻게 처리할 지 고민해보는 시간을 가졌습니다.
    - 자리비움 / 인식불가 문제
    - 일일 기준 집계시간을 언제로 할지
- Usecase Diagram
### Media Recorder API
- 자세가 무너졌음을 감지했을 때 해당 영상을 다시 보여줘서 사용자에게 다시 보여줄 방법으로 채택해보고자 공부
- 브라우저에서 영상을 일정 주기로 저장하고 플레이 백하는 방법'

## 2025-01-20
### 탐지 및 보고서 관련 DB 설계
- 실시간 탐지 서비스 특성상 한번 탐지된 내용에 변화가 일어날 가능성이 매우 낮다
- 각 session은 user_id를 참조한다
- 각 detection은 session_id를 참조한다
- 각 session에 대한 통계 데이터를 미리 캐싱한다면 성능을 높일 수 있을 것
<br>
    → report 테이블을 유지한다?
    
    - 예상 문제점
    
    1. report 내부의 데이터들은 무결성을 보장할 수 없다
        
        → session과 detection은 session이 종료된 순간 수정될 여지가 없다.
        
    2. report 내부의 데이터를 정규화하는 것이 더 큰 오버헤드를 발생 시킨다.
        
        → nosql을 써본다? user 테이블을 nosql과 rdbms 양쪽에 유지해야하지 않나? → 기각
        
- 결론: 비정규화된 형태로 report 테이블을 구성해보는 것도 좋을 듯 → 추가 성능 향상 필요 시 고려