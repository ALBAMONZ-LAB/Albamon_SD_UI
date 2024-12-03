```html
<meta
  name="description"
  content="GraphQL과 Apollo Server로 SDUI 구현하기: REST API의 오버패칭 문제 해결과 서버 주도 UI 개발 경험 공유"
/>
```

# 🔥 REST API 때려치우고 GraphQL, Apollo Server 도입한 후기

안녕하세요!
알바몬제트개발팀의 김규리입니다.
오늘은 Server Driven UI 파일럿를 진행하며 GraphQL, Apollo Server를 도입하게 된 과정을 공유하고자 합니다.
가볍게 읽어주시면 감사할 것 같습니다😄

## 😱 프롤로그: "GraphQL과 첫 번째 기억"

때는 제가 0년차 개발자이던 시절... (2021년 정도)
첫 회사에 다녔던 병아리 개발자인 저는 아무것도 알지 못했지만 그래도 어떠한 문제점을 느꼈던 것 같습니다.
당시 제가 느꼈던 가장 큰 문제점은 프론트엔드에서 필요한 데이터는 일부분뿐인데, 백엔드에서는 불필요하게 전체 데이터를 모두 전송하고 있다는 점이었습니다.

"음... 이건 뭔가 비효율적이지 않나?" 라는 생각이 자주 들었습니다.

예를 들어, 프론트엔드는 상품의 가격 정보만 있으면 되는데 백엔드에서 상품의 모든 정보와 판매자 및 구매자의 정보까지 모조리 보내주고 있었습니다. 처음에는 체감상 큰 문제는 없어서 방치했습니다. 하지만 해당 API는 다른 기능에서도 사용되고 있었기에 요구사항에 따라 변경되었고, 이에 따른 JOIN 쿼리가 많아지면서 문제가 생기기 시작했습니다.

![alt text](image-5.png)

이 페이지에 보여줄건 가격 정보 단 하나인데 왜 이렇게 느리고 뚱뚱한 데이터를 받아서 페이지가 느려져야 하는지 억울한 마음이 들었습니다.

이것은 오버패칭이라고 불리는 REST API의 문제 중 하나인데, 해결하기 위한 방법 중 하나는 바로 필요한 데이터만 받아오는 API를 새로 만드는 것이었습니다! 와 정말 놀랍다...~~귀찮다~~

<!-- "" //대사 추가 친구와 대화하다 알게되었다는 느낌으로 -->

그러다 어느 날 팀 동료와 점심을 먹으며 이야기를 하다가...

"아 진짜 이 API에서 필요한 데이터만 받아올 수 있으면 좋겠다...🤔"

"GraphQL 한번 찾아봐. 그거 쓰면 그런 거 다 해결할 수 있어."

![alt text](image-11.png)

처음 들어보는 GraphQL이란 단어에 궁금증이 생겨 찾아보게 되었습니다.

![alt text](image-2.png)

<!-- // 너무 빨리 넘어가면 안되는 부분 : 독자가 설득이 안됨 -->

<!-- // GraphQL을 알게 되었는데 찾아보니 이런 장점과 단점이 있는데 이런건 해결할 수 있는 장점들이다. 내가 깨달은 것 처럼 작성하기 -->

GraphQL을 찾아보니 2019년부터 존재했던 기술이었습니다. 더 자세히 알아보니 제가 겪고 있던 문제들을 해결할 수 있는 여러 장점들이 있었습니다.

1. **오버패칭 문제 해결**: 클라이언트가 필요한 데이터만 요청할 수 있다.
2. **유연한 데이터 요청**: 하나의 엔드포인트로 여러 종류의 데이터를 원하는 형태로 받아올 수 있다.
3. **타입 시스템**: 강력한 타입 체크로 런타임 에러를 줄일 수 있다.

이런 장점들을 보면서 "와, 이거 정말 우리가 겪고 있는 문제들을 해결할 수 있겠는데?" 하는 생각이 들었습니다.

![alt text](image-13.png)

이것을 알게 된 후, 당시 Spring Boot로 서버를 구축하고 있었는데 과감하게 연동을 시도해보았습니다. 결과적으로는 성공하지 못했고, 더 시급한 업무들이 쌓여 깊이 있게 연구할 시간이 부족했습니다.

모르는 것은 모른다고 말하고 모르는 것을 알아가는 것이 개발자의 삶 아니겠습니까?😆 이때부터 GraphQL은 완수하지 못한 과제처럼 마음 한구석에 남아 있었던 것 같습니다.

만 2년의 시간이 흐르고 3년차가 된 지금, 저는 알바몬에서 새로운 도전을 시작하게 되었습니다. 우리 팀에서는 이벤트 페이지 개발과 관련된 고민이 있었습니다. 대부분의 이벤트 페이지들이 타이틀, 이미지, 버튼 등 비슷한 구조를 가지고 있었는데요. 문제는 새로운 이벤트가 있을 때마다 비슷한 구조임에도 매번 새로 개발하고 배포해야 한다는 점이었습니다. 이 과정에서 불필요한 시간이 많이 소요되고 있었죠.

"매번 비슷한 컴포넌트를 새로 만드는게 비효율적이지 않나..."

"이벤트 페이지 구조를 좀 더 체계적으로 관리할 수 없을까?"

이런 고민을 팀원들과 나누던 중, 사수님께서 Server Driven UI라는 개념을 소개해 주셨습니다. UI 구조를 서버에서 제어하면 프론트엔드 배포 없이도 유연하게 화면을 구성할 수 있고, 컴포넌트를 정형화하여 재사용성을 높일 수 있다는 것이 었습니다. 이렇게 하면 매번 새로운 이벤트 페이지를 만들 때마다 비슷한 컴포넌트를 반복해서 개발하는 문제도 해결할 수 있을 것 같았습니다.

팀 내 논의 끝에 SDUI 도입을 검토해보기로 했고, 리서치를 하던 중 흥미로운 사실을 발견했습니다. 바로 SDUI가 GraphQL과 궁합이 정말 좋다는 것이었습니다.

그 순간 제 머릿속에서 2년 전의 기억이 떠올랐습니다.
"이거다! 드디어 GraphQL을 제대로 써볼 기회가 왔구나!"

저는 완수하지 못한 과제를 이번에야 말로 해봐야 겠다는 생각을 했습니다.

까짓거 한 번 해보기로 했습니다.😎

![alt text](image.png)

우리 팀은 알바몬에서 SDUI가 필요한 상황을 재현해보고 파일럿을 진행했습니다. 많관부

## 🎯 Episode 1: SDUI가 뭔데? (사실 이미 쓰고 있었을 지도)

<!-- 우리의 상황에 대한 설명이 필요 -->
<!-- 우리가 왜 이런 기술을 써야하는지 설명 -->
<!-- 추가 위 내용을 서론에서 좀 더 추가하였습니다. -->

<!-- 그래서 도입한 것이 SDUI이다. 하고 싶은 말이 많은데... 이건 기대해 주세요 라고 끝냄. -->

간단하게 SDUI (Server Driven UI)이라는게 뭔지부터 짚고 넘어가겠습니다.

어렵게 생각할 것 없이 말 그대로 서버에서 데이터를 조작해서 프론트엔드에 뿌려주는 것입니다.

개념 자체로만 보자면 우리는 이미 Server Driven한 UI를 작성하고 있었을 수도 있습니다. 예를 들어,캐러셀 데이터나 목록 데이터를 백엔드에서 가져와 프론트엔드에 뿌려주는 등의 작업이 있습니다.

이것을 좀 더 심화해서 UI 구조를 서버에서 제어할 수 있도록 만들면 더 SDUI 스러운 시스템을 만들 수 있겠죠.

예를 들자면, 카드 리스트의 row와 column을 자유자재로 바꾸고, 배너의 높이나 버튼을 앱/프론트엔드 배포하지 않고 서버에서 제어할 수 있으면 좋을 것 같지 않나요?

다만, 이 SDUI의 설게에는 개발자의 경험과 요구사항이 크게 좌우하기 때문에 여러 관계자들과 많은 논의가 필요해보였습니다. SDUI에 대한 자세한 내용은 추후 블로그 글에 써보도록 하겠습니다.

이번 시간에는 이런 것이 있다는 것만 알아 두고 GraphQL과 Apollo Server에 대해 이야기 해보겠습니다.

## 🎯 Episode 2: GraphQL이란?

![alt text](image-6.png)
이미지 출처: https://www.wallarm.com/what/what-is-graphql-definition-with-example

GraphQL은 쿼리 언어입니다. 쿼리 언어라는 것은 데이터를 조회하는 언어라는 것을 의미합니다.
기존의 일반적으로 데이티 조회는 백엔드에서 하는 작업이었는데, 이 역할이 프론트엔드로 넘어오게 된 것 입니다.

GraphQL을 사용하는 회사로 대표적으로 Airbnb가 있는데 아래 그림을 한 번 보시죠!

![alt text](image-9.png)
출처 : A Deep Dive into Airbnb’s Server-Driven UI System
https://medium.com/airbnb-engineering/a-deep-dive-into-airbnbs-server-driven-ui-system-842244c5f5

이미지는 Airbnb의 서버 드리븐 UI 시스템입니다.
보시면 각각의 섹션을 나누고 그 안에 데이터를 넣어 놓은 것을 볼 수 있습니다.
추후에 필요한 섹션을 정하고 순서대로 데이터를 넣어 놓으면 프론트엔드에서는 그대로 뿌려주는 것입니다.

그럼 우리도 할 수 있지 않을까!?!?!

![alt text](image-14.png)

이와 비슷하게 알바몬에서 적용할 수는 없을까 고민해보았습니다.

- 타이틀
- 이미지
- 버튼

![alt text](image-35.png)

<!-- 이 페이지를 위의 airbnb처럼 section을 나누어서 보여주기. 스키마도 추가. 세 개의 이미지를 가로로 나열해서 보여주는 느낌으로 -->

요즘 광고 여기저기서 볼 수 있는 핫하신 변우석 님의 얼굴이 담긴 이벤트 페이지 입니다.
이 이벤트 페이지를 섹션으로 나누자면 세 가지로 나눌 수 있습니다.

![alt text](image-34.png)

이것을 GraphQL 스키마로 구성해 보면 다음과 같습니다.

<!-- 접는 기능으로 -->

```tsx
type Query {
  getEventPage: EventPage
}

type EventPage {
  title: Title
  image: Image
  button: Button
}

type Title {
  text: String!
  color: String
  size: Int
}

type Image {
  url: String!
  alt: String
  width: Int
  height: Int
}

type Button {
  text: String!
  link: String!
  color: String
  backgroundColor: String
}
```

이 스키마를 따라 데이터를 가져올 리졸버를 구성합니다.
실제 프로덕션 환경에서는 데이터베이스나 외부 API에서 데이터를 가져오도록 수정하시면 됩니다.

```tsx
const eventPageResolver = {
  Query: {
    getEventPage: () => ({
      title: {
        text: "TVC 플러팅 챌린지",
        color: "#000000",
        size: 24,
      },
      image: {
        url: "https://example.com/event-image.jpg",
        alt: "잘생긴 우석 사진",
        width: 800,
        height: 400,
      },
      button: {
        text: "앱에서 칠린지 참여하기",
        link: "/events/2024",
        color: "#FFFFFF",
        backgroundColor: "#FF0000",
      },
    }),
  },
};

export default eventPageResolver;
```

이렇게 완성한 이벤트 페이지의 리졸버를 메인 리졸버에 통합 시킵니다

```tsx
import eventPageResolver from "./eventPage";

const resolvers = {
  Query: {
    ...eventPageResolver.Query,
  },
};

export default resolvers;
```

끝

단일 엔드포인트로 구성되기에 URI를 지정할 필요도 없습니다.
이렇게 하면 백엔드 구성은 끝났습니다.

이제 클라이언트는 쿼리 요청을 보낼 수 있습니다.

```tsx
query GetEventPage {
  getEventPage {
    title {
      text
      color
      size
    }
    image {
      url
      alt
      width
      height
    }
    button {
      text
      link
      color
      backgroundColor
    }
  }
}
```

그런데 여기서 모든 데이터가 필요하지 않은 경우도 있을 수 있습니다.
그러면 필요한 필드를 선택적으로 가져올 수 있습니다!

```tsx
query GetEventPageMinimal {
  getEventPage {
    title {
      text
    }
    button {
      text
      link
    }
  }
}
```

![alt text](image-15.png)
AMAZING !!

<!-- 이미지 추가 -->

이처럼 GraphQL에는 스키마, 리졸버, 쿼리, 뮤테이션 등의 개념이 있습니다.

이 작업에서 느낄 수 있는 GraphQL의 장점은 이렇습니다.

1. 필요한 데이터만 요청 가능
2. 강력한 타입 시스템
   - 스키마를 통해 데이터의 형태를 명확하게 정의합니다
3. 단일 엔드포인트

(출처: https://www.ibm.com/kr-ko/topics/graphql)

백엔드에서 뷔페 식탁을 차려놓으면 프론트엔드에서는 먹고싶은 것만 골라서 가져옵니다.
REST API가 미리 정해진 세트 메뉴라면, GraphQL은 원하는 만큼만 담아갈 수 있는 뷔페인 셈입니다.

<!-- 세트 메뉴, 뷔페 사진 추가 -->

![alt text](image-19.png) GraphQL 뷔페
출처: https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.tamnao.com%2Fweb%2Fsp%2FdetailPrdt.do%3FprdtNum%3DSP00001383&psig=AOvVaw19mlPQoVAEAhiaxEePVaPp&ust=1733210300877000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOCptdXFiIoDFQAAAAAdAAAAABAw

![alt text](image-18.png) REST API 세트메뉴(죠스떡볶이)
출처: https://m.joseilbo.com/news/view.htm?newsid=269857#_digitalcamp

![alt text](image-7.png)

백엔드가 차려놓은 백첩반상을 프론트가 다 먹을 필요가 없어졌어요.
먹고싶은 것, 좋아하는 것, 필요한 것만 쏙쏙 뽑아먹을 수 있게 되었습니다.

![alt text](image-20.png)
다이어트 성공

<!-- 다이어트 성공 사진 -->

## 🎯 Episode 3: Apollo Server vs GraphQL Yoga

GraphQL을 실제로 구현하기 위해서는 서버 프레임워크가 필요했습니다.

리서치를 해보니 GraphQL 생태계에서 선택할 수 있는 프레임워크 중 큰 파이를 차지 하고 있는 두 가지가 있었는데 바로 Apollo Server와 GraphQL Yoga입니다.

![alt text](image-21.png)
![alt text](image-22.png)

처음에는 입문으로 GraphQL Yoga를 선택했었습니다. 실제로 써봤을 때 구축도 쉬웠고, 문서도 잘 되어있었습니다.

하지만 결국 Apollo Server를 선택하게 되었습니다.

왜?
![alt text](image-24.png)

저희가 Apollo Server를 선택하게 된 이유는 다음과 같습니다.

1. 더 풍부한 커뮤니티와 레퍼런스

gihtub star 수가 더 많은 것은 사용자가 더 많다는 것이고, 그만큼 더 풍부한 커뮤니티와 지원 기능과 업데이트가 많을 가능성이 높습니다. 많은 사람들이 사용하며 단점이 보완되었을테니 우리가 적용했을 때 오류가 적을 확률이 높을듯.

(24년 11월 26일 당시)
Apollo Server : 13.8k
Yoga : 8.3k

<!-- 스타 수를 이미지로 추가 -->

출처
https://github.com/dotansimha/graphql-yoga
https://github.com/apollographql/apollo-server

2. 다양한 기업의 실제 프로덕션 사례

일단 에어비앤비에서 사용하고 있는 것을 보고 신뢰감을 얻었습니다.
뭔지 정확하게 알 수는 없지만 아무튼 대규모 서비스의 기업에서 프로덕션까지 올렸으니 어느정도 검증되었고, 신뢰해도 좋다고 생각했습니다.

출처 네이버 DEVIEW 2020 GraphQL이 가져온
에어비앤비 프론트엔드 기술의 변천사
https://deview.kr/data/deview/session/attach/GraphQL%E1%84%8B%E1%85%B5_%E1%84%80%E1%85%A1%E1%84%8C%E1%85%A7%E1%84%8B%E1%85%A9%E1%86%AB_%E1%84%8B%E1%85%A6%E1%84%8B%E1%85%A5%E1%84%87%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%AB%E1%84%87%E1%85%B5_%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%86%AB%E1%84%90%E1%85%B3%E1%84%8B%E1%85%A2%E1%86%AB%E1%84%83%E1%85%B3_%E1%84%80%E1%85%B5%E1%84%89%E1%85%AE%E1%86%AF%E1%84%8B%E1%85%B4_%E1%84%87%E1%85%A7%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB%E1%84%89%E1%85%A1_1106.pdf

3. 프로덕션 환경을 고려하였을 때 다양한 요구사항에 대응 가능

Apollo Server는 **플러그인 시스템**이 있어 기능 확장성이 좋다고 느껴졌습니다.

회사에 입사한 후 MSA(Microservice Architecture)와 모듈 페더레이션에 대한 이야기를 자주 듣게 되었습니다. 따라서 향후 마이크로서비스 아키텍처로의 전환이 필요할 때도 유연하게 대응할 수 있을 것이라 판단했습니다.

- 기능 확장성 : 플러그인 시스템을 통해 기능을 쉽게 확장할 수 있어, 복잡한 요구사항을 충족하는데 유리함
  출처
  https://the-guild.dev/graphql/yoga-server/docs/comparison
  https://npm-compare.com/ko-KR/apollo-server-express,
- 분산 시스템을 위한 Federation 아키텍처를 지원
  https://velog.io/@banjjoknim/Apollo-GraphQL-Federation

물론 GraphQL Yoga도 기본적인 기능을 제공하기에 문제없고 무척 구축이 간편한 프레임워크지만, 대규모 서비스 환경에서는 Apollo Server의 안정성과 확장성이 더 큰 장점이 있다는 것을 고려하여 Apollo Server를 선택했습니다.

~~근데 사이드 플젝처럼 가볍고 빠른 프로토타이핑이 필요할 경우에는 Yoga를 선택할 것 같습니다. 2024 트렌드를 보니 Yoga 선택률이 더 높음~~
https://npm-compare.com/ko-KR/apollo-server,express-graphql,graphql,graphql-yoga/#timeRange=ALL

## 😏 Episode 4: 쿼리 대신 짜주는 Playground

![alt text](image-26.png)

그런데 말입니다... 쿼리를 이제 프론트에서 짜야한다고? 처음에는 이 부분이 굉장히 걱정되었습니다. REST API와 달리 프론트엔드 개발자가 직접 쿼리를 작성해야 한다니, 러닝 커브도 있을 것 같고 귀찮은 작업이 늘어날 것 같았거든요.😅

하지만 이런 걱정은 Playground만 있으면 할 필요 없습니다!
Playground는 Apollo Server에서 제공하는 GraphQL 쿼리를 쉽게 작성하고 테스트할 수 있는 개발자 도구입니다.(Yoga에도 있긴 합니다) Playground는 마치 포스트맨(Postman)처럼 API를 테스트할 수 있는 환경을 제공하는데, 여기에 더해 자동완성 기능까지 제공합니다.

![alt text](image-29.png)

Apollo Server를 실행하면 서버의 루트 URL(예: localhost:4000)에서 바로 Playground에 접근할 수 있습니다.

![alt text](image-30.png)
빨간 박스로 표시된 부분에는 작성한 스키마를 기반으로 필드가 나열되어 있습니다.
여기서 필요한 값을 클릭하면 해당 값을 가져오는 쿼리가 자동으로 생성됩니다!

![alt text](image-31.png)

![alt text](image-32.png)

필요한 값들을 입력하고 실행 버튼을 클릭하면 서버로부터 응답 결과를 바로 확인할 수 있습니다.
이를 통해 개발자는 복잡한 쿼리를 손쉽게 생성하고 시뮬레이션을 해볼 수 있습니다!!

![alt text](image-27.png)

## 🚀 Episode 5: 그래서 결과는?

### Before

- 오버패칭으로 인한 불필요한 데이터 전송
- 복잡한 REST 엔드포인트들

### After

- 필요한 데이터만 쏙쏙
- 단일 엔드포인트의 자유로움

<!-- SDUI 완성형을 만들고
알바몬에 도입할 수 있는 방법을 모색하고
어떻게 구성하면 좋을지 고민하는 사진이 있으면 좋겠다

어디다 넣을지 고민하는 어디에 어덯게 구성하지?
보완할 것은 무엇인지?
poc에 들어가기 위해서는 어떻게 해야할지? -->

## 🎯 마치며: 앞으로 뭐할건데

이번 파일럿을 통해 GraphQL과 Apollo Server를 도입해보았지만, 이제부터 진짜 시작입니다.

![alt text](image-25.png)
출처: https://img.freepik.com/premium-photo/businessman-planning-work-company-whiteboard_75891-3192.jpg

현재 우리 팀은 SDUI 완성형을 만들기 위해 다음과 같은 고민들을 하고 있습니다.

1. **알바몬 서비스 적용 범위**

   - 어떤 페이지부터 적용할 것인가?
   - 기존 페이지들의 마이그레이션 전략은?
   - 새로운 이벤트 페이지에 우선 적용해볼까?

2. **컴포넌트 구성 전략**

   - 어떤 컴포넌트들이 자주 재사용될까?
   - 컴포넌트 간의 의존성은 어떻게 관리할까?
   - 디자인 시스템과는 어떻게 연동할까?

앞으로 이러한 고민들을 하나씩 해결해나가면서, SDUI 시스템을 완성형으로 발전시켜 나가려고 합니다. 그 과정에서 얻게 되는 인사이트들도 계속해서 공유드리도록 하겠습니다.

긴 글 읽어주셔서 감사합니다!😊

![alt text](image-28.png)
출처:
https://www.google.com/url?sa=i&url=https%3A%2F%2Fm.blog.naver.com%2Fdd_809%2F221926712657&psig=AOvVaw3eJSNeR8-984oHev5uEk15&ust=1733212038271000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCJi8l5PMiIoDFQAAAAAdAAAAABAE
