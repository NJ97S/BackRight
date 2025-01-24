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

## 2025-01-21
### Indexing
- Clustered Index: 
    - PK
    - 실제로 군집해 있고 물리적 정렬로 관리
    - 삽입 삭제 시 새로 정렬 -> 비교적 느림
- Non-Clustered Index:
    - 목차
    - 별도 공간에 저장
    - PK 보다 삽입 삭제 빠르지만 리소스 필요
    - 여러 공간을 참조하는데 드는 시간에 대한 고려 필요
- B-tree, B+tree
    - B+tree는 leaf node를 linked list로 연결 -> 범위 검색에 유리
- Indexing 팁
    - join 키
    - 카디널리티가 높은 값
### WebRTC 통신의 흐름
- Signaling
    - WebRTC 연결을 설정하기 위해 두 Peer가 서로 연결 정보를 교환하는 과정
        1. SDP 교환: 세션 정보 기술
        2. ICE Candidate 교환: P2P 연결에 사용되는 네트워크 정보
    - WebRTC는 Signaling 방법을 정의하지 않기 때문에 다른 통신 프로토콜을 사용해서 두 Peer간 Signaling을 진행한다.
- ICE Gathering
    1. ICE Agent: 각 Peer가 네트워크 경로 검색
    2. ICE Candidate 수집: 발견한 네트워크 경로를 상대방에 전달
- NAT Traversal
    - NAT 뒤에 있는 Peer간 연결
    1. STUN
    2. TURN
- Connection
    1. ICE Candidate 검증
    2. DTLS 설정: Data Transport Layer Security 보안 설정
    3. SRTP/SCTP 채널
        - SRTP: 오디오/비디오 스트림
        - SCTP: 데이터 스트림
### 오늘의 Trouble shooting
1. Kurento는 미디어 서버고 우리는 데이터만 송수신하면 되는데 필요 없는거 아닐까?
2. Kurento 없이 그냥 Signaling 후에 데이터를 송수신하려고하니 WebRTC가 통신 흐름에서 없어졌다.
3. Kurento에서 Data Channel을 이용해서 Data를 송수신 하려고 했는데 서버는 중개만 할 뿐 Kurento Client를 통해서는 접근할 수 없었다.
4. 서버를 하나의 Peer로 만들어야 할 것 같다. -> 어떻게 해야할까...

## 2025-01-22
### webrtc-java
- server내에 peer를 만드는 일환으로 Java에서 WebRTC API를 구현해 놓은 [Webrtc-java](https://github.com/devopvoid/webrtc-java) repo를 사용해보기로 했다.
- webrtc-java는 demo나 documentation이 따로 준비돼있지 않아 test code와 코드를 보며 사용법을 유추해보고 있다.
- webrtc-java가 mdn의 WebRTC를 충실히 구현했다면 MDN의 [자바스크립트 예시](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling)를 바탕으로 비슷하게 구현할 수 있을 것이라고 판단했다.
- 대부분의 내용과 흐름을 확인했고 WebSocket으로 client에서 offer를 넣는 시그널링 작업의 초입부까지 구현했다.

## 2025-01-23
### WebRTC
- webrtc-java를 사용해서 peer를 띄우는 것 까지는 성공했다.
- Observer 패턴을 사용해서 SetDesciption, CreateDescription, PeerConnection 을 관리하는데 직접 구현해야 하는 부분과 그렇지 않은 부분을 잘 분리하는 게 관건이였다.
- 대략의 흐름
    1. js 쪽 client에서 offer를 만들어 SignalingHandler에 송신
    2. SignalingHandler에서 Java쪽 PeerConnection 옵저버에게 전달
    3. SetRemoteDescription
    4. createAnswer
    5. session을 통해 answer 송신
    - offer가 도착하는 시점 즈음부터 ICE Candidate를 서로 주고받는 것으로 보인다.
    - onIceCandidate는 local에서 ICE Agent가 Candidate를 발견했을 때 trigger
    - onNewIceCandidate는 세션을 통해 ICE Candidate를 수신 받았을 때 trigger
- 이런 흐름을 통해 ICE Candidate state 가 completed 되고 WebRTC state 도 stable인 상태까지 구현했다.
- 아직 이해가 되지 않는 점
    - ICE Candidate를 서로 주고 받는 과정이 언제 실행되는가?
        -> Data Channel을 연결하기 전까지는 ICE Servers에 ICE Server를 명시해도 ICE Candidate를 주고 받지 않았다.
- 내일 할 일
    1. Data Channel을 연결하고 Data를 주고 받는 것
    2. 여러 js Peer에 대해 동시에 처리할 능력이 있는지 테스트

## 2025-01-24
### WebRTC
- ICE candidate 교환 과정에서 java와 js에서 형식이 달라서 발생한 오류 수정
- Data Channel을 open하고 data를 주고 받는 과정
    - Data Channel은 양방향이고 한쪽이 open하면 반대쪽에서 onDataChannel 이벤트가 발생한다.
- WebSocket 세션은 비동기적으로 동작하기 때문에 이전에 있는 Message가 송신이 완료되지 않았을 때 새로운 메시지를 보내면 에러가 발생한다.
    - Answer 메시지가 도착하기전에 Ice Candidate 메시지를 보내서 발생했다.
    ``` java
    Exception in thread "Thread-8" java.lang.IllegalStateException: 
    The remote endpoint was in state [TEXT_PARTIAL_WRITING] which is an invalid state for called method
	at org.apache.tomcat.websocket.WsRemoteEndpointImplBase$StateMachine.checkState(WsRemoteEndpointImplBase.java:1250)
    ```
    -> 이를 해결하기 위해 SessionHandler를 만들고 Message를 큐에 넣어 하나씩 보내고 완료되면 다음껄 보내도록 수정
- 해야할 일 (부족하다고 느끼는 것)
    - WebSocket을 관리하는 `SignalingHandler`와 `PeerConnectionObserver`를 implements하는 `ServerConnection`의 강한 결합
        <br>-> `onIceCandidate` 이벤트를 `SignalingHandler`가 직접 해결할 수 없기 때문에 `ServerConnection` 내부에서 직접 session을 의존하는 구조
        - 이를 해결하기 위해 event listner를 추가해 느슨한 결합 구조로 바꾸고자함.
    - Prototype 완성하기
        - client-prototype 브랜치를 만들고 데이터 송수신까지 해서 올리기
