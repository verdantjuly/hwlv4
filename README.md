# Node.js Lv.4

## Q & A

1. 좋아요 API는 어떻게 구현하였나요? 만약 1개로 구현하였다면, 분기 처리는 어떻게 처리하였나요?

   1-1. 매개변수로 받은 postId와 userId로 존재하는 likeId를 검색합니다.  
   1-2. 둘 다 일치하는 likeId가 존재한다면 한 번 좋아요를 눌러서 likeId가 생성된 것이므로 destroy를 통해 삭제하여 해당 정보로 조회되는 likeId 숫자를 낮춥니다.  
   1-3. 분기 처리는 if문으로 1-2의 생성 정보가 있는 지 없는 지 확인하여 처리하였습니다.  
   if (!target)  
   target은 매개변수의 postId, userId 와 일치하는 likeId

2. 게시글 조회에서 좋아요 갯수는 어떻게 가져왔나요? 구현한 방법이 가장 효율적인 방법이었을까요?  
   좋아요 개수는 postId와 일치하는 개수를 count 메서드를 통해 파악하여 조회되는 결과에 likesCount 라고 하는 프로퍼티를 추가하여 표현하였습니다. 제가 조사한 바로는 가장 효율적인 것 같습니다.

## ERD

![ERD](https://i.postimg.cc/prqWLGXS/draw-SQL-hw1v4-erd-export-2023-07-08.png)

## API

https://verdantjuly.gitbook.io/hwlv4/
