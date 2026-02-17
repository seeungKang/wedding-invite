export type HeroContent = {
  eyebrow: string;
  title: string;
  coupleNames: string;
  eventSummary: string;
};

export type IntroContent = {
  sectionTitle: string;
  lines: string[];
  groomLabel: string;
  groomName: string;
  brideLabel: string;
  brideName: string;
};

export type EventInfo = {
  eventDate: string;
  eventTime: string;
  eventDateLabel: string;
  venueName: string;
  venueAddress: string;
  venuePhone: string;
};

export type CalendarInfo = {
  monthLabel: string;
  year: number;
  month: number;
  highlightedDay: number;
  caption: string;
};

export type GalleryItem = {
  id: string;
  thumbSrc: string;
  fullSrc: string;
  alt: string;
};

export type LocationInfo = {
  mapPreviewSrc: string;
  mapPreviewAlt: string;
  venueName: string;
  venueAddress: string;
  venuePhone: string;
  naverMapUrl: string;
  kakaoNaviUrl: string;
  subwayLines: string[];
  busLines: string[];
};

export type AccountRole = "self" | "parent";

export type AccountSide = "groom" | "bride";

export type AccountItem = {
  id: string;
  side: AccountSide;
  role: AccountRole;
  roleLabel: string;
  name: string;
  bankName: string;
  accountNumber: string;
  holderName: string;
  copyValue: string;
};

export type AccountGroup = {
  side: AccountSide;
  title: string;
  items: AccountItem[];
};

export type FooterContent = {
  tagline: string;
  copyright: string;
};

export type ToastMessage = {
  id: number;
  text: string;
};
