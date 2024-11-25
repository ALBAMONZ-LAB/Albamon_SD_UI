export const eventResolvers = {
  Query: {
    getEventPageComponents: async (
      _: any,
      { eventId }: { eventId: string }
    ) => {
      return {
        resultCode: "SUCCESS",
        resultMessage: "성공",
        eventId: eventId,
        components: [
          {
            type: "TITLE",
            text: "잡코리아x알바몬이 쏜다! 캠퍼스 어택",
            fontSize: 16,
            fontWeight: "700",
            color: "#000000",
          },
          {
            type: "FLOATING_BUTTON",
            text: "이벤트 참여하기",
            backgroundColor: "#ff7e1d",
            textColor: "#ffffff",
            bottom: 20,
          },
          {
            type: "IMAGE",
            width: "100%",
            imageUrl:
              "https://img.albamon.kr/banner//2024/10/esrgoo28135334.png?v=1732498088001",
          },
          {
            type: "IMAGE",
            width: "100%",
            backgroundColor: "#ff7e1d",
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            imageUrl:
              "https://img.albamon.kr/banner//2024/10/viswte28134202.jpg?v=1732498088001",
          },
          {
            type: "IMAGE",
            width: "100%",
            backgroundColor: "#ff7e1d",
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            imageUrl:
              "https://file3.jobkorea.co.kr/albamon/notice/2024/10/paqtpr28125659.png?v=1732498088001",
          },
          {
            type: "IMAGE",
            width: "100%",
            backgroundColor: "#ff7e1d",
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
            imageUrl:
              "https://img.albamon.kr/banner//2024/10/cjetnd28144129.jpg?v=1732498088001",
          },
          {
            type: "IMAGE_WITH_CHILDREN",
            backgroundColor: "#ff7e1d",
            children: [
              {
                type: "IMAGE",
                backgroundColor: "#fff",
                // TODO 사이즈 확인 필요
                width: 260,
                height: 200,
                imageUrl:
                  "https://mts17-mc.albamon.kr/monimg/msa/assets/images/events/campusBattle/share_top.png",
              },
              {
                // 카카오톡으로 공유하기
                type: "IMAGE_BUTTON",
                onClick: "handleImageClick",
                width: 260,
                height: 46,
                imageUrl: "",
              },
            ],
          },
          {
            type: "SPLIT",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 24,
            paddingRight: 24,
          },
          {
            type: "IMAGE_WITH_CHILDREN",
            backgroundColor: "#ff7e1d",
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 24,
            paddingRight: 24,
            children: [
              {
                type: "IMAGE",
                backgroundColor: "#fff",
                width: 260,
                height: 21,
                imageUrl:
                  "https://mts17-mc.albamon.kr/monimg/msa/assets/images/events/campusBattle/instagram.png",
              },
              {
                type: "BUTTON_GROUP",
                backgroundColor: "#fff",
                direction: "row",
                justifyContent: "center",
                gap: 8,
                buttons: [
                  {
                    type: "BUTTON",
                    text: "이미지 다운로드",
                    onClick: "handleImageDownload",
                    backgroundColor: "#ffffff",
                    textColor: "#000000",
                    borderColor: "#e5e5e5",
                    height: 48,
                  },
                  {
                    type: "BUTTON",
                    text: "텍스트 복사하기",
                    onClick: "handleTextCopy",
                    backgroundColor: "#ffffff",
                    textColor: "#000000",
                    borderColor: "#e5e5e5",
                    height: 48,
                  },
                ],
              },
            ],
          },
          {
            type: "IMAGE",
            width: "100%",
            imageUrl:
              "https://file3.jobkorea.co.kr/albamon/notice/2024/10/jpknmb04163852.png?v=1732498088001",
            backgroundColor: "#F5F5F5",
            paddingTop: 24,
            paddingBottom: 24,
            paddingLeft: 24,
            paddingRight: 24,
          },
          {
            type: "CAROUSEL",
            children: [
              {
                type: "IMAGE",
                width: 214,
                height: 382,
                imageUrl:
                  "https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2316jpg.jpg?v=1732498088001",
              },
              {
                type: "IMAGE",
                width: 214,
                height: 382,
                imageUrl:
                  "https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2320jpg.jpg?v=1732498088001",
              },
              {
                type: "IMAGE",
                width: 214,
                height: 382,
                imageUrl:
                  "https://img.jobkorea.co.kr/Images/bbs_notice/2024/09/30/image2317jpg.jpg?v=1732498088001",
              },
            ],
          },
          {
            type: "FOOTER",
            text: "꼭 읽어주세요!",
            backgroundColor: "#000",
            fontSize: 16,
            fontWeight: "700",
            textAlign: "left",
            color: "#fff",
            children: [
              {
                type: "LIST",
                text: "본 이벤트는 잡코리아 알바몬이 함께합니다.",
              },
              {
                type: "LIST",
                text: "당첨자 이벤트 경품은 응모 시 입력한 휴대폰 번호로 발송됩니다.",
              },
              {
                type: "LIST",
                text: "잘못된 휴대폰 번호 기재로 경품 안내를 받지 못하신 경우 재발송이 어려우니 휴대폰 번호를 정확하게 입력해 주시기 바랍니다.",
              },
              {
                type: "LIST",
                text: "부정적인 방법으로 이벤트 참여 시 당첨이 취소됩니다.",
              },
              {
                type: "LIST",
                text: "5만원을 초과하는 경품은 소득세법에 의거하여 경품 금액의 22%가 제세공과금으로 부과되며 당첨자 개인 부담입니다. 제세공과금 미납시 당첨이 취소될 수 있습니다.",
              },
              {
                type: "LIST",
                text: "캠퍼스에 찾아가는 Cafe DREAMZ 커피차는 대학 교내에서 진행하는 행사입니다. 선정된 대학 중 학교측에서 원하지 않거나 진행 환경이 어려운 경우에는 진행이 안될 수 있습니다.",
              },
              {
                type: "LIST",
                text: "선정된 TOP10 대학 중 진행할 수 없는 대학이 생길 경우 차순위 대학으로 진행됩니다.",
              },
              {
                type: "LIST",
                text: "본 이벤트는 양사 사정에 따라 사전 고지없이 변경될 수 있으며, 조기마감 될 수 있습니다.",
              },
              {
                type: "LIST",
                text: "이벤트 문의: univ@jobkorea.co.kr",
              },
            ],
          },
          {
            type: "IMAGE_GROUP",
            backgroundColor: "#fff",
            direction: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            onClick: "handleImageGroupClick",
            buttons: [
              {
                type: "IMAGE",
                imageUrl:
                  "https://mts17-mc.albamon.kr/monimg/msa/assets/images/events/kims/more-event-text.png",
              },
              {
                type: "IMAGE",
                imageUrl:
                  "https://mts17-mc.albamon.kr/monimg/msa/assets/images/events/kims/moni.png",
              },
            ],
          },
        ],
      };
    },
  },
};
