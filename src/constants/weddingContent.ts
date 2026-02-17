import type {
  AccountItem,
  CeremonyItem,
  ContactItem,
  GalleryImage,
} from "../types/wedding";

const baseUrl = import.meta.env.BASE_URL;

export const galleryImages: GalleryImage[] = [
  { id: "photo-01", src: `${baseUrl}images/dsc03004.webp`, alt: "Wedding photo 1" },
  { id: "photo-02", src: `${baseUrl}images/dsc03014.webp`, alt: "Wedding photo 2" },
  { id: "photo-03", src: `${baseUrl}images/dsc03025.webp`, alt: "Wedding photo 3" },
  { id: "photo-04", src: `${baseUrl}images/dsc03034.webp`, alt: "Wedding photo 4" },
  { id: "photo-05", src: `${baseUrl}images/dsc03037.webp`, alt: "Wedding photo 5" },
  { id: "photo-06", src: `${baseUrl}images/dsc03081.webp`, alt: "Wedding photo 6" },
  { id: "photo-07", src: `${baseUrl}images/dsc03094.webp`, alt: "Wedding photo 7" },
  { id: "photo-08", src: `${baseUrl}images/dsc03105.webp`, alt: "Wedding photo 8" },
  { id: "photo-09", src: `${baseUrl}images/dsc03114.webp`, alt: "Wedding photo 9" },
  { id: "photo-10", src: `${baseUrl}images/dsc03116.webp`, alt: "Wedding photo 10" },
];

export const ceremonyItems: CeremonyItem[] = [
  {
    id: "ceremony-time",
    title: "Ceremony",
    lines: ["December 19, 2026 (Sat)", "1:00 PM"],
  },
  {
    id: "ceremony-location",
    title: "Venue",
    lines: ["Diver 1784", "28F Sky Hall"],
  },
  {
    id: "reception",
    title: "Reception",
    lines: ["Right after ceremony", "28F Sky Hall"],
  },
];

export const contactItems: ContactItem[] = [
  { id: "groom-contact", label: "Groom family", phone: "010-1234-5678" },
  { id: "bride-contact", label: "Bride family", phone: "010-9876-5432" },
];

export const accountItems: AccountItem[] = [
  {
    id: "groom-account",
    role: "Groom",
    name: "Seung Kang",
    bank: "Woori Bank",
    number: "1234-567-890123",
  },
  {
    id: "bride-account",
    role: "Bride",
    name: "Su Kim",
    bank: "Kookmin Bank",
    number: "098-765-432109",
  },
];

export const inviteMessage = [
  "Thank you for joining the beginning of our marriage.",
  "Your warm support means the world to us.",
];
