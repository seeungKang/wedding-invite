import type {
  AccountGroup,
  CalendarInfo,
  EventInfo,
  FooterContent,
  GalleryItem,
  HeroContent,
  IntroContent,
  LocationInfo,
} from "../types/wedding";

const baseUrl = import.meta.env.BASE_URL;

export const heroContent: HeroContent = {
  eyebrow: "저희 결혼식에 초대합니다",
  title: "결혼합니다",
  coupleNames: "강세응 ♡ 김하얀",
  eventSummary: "2026년 12월 19일 토요일 오후 1시",
};

export const introContent: IntroContent = {
  sectionTitle: "초대합니다",
  lines: [
    "서로 마주 보며 걸어온 시간이",
    "이제는 한 곳을 바라보는 걸음이 되려 합니다.",
    "차가운 겨울 공기마저 따스하게 느껴질 만큼",
    "포근하고 설레는 크리스마스의 기운을 빌려",
    "저희의 소중한 시작을 알리고자 합니다.",
    "오셔서 저희의 앞날을 축복해 주시면",
    "더할 나위 없는 행복으로 간직하겠습니다.",
  ],
  groomLabel: "신랑",
  groomName: "강세응",
  brideLabel: "신부",
  brideName: "김하얀",
};

export const eventInfo: EventInfo = {
  eventDate: "2026-12-19",
  eventTime: "오후 1시",
  eventDateLabel: "2026년 12월 19일 토요일",
  venueName: "네이버 1784",
  venueAddress: "경기 성남시 분당구 정자일로 95",
  venuePhone: "",
};

export const calendarInfo: CalendarInfo = {
  monthLabel: "12월",
  year: 2026,
  month: 12,
  highlightedDay: 19,
  caption: "세응 ♡ 하얀의 결혼식이 12월 19일 입니다.",
};

export const galleryItems: GalleryItem[] = [
  { id: "photo-01", thumbSrc: `${baseUrl}images/dsc03004.webp`, fullSrc: `${baseUrl}images/dsc03004.webp`, alt: "웨딩 사진 1" },
  { id: "photo-02", thumbSrc: `${baseUrl}images/dsc03014.webp`, fullSrc: `${baseUrl}images/dsc03014.webp`, alt: "웨딩 사진 2" },
  { id: "photo-03", thumbSrc: `${baseUrl}images/dsc03025.webp`, fullSrc: `${baseUrl}images/dsc03025.webp`, alt: "웨딩 사진 3" },
  { id: "photo-04", thumbSrc: `${baseUrl}images/dsc03034.webp`, fullSrc: `${baseUrl}images/dsc03034.webp`, alt: "웨딩 사진 4" },
  { id: "photo-05", thumbSrc: `${baseUrl}images/dsc03037.webp`, fullSrc: `${baseUrl}images/dsc03037.webp`, alt: "웨딩 사진 5" },
  { id: "photo-06", thumbSrc: `${baseUrl}images/dsc03081.webp`, fullSrc: `${baseUrl}images/dsc03081.webp`, alt: "웨딩 사진 6" },
  { id: "photo-07", thumbSrc: `${baseUrl}images/dsc03094.webp`, fullSrc: `${baseUrl}images/dsc03094.webp`, alt: "웨딩 사진 7" },
  { id: "photo-08", thumbSrc: `${baseUrl}images/dsc03105.webp`, fullSrc: `${baseUrl}images/dsc03105.webp`, alt: "웨딩 사진 8" },
  { id: "photo-09", thumbSrc: `${baseUrl}images/dsc03114.webp`, fullSrc: `${baseUrl}images/dsc03114.webp`, alt: "웨딩 사진 9" },
  { id: "photo-10", thumbSrc: `${baseUrl}images/dsc03116.webp`, fullSrc: `${baseUrl}images/dsc03116.webp`, alt: "웨딩 사진 10" },
];

export const locationInfo: LocationInfo = {
  mapPreviewSrc: `${baseUrl}images/dsc03037.webp`,
  mapPreviewAlt: "예식장 지도 미리보기",
  venueName: eventInfo.venueName,
  venueAddress: eventInfo.venueAddress,
  venuePhone: eventInfo.venuePhone,
  naverMapUrl: "https://map.naver.com/v5/search/%EB%84%A4%EC%9D%B4%EB%B2%84%201784",
  kakaoNaviUrl: "https://map.kakao.com/?q=%EB%84%A4%EC%9D%B4%EB%B2%84%201784",
  subwayLines: [
    "신분당선 정자역 4번 출구 도보 약 10분",
    "분당선 정자역 3번 출구 도보 약 10분",
  ],
  busLines: [
    "일반버스: 220, 250, 720-1",
    "광역버스: 9401, 9403",
  ],
};

export const accountGroups: AccountGroup[] = [
  {
    side: "groom",
    title: "신랑측",
    items: [
      {
        id: "groom-self",
        side: "groom",
        role: "self",
        roleLabel: "신랑",
        name: "강세응",
        bankName: "신한은행",
        accountNumber: "110-123-456789",
        holderName: "강세응",
        copyValue: "신한은행 110-123-456789",
      },
      {
        id: "groom-parent-1",
        side: "groom",
        role: "parent",
        roleLabel: "혼주",
        name: "강용묵",
        bankName: "우리은행",
        accountNumber: "1002-331-998877",
        holderName: "강용묵",
        copyValue: "우리은행 1002-331-998877",
      },
      {
        id: "groom-parent-2",
        side: "groom",
        role: "parent",
        roleLabel: "혼주",
        name: "김은숙",
        bankName: "하나은행",
        accountNumber: "205-910283-001",
        holderName: "김은숙",
        copyValue: "하나은행 205-910283-001",
      },
    ],
  },
  {
    side: "bride",
    title: "신부측",
    items: [
      {
        id: "bride-self",
        side: "bride",
        role: "self",
        roleLabel: "신부",
        name: "김하얀",
        bankName: "국민은행",
        accountNumber: "552302-04-112233",
        holderName: "김하얀",
        copyValue: "국민은행 552302-04-112233",
      },
      {
        id: "bride-parent-1",
        side: "bride",
        role: "parent",
        roleLabel: "혼주",
        name: "김생기",
        bankName: "농협은행",
        accountNumber: "356-1777-8200-91",
        holderName: "김생기",
        copyValue: "농협은행 356-1777-8200-91",
      },
      {
        id: "bride-parent-2",
        side: "bride",
        role: "parent",
        roleLabel: "혼주",
        name: "유은지",
        bankName: "기업은행",
        accountNumber: "820-110-332700",
        holderName: "유은지",
        copyValue: "기업은행 820-110-332700",
      },
    ],
  },
];

export const footerContent: FooterContent = {
  tagline: "함께해 주셔서 감사합니다",
  copyright: "Copyright © 2026 강세응 ♡ 김하얀. All rights reserved.",
};
