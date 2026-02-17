export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type CeremonyItem = {
  id: string;
  title: string;
  lines: string[];
};

export type ContactItem = {
  id: string;
  label: string;
  phone: string;
};

export type AccountItem = {
  id: string;
  role: string;
  name: string;
  bank: string;
  number: string;
};
