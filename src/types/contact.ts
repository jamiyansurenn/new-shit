export interface ContactInfo {
  id: string;
  address: { mn: string; en: string };
  phone: string;
  email: string;
  mapEmbedUrl?: string;
  businessHours?: { mn: string; en: string };
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}
