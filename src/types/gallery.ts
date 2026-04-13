export type GalleryCategoryId =
  | "exterior"
  | "interior"
  | "construction"
  | "landscape";

export interface GalleryImage {
  id: string;
  categoryId: GalleryCategoryId;
  imageUrl: string;
  altMn: string;
  altEn: string;
  order: number;
}
