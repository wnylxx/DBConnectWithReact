# 구성 및 동작 방식

### 1️⃣ 서버 내부에서 데이터 조회 및 API 제공

서버 내부에서 Node.js 기반의 API 서버를 실행합니다.

API 서버는 MariaDB에 접속하여 데이터를 조회하고 JSON 형식으로 반환합니다.

API는 특정 엔드포인트를 통해 데이터를 제공하며, 웹 브라우저 또는 외부 요청에서 접근할 수 있습니다.

### 2️⃣ 외부 PC에서 API 호출을 통한 데이터 조회

외부 PC에서는 웹 브라우저 또는 클라이언트 프로그램을 이용해 서버 API에 요청을 보냅니다.

서버는 MariaDB에서 조회한 데이터를 JSON 형식으로 응답합니다.

외부 PC에서는 해당 데이터를 UI로 표시하거나 활용할 수 있습니다.
