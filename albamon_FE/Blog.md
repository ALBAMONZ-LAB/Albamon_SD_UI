![img.png](blog_img/img.png)

> '이거 오늘 배포 가능하죠?
>
> 💢 개발자들: "🤬"
>
> SD-UI: "네, 가능합니다."

팀워크 강화와 야근 퇴치의 필수 기술, Server Driven UI 적용기 지금부터 시작해보자.

# Server Driven UI 적용기

## What is the Server Driven UI?

철학과 수업에 가면 가장 먼저 명칭부터 공고히 한 뒤 그 다음 논의로 나가곤 한다. 나쁠 것은 없으니 우선 그대로 따라, 그 명칭부터 짚고 넘어가자. Server Driven UI 라고 하면, UI is made by Server 라고 나름 변환해 볼 수 있겠는데, 
요컨데 '서버가 주도하는 UI'를 통칭한다고 할 수 있겠다.

서버가 UI를 변환한다는게 뚱딴지같다. 

현 시점에서 통상적인 개발 범위는 화면 단을 다루는 프론트엔드 개발자이냐, 데이터를 다루는 백엔드 개발자이냐 둘 중 하나로 나눠지는게 아닌가?

서버에서 UI를 보내준다는건 어떤 의미인가? 복잡한 단계의 디자인은 어떻게 처리를 하라는 이야기일까? 

![img_1.png](img_1.png)

[//]: # (![img_2.png]&#40;img_2.png&#41;)

## SD-UI 를 어디에 적용할 수 있는데?

알바몬 페이지 내 어디에 적용해볼지 고민을 해 보았는데,
다음과 같은 사유로 이벤트 페이지에 적용하기로 결정하였습니다.

신규 이벤트를 개발하기 위해서 다음과 같은 작업을 반복해야 했습니다.

- 유사한 Layout 신규 생성
- 스타일 수정 등 간단한 작업에도 배포 공수 소모
- 기간 변경/특정 유저에게 다른 UI 제공 

(기존 이벤트 페이지 이미지)

## 기대효과

- 이러한 케이스의 경우
- 기존의 경우 :
- SD-UI 적용하였을 경우 : 

[//]: # (간단한 업무는 자동화를 시킴으로, 무의미한 반복노동을 줄일 수 있습니다.)

[//]: # ()
[//]: # (또한 기획자의 요구를 즉각적으로 받아들여, 빠른 배포 프로세스를 가질 수 있습니다.)

## 반영 내용

SD-UI를 도입하면서 데이터 뿐 아니라 디자인 정보도 서버가 함께 내려주게 됩니다.

예시를 들어볼까요?

```typescript
return {
  resultCode: 'SUCCESS',
  resultMessage: '성공',
  totalCount: 80,
  row: 2,
  column: 4,
  collection: [
    {
      franchiseCode: 46,
      franchiseName: '던킨',
      franchiseLogo:
        'https://imgs.albamon.kr/images/franchise_booth/46/MBrandMain_Logo.gif',
      keywordCode: '1080001',
      keywordName: '',
      partCode: '1080',
      partName: '',
    },
    {
      franchiseCode: 47,
      franchiseName: 'CJ 올리브영',
      franchiseLogo:
        'https://imgs.albamon.kr/images/franchise_booth/47/MBrandMain_Logo_1.gif',
      keywordCode: '2060016',
      keywordName: '',
      partCode: '2060',
      partName: '',
    },
  ],
};
```

다음의 데이터를 받아서, 다음과 같은 화면을 구성할 수 있습니다.

(이미지)

data.row, data.column 을 통해 row, column으로 이루어진 표의 레이아웃을 변경할 수 있습니다.

데이터 변경 후, 실제 배열이 변경된 것을 확인할 수 있습니다.

(이미지)

과거 행과 열이 클라이언트에 박혀있었기 때문에, 배열을 바꾸려면 클라이언트 수정이 필요했습니다.
하지만, SD-UI를 통한다면, 클라이언트 수정 없이 서버의 응답 값만 바꾸는 것 만으로 자유롭게 레이아웃을 조정할 수 있습니다.


## 사용 기술


## 구조


## 회고