import {
  Building2,
  Home,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Megaphone,
  Newspaper,
  Search,
  Send,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/banners", label: "Home banner", icon: Megaphone },
  { href: "/admin/company", label: "Company", icon: Building2 },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/projects", label: "Projects", icon: Home },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/admin/contact", label: "Contact info", icon: Mail },
  { href: "/admin/submissions", label: "Submissions", icon: Send },
  { href: "/admin/seo", label: "SEO", icon: Search },
];
