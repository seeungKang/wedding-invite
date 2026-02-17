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
  eyebrow: "THE WEDDING OF",
  title: "Wedding Invitation",
  coupleNames: "Minsu Kim & Haneul Lee",
  eventSummary: "Saturday, December 19, 2026 at 1:00 PM",
};

export const introContent: IntroContent = {
  sectionTitle: "INVITATION",
  lines: [
    "Two paths that walked side by side",
    "are now becoming one journey together.",
    "With the gentle spirit of winter",
    "and a quiet Christmas warmth,",
    "we would like to share the start of our life together.",
    "Your presence on our special day",
    "will mean the world to us.",
  ],
  groomLabel: "Groom",
  groomName: "Minsu Kim",
  brideLabel: "Bride",
  brideName: "Haneul Lee",
};

export const eventInfo: EventInfo = {
  eventDate: "2026-12-19",
  eventTime: "1:00 PM",
  eventDateLabel: "December 19, 2026 SAT",
  venueName: "Grand Christmas Hotel, Rudolph Hall",
  venueAddress: "1225 Santa-ro, Seoul",
  venuePhone: "02-1225-2026",
};

export const calendarInfo: CalendarInfo = {
  monthLabel: "December",
  year: 2026,
  month: 12,
  highlightedDay: 19,
  caption: "Minsu and Haneul's wedding day is December 19.",
};

export const galleryItems: GalleryItem[] = [
  {
    id: "photo-01",
    thumbSrc: `${baseUrl}images/dsc03004.webp`,
    fullSrc: `${baseUrl}images/dsc03004.webp`,
    alt: "Wedding portrait one",
  },
  {
    id: "photo-02",
    thumbSrc: `${baseUrl}images/dsc03014.webp`,
    fullSrc: `${baseUrl}images/dsc03014.webp`,
    alt: "Wedding portrait two",
  },
  {
    id: "photo-03",
    thumbSrc: `${baseUrl}images/dsc03025.webp`,
    fullSrc: `${baseUrl}images/dsc03025.webp`,
    alt: "Wedding portrait three",
  },
  {
    id: "photo-04",
    thumbSrc: `${baseUrl}images/dsc03034.webp`,
    fullSrc: `${baseUrl}images/dsc03034.webp`,
    alt: "Wedding portrait four",
  },
  {
    id: "photo-05",
    thumbSrc: `${baseUrl}images/dsc03037.webp`,
    fullSrc: `${baseUrl}images/dsc03037.webp`,
    alt: "Wedding portrait five",
  },
  {
    id: "photo-06",
    thumbSrc: `${baseUrl}images/dsc03081.webp`,
    fullSrc: `${baseUrl}images/dsc03081.webp`,
    alt: "Wedding portrait six",
  },
  {
    id: "photo-07",
    thumbSrc: `${baseUrl}images/dsc03094.webp`,
    fullSrc: `${baseUrl}images/dsc03094.webp`,
    alt: "Wedding portrait seven",
  },
  {
    id: "photo-08",
    thumbSrc: `${baseUrl}images/dsc03105.webp`,
    fullSrc: `${baseUrl}images/dsc03105.webp`,
    alt: "Wedding portrait eight",
  },
  {
    id: "photo-09",
    thumbSrc: `${baseUrl}images/dsc03114.webp`,
    fullSrc: `${baseUrl}images/dsc03114.webp`,
    alt: "Wedding portrait nine",
  },
  {
    id: "photo-10",
    thumbSrc: `${baseUrl}images/dsc03116.webp`,
    fullSrc: `${baseUrl}images/dsc03116.webp`,
    alt: "Wedding portrait ten",
  },
];

export const locationInfo: LocationInfo = {
  mapPreviewSrc: `${baseUrl}images/dsc03037.webp`,
  mapPreviewAlt: "Map preview for wedding venue",
  venueName: eventInfo.venueName,
  venueAddress: eventInfo.venueAddress,
  venuePhone: eventInfo.venuePhone,
  naverMapUrl: "https://map.naver.com/v5/search/1225%20Santa-ro%20Seoul",
  kakaoNaviUrl:
    "https://map.kakao.com/link/to/Grand%20Christmas%20Hotel,37.5665,126.9780",
  subwayLines: [
    "Line 2 City Hall Station Exit 12 (5 min walk)",
    "Line 1 Seoul Station Exit 1 (shuttle available)",
  ],
  busLines: [
    "Blue Bus: 1225, 2026, 1224",
    "Express Bus: 9900 (Hotel stop)",
  ],
};

export const accountGroups: AccountGroup[] = [
  {
    side: "groom",
    title: "Groom Side",
    items: [
      {
        id: "groom-self",
        side: "groom",
        role: "self",
        roleLabel: "Groom",
        name: "Minsu Kim",
        bankName: "Shinhan Bank",
        accountNumber: "110-123-456789",
        holderName: "Minsu Kim",
        copyValue: "Shinhan Bank 110-123-456789",
      },
      {
        id: "groom-parent-1",
        side: "groom",
        role: "parent",
        roleLabel: "Parent",
        name: "Cheolsu Kim",
        bankName: "Woori Bank",
        accountNumber: "1002-331-998877",
        holderName: "Cheolsu Kim",
        copyValue: "Woori Bank 1002-331-998877",
      },
      {
        id: "groom-parent-2",
        side: "groom",
        role: "parent",
        roleLabel: "Parent",
        name: "Younghee Park",
        bankName: "Hana Bank",
        accountNumber: "205-910283-001",
        holderName: "Younghee Park",
        copyValue: "Hana Bank 205-910283-001",
      },
    ],
  },
  {
    side: "bride",
    title: "Bride Side",
    items: [
      {
        id: "bride-self",
        side: "bride",
        role: "self",
        roleLabel: "Bride",
        name: "Haneul Lee",
        bankName: "Kookmin Bank",
        accountNumber: "552302-04-112233",
        holderName: "Haneul Lee",
        copyValue: "Kookmin Bank 552302-04-112233",
      },
      {
        id: "bride-parent-1",
        side: "bride",
        role: "parent",
        roleLabel: "Parent",
        name: "Byungsoo Lee",
        bankName: "Nonghyup Bank",
        accountNumber: "356-1777-8200-91",
        holderName: "Byungsoo Lee",
        copyValue: "Nonghyup Bank 356-1777-8200-91",
      },
      {
        id: "bride-parent-2",
        side: "bride",
        role: "parent",
        roleLabel: "Parent",
        name: "Mina Choi",
        bankName: "IBK Bank",
        accountNumber: "820-110-332700",
        holderName: "Mina Choi",
        copyValue: "IBK Bank 820-110-332700",
      },
    ],
  },
];

export const footerContent: FooterContent = {
  tagline: "SHARING THE JOY OF CHRISTMAS",
  copyright: "Copyright © 2026 Minsu & Haneul. All rights reserved.",
};
