# Node.js Lv.4

## How To Run

1. ./config/config.json 안의 항목들을 채워 주세요.
2. controllers/users.controller.js 와 middlewares/auth-middleware.js  
   상단의 secretkey 와 rsecretky를 채워 주세요. jwt의 시크릿키입니다.
3. npm install
4. npx sequelize db:create
5. npx sequelize db:migrate

## Q & A

1. 좋아요 API는 어떻게 구현하였나요? 만약 1개로 구현하였다면, 분기 처리는 어떻게 처리하였나요?

   1-1. 매개변수로 받은 postId와 userId로 존재하는 likeId를 검색합니다. 이때 userId는 로그인 토큰으로부터 가져온 정보입니다.  
   1-2. 둘 다 일치하는 likeId가 존재한다면 한 번 좋아요를 눌러서 likeId가 생성된 것이므로 destroy를 통해 삭제하여 해당 정보로 조회되는 likeId 숫자를 낮춥니다.  
   1-3. 분기 처리는 if문으로 1-2의 생성 정보가 있는 지 없는 지 확인하여 처리하였습니다.  
   if (!target)  
   target은 매개변수의 postId, userId 와 일치하는 likeId

2. 게시글 조회에서 좋아요 갯수는 어떻게 가져왔나요? 구현한 방법이 가장 효율적인 방법이었을까요?  
   좋아요 개수는 postId와 일치하는 개수를 count 메서드를 통해 파악하여 조회되는 결과에 likesCount 라고 하는 프로퍼티를 추가하여 표현하였습니다. 동기들과 이야기를 나누며 구현한 방법보다 효율적인 방법을 찾았습니다. Lv.5 과제에 적용할 수 있다면 도전해 보겠습니다.

## ERD

![ERD](https://i.postimg.cc/prqWLGXS/draw-SQL-hw1v4-erd-export-2023-07-08.png)

## API

https://verdantjuly.gitbook.io/hwlv4/

## Lv.5 에서 업데이트 예정

- bcrypt 암호화 위치 이동 (controller > service)
