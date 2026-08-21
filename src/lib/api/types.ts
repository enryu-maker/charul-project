export type ApiHome = {
  id: number;
  image: string | null;
  created_at: string;
};

export type ApiPractice = {
  id: number;
  title: string;
  description: string;
  image: string | null;
};

export type ApiService = {
  id: number;
  name: string;
  description: string;
};

export type ApiProject = {
  id: number;
  name: string;
  image: string | null;
  description: string;
  location: string;
  year: number;
  scope: string;
  category: number;
  category_name: string;
  created_at: string;
};

export type ApiProcess = {
  id: number;
  step: number;
  title: string;
  description: string;
};

export type ApiReview = {
  id: number;
  name: string;
  type: "text" | "video";
  photo: string | null;
  video: string | null;
  description: string;
  created_at: string;
};

export type ApiStat = {
  id: number;
  value: string;
  label: string;
};

export type ApiCategory = {
  id: number;
  name: string;
};

export type ApiContact = {
  id: number;
  phone: string | null;
  email: string | null;
  location: string | null;
  maps_url: string | null;
  instagram: string | null;
  facebook: string | null;
};

export type LeadPayload = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
};

export type SiteData = {
  home: ApiHome[];
  practice: ApiPractice[];
  services: ApiService[];
  projects: ApiProject[];
  process: ApiProcess[];
  reviews: ApiReview[];
  stats: ApiStat[];
  categories: ApiCategory[];
  contact: ApiContact | null;
};
