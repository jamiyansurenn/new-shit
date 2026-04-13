export interface ContactInfo {
  id: string;
  address: { mn: string; en: string };
  phone: string;
  email: string;
  mapEmbedUrl?: string;
  businessHours?: { mn: string; en: string };
  whatsappUrl?: string;
  messengerUrl?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
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
