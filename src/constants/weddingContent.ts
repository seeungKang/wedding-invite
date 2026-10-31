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
    "8년을 함께한 저희가",
    "이제 평생을 약속하려 합니다.",
    "크리스마스를 기다리는 이 겨울,",
    "올해는 Merry에 Marry를 더합니다.",
    "연애는 8년, 결혼은 평생.",
    "저희의 다음 이야기가 시작되는 날,",
    "함께 웃고 축하해 주세요. 🤍",
  ],
  groomLabel: "강용묵 · 김은숙의 장남",
  groomName: "강세응",
  brideLabel: "김생기 · 유은지의 장녀",
  brideName: "김하얀",
};

export const eventInfo: EventInfo = {
  eventDate: "2026-12-19",
  eventTime: "오후 1시",
  eventDateLabel: "2026년 12월 19일 토요일",
  venueName: "네이버 1784 28층 스카이홀",
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
  ...Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `photo-${number}`,
      thumbSrc: `${baseUrl}images/selected-${number}-thumb.webp`,
      fullSrc: `${baseUrl}images/selected-${number}.webp`,
      alt: `웨딩 사진 ${index + 1}`,
    };
  }),
];

export const locationInfo: LocationInfo = {
  latitude: 37.35888,
  longitude: 127.10519,
  mapPreviewSrc: `${baseUrl}images/venue-map.webp`,
  mapPreviewAlt: "네이버 1784 28층 스카이홀 위치 지도. 파란 위치 핀이 예식장이 있는 건물입니다.",
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
        accountNumber: "110-394442-110",
        holderName: "강세응",
        copyValue: "신한은행 110-394442-110",
      },
      {
        id: "groom-parent-1",
        side: "groom",
        role: "parent",
        roleLabel: "혼주",
        name: "강용묵",
        bankName: "",
        accountNumber: "",
        holderName: "강용묵",
        copyValue: "",
      },
      {
        id: "groom-parent-2",
        side: "groom",
        role: "parent",
        roleLabel: "혼주",
        name: "김은숙",
        bankName: "",
        accountNumber: "",
        holderName: "김은숙",
        copyValue: "",
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
        bankName: "",
        accountNumber: "",
        holderName: "김하얀",
        copyValue: "",
      },
      {
        id: "bride-parent-1",
        side: "bride",
        role: "parent",
        roleLabel: "혼주",
        name: "김생기",
        bankName: "",
        accountNumber: "",
        holderName: "김생기",
        copyValue: "",
      },
      {
        id: "bride-parent-2",
        side: "bride",
        role: "parent",
        roleLabel: "혼주",
        name: "유은지",
        bankName: "",
        accountNumber: "",
        holderName: "유은지",
        copyValue: "",
      },
    ],
  },
];

export const footerContent: FooterContent = {
  tagline: "함께해 주셔서 감사합니다",
  copyright: "Copyright © 2026 강세응 ♡ 김하얀. All rights reserved.",
};
