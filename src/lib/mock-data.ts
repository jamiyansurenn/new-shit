import type {
  CompanyProfile,
  ContactInfo,
  ContactSubmission,
  GalleryImage,
  HomeBanner,
  NewsArticle,
  Project,
  SEOSettings,
  Service,
} from "@/types";

export const mockSEO: SEOSettings = {
  siteName: {
    mn: "Эсгэлэн Барилгын Групп ХХК",
    en: "Esgelen Construction Group LLC",
  },
  defaultTitleSuffix: {
    mn: "Эсгэлэн Барилгын Групп",
    en: "Esgelen Construction Group",
  },
  defaultDescription: {
    mn: "Улаанбаатар хотод орчин үеийн орон сууц, үйлчилгээний төсөл хэрэгжүүлдэг, найдвартай барилгын компани.",
    en: "A trusted construction and real estate development company delivering modern residential and commercial projects in Ulaanbaatar.",
  },
  ogImageUrl:
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=630&fit=crop",
};

export const mockHomeBanner: HomeBanner = {
  id: "banner-1",
  imageUrl:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
  headline: {
    mn: "Ирээдүйн хотхоныг өнөөдөр бүтээнэ",
    en: "Building tomorrow's communities today",
  },
  subline: {
    mn: "Чанар, хугацаа, аюулгүй байдлыг эрхэмлэсэн бүтээн байгуулалт, үл хөдлөх хөрөнгийн бодит шийдлүүд.",
    en: "Quality-driven construction and real estate solutions with disciplined delivery and uncompromising safety standards.",
  },
  primaryCta: {
    label: { mn: "Төслүүд үзэх", en: "View projects" },
    href: "/projects",
  },
  secondaryCta: {
    label: { mn: "Зөвлөгөө авах", en: "Request consultation" },
    href: "/contact",
  },
};

export const mockCompanyProfile: CompanyProfile = {
  id: "company-1",
  legalName: {
    mn: "Эсгэлэн Барилгын Групп Хувьцаат Компани",
    en: "Esgelen Construction Group JSC",
  },
  tagline: {
    mn: "Найдвартай тулгуур, урт хугацааны үнэ цэнэ",
    en: "A dependable foundation for long-term value",
  },
  introduction: {
    mn: "Эсгэлэн Барилгын Групп нь 2009 онд үүсгэн байгуулагдсан бөгөөд орон сууц, аж ахуйн нэгж, дэд бүтцийн чиглэлээр төр хувийн хэвшлийн захиалгат төслүүдийг амжилттай хэрэгжүүлж ирсэн. Бид Монголын зах зээлд олон улсын стандартад нийцсэн инженеринг, чанарын удирдлагыг нэвтрүүлж, үйлчлүүлэгчдийнхээ хөрөнгө оруулалтыг хамгаалах зорилготой.",
    en: "Founded in 2009, Esgelen Construction Group delivers residential, commercial, and infrastructure projects for public and private clients. We apply international engineering and quality management practices to protect our clients' investments in Mongolia's built environment.",
  },
  vision: {
    mn: "Монголын барилгын салбарт инновац, тогтвортой байдал, мэргэжлийн ёс зүйгээр тэргүүлэгч байгууллага болох.",
    en: "To lead Mongolia's construction sector through innovation, sustainability, and professional integrity.",
  },
  mission: {
    mn: "Үйлчлүүлэгчдийн хэрэгцээнд нийцсэн, аюулгүй, эрчим хүчний хэмнэлттэй барилгуудыг цаг хугацаанд нь чанартай барьж, нийгмийн итгэлийг бэхжүүлэх.",
    en: "Deliver safe, energy-conscious buildings on schedule and to specification, strengthening public trust through transparent execution.",
  },
  strengths: [
    {
      title: { mn: "Инженерийн чадвар", en: "Engineering depth" },
      description: {
        mn: "Төслийн удирдлага, бүтцийн шийдэл, чанарын хяналтын нэгдсэн баг.",
        en: "Integrated project management, structural expertise, and rigorous quality assurance.",
      },
    },
    {
      title: { mn: "Нийлүүлэлтийн сүлжээ", en: "Supply chain reliability" },
      description: {
        mn: "Баталгаат материалын нийлүүлэгч, гэрээт гүйцэтгэгчтэй урт хугацааны хамтын ажиллагаа.",
        en: "Long-term partnerships with certified suppliers and specialist subcontractors.",
      },
    },
    {
      title: { mn: "Аюулгүй ажиллагаа", en: "Safety leadership" },
      description: {
        mn: "Ажлын талбайн эрсдэлийн үнэлгээ, сургалт, хяналтын тогтмол систем.",
        en: "Structured risk assessments, training, and on-site safety oversight.",
      },
    },
    {
      title: { mn: "Үйлчлүүлэгчтэй ил тод байдал", en: "Transparent reporting" },
      description: {
        mn: "Төслийн явц, зардлын хяналтыг үе шаттайгаар мэдээлэх практик.",
        en: "Stage-gate reporting on progress, cost control, and milestone delivery.",
      },
    },
  ],
  foundedYear: 2009,
  employeeCountApprox: 240,
  completedProjectsApprox: 68,
};

export const mockServices: Service[] = [
  {
    id: "svc-1",
    slug: "barilga-barilt",
    order: 1,
    title: {
      mn: "Иргэний болон үйлдвэрийн барилга",
      en: "Civil & industrial construction",
    },
    shortDescription: {
      mn: "Үндсэн бүтэц, гадна фасад, дотор засал хүртэлх EPC гүйцэтгэл.",
      en: "EPC-style delivery from structure through envelope and interior fit-out.",
    },
    description: {
      mn: "Бид төслийн эхнээс эхлэн геотехникийн судалгаа, зураг төсөл зохиох, барилгажилт, пусконд оруулах хүртэлх үйл явцыг нэг дор удирддаг. Орон сууц, оффис, логистикийн төвүүдэд олон жилийн туршлага бий.",
      en: "We manage the full lifecycle—from investigation and design through construction and commissioning—for housing, offices, and logistics facilities.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  },
  {
    id: "svc-2",
    slug: "oron-suuts-hothon",
    order: 2,
    title: {
      mn: "Орон сууцны хотхон хөгжүүлэлт",
      en: "Residential development",
    },
    shortDescription: {
      mn: "Зах зээлийн судалгаа, борлуулалтын стратегитой хотхоны төсөл.",
      en: "Market-led master planning with sales and delivery strategy.",
    },
    description: {
      mn: "Зураг төсөл, барилгажилт, дотоод инженеринг, ландшафт, засвар үйлчилгээний багц үйлчилгээг санал болгодог. Орон сууцны төслүүдэд иргэдийн амьдрах орчны чанарыг нэн тэргүүнд тавьдаг.",
      en: "Bundled services covering design, MEP coordination, landscaping, and aftercare. We prioritize livability and long-term asset performance.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  },
  {
    id: "svc-3",
    slug: "ded-buts",
    order: 3,
    title: {
      mn: "Дэд бүтэц, инженерийн шийдэл",
      en: "Infrastructure & engineering",
    },
    shortDescription: {
      mn: "Дулаан, цахилгаан, ус зайлуулах системийн угсралт.",
      en: "Mechanical, electrical, and plumbing systems integration.",
    },
    description: {
      mn: "Төслийн талбайд тохирсон дэд бүтцийн шийдлүүдийг олон улсын норм, дүрмийн дагуу зохион байгуулж, барилгын ашиглалтын үеийн зардлыг бууруулна.",
      en: "Site-specific infrastructure aligned with international codes, reducing operational costs across the building lifecycle.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  },
  {
    id: "svc-4",
    slug: "zasvar-ashiglalt",
    order: 4,
    title: {
      mn: "Засвар үйлчилгээ, өргөтгөл",
      en: "Refurbishment & expansion",
    },
    shortDescription: {
      mn: "Ашиглалтад байгаа барилгыг шинэчлэх, өргөтгөх төслүүд.",
      en: "Modernization and extension of occupied buildings.",
    },
    description: {
      mn: "Үйл ажиллагаа тасралтгүй явагдах нөхцөлд засварын төлөвлөлт хийж, аюулгүй байдлыг хангасан гүйцэтгэлийг баталгаажуулдаг.",
      en: "Phased works planned around occupancy, minimizing disruption while safeguarding structural and fire safety.",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  },
];

export const mockProjects: Project[] = [
  {
    id: "prj-1",
    slug: "khukh-tenger-residence",
    featured: true,
    status: "sales",
    title: {
      mn: "Хөх тэнгис резиденс",
      en: "Blue Horizon Residence",
    },
    summary: {
      mn: "Зайсан толгойн орчимд 420 айлын орон сууц, дэлгүүр, фитнессийн цогцолбор.",
      en: "A 420-unit residential community near Zaisan with retail and wellness amenities.",
    },
    description: {
      mn: "Төсөл нь өргөн цонхтой, нарны гэрэлтүүлэгт тулгуурласан төлөвлөлттэй. Дулаан алдагдлыг багасгахын тулд чанарын сертификаттай дулаалга, чийгний хамгаалалтыг ашигласан. Доод давхарт худалдааны талбай, дээд давхарт цэцэрлэгт хүрээлэгтэй.",
      en: "The scheme emphasizes daylighting and thermal performance with certified insulation and moisture management. Retail anchors the podium while upper levels open to landscaped terraces.",
    },
    location: {
      mn: "Улаанбаатар, Хан-Уул дүүрэг, Зайсан замын уулзварын зүүн талд",
      en: "Khan-Uul district, Ulaanbaatar — east of the Zaisan interchange",
    },
    coverImageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
    ],
    planningNotes: {
      mn: "1–4 өрөө, 54–142 м². Давхар бүрт аюулгүй гарц, CCTV, орон нутгийн дулааны станцтай холбогдох боломж.",
      en: "Unit mix from 1–4 bedrooms, 54–142 m². Each floor includes protected escape routes, CCTV backbone, and connection readiness for district heating.",
    },
    features: [
      {
        mn: "Газар доорх зогсоол 1.4:1 харьцаатай",
        en: "Underground parking at ~1.4 spaces per unit",
      },
      {
        mn: "Ногоон дээвэр болон дунд орших цэцэрлэг",
        en: "Green roof and central courtyard gardens",
      },
      {
        mn: "24/7 аюулгүй байдлын алба",
        en: "24/7 security and concierge desk",
      },
    ],
    startedAt: "2023-04-01",
  },
  {
    id: "prj-2",
    slug: "erdenet-logistics-hub",
    featured: true,
    status: "construction",
    title: {
      mn: "Эрдэнэт логистикийн төв",
      en: "Erdenet Logistics Hub",
    },
    summary: {
      mn: "Ачаа тээвэр, түрээсийн агуулах, оффисын цогц барилга.",
      en: "Integrated warehousing, cross-dock, and office hub.",
    },
    description: {
      mn: "Бүс нутгийн тээвэрлэлтийн урсгалыг нэгтгэх зорилготой төсөл. Өндөр ачаалалтай шалан дэвсгэр, өргөх тоног төхөөрөмжийн зай талбайг тооцсон.",
      en: "Designed to consolidate regional freight flows with heavy-duty slabs and crane-served circulation.",
    },
    location: {
      mn: "Эрдэнэт хот, Үйлдвэрийн бүсийн замын хойд талд",
      en: "Erdenet — north frontage of the industrial belt road",
    },
    coverImageUrl:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1200&q=80",
    ],
    planningNotes: {
      mn: "Үе шаттай ашиглалтад оруулах төлөвлөгөөтэй: эхний үе 18,000 м² агуулах.",
      en: "Phased handover with phase one delivering ~18,000 m² of warehousing.",
    },
    features: [
      {
        mn: "Галын дохиолол, унтраах систем стандартад нийцсэн",
        en: "NFPA-aligned detection and suppression strategy",
      },
      {
        mn: "Түрээслэгчдэд зориулсан оффисын модуль",
        en: "Modular office pods for tenant fit-out",
      },
    ],
    startedAt: "2024-08-15",
  },
  {
    id: "prj-3",
    slug: "ulaanbaatar-business-park",
    featured: false,
    status: "completed",
    title: {
      mn: "Улаанбаатар бизнес парк",
      en: "Ulaanbaatar Business Park",
    },
    summary: {
      mn: "A зэрэглэлийн оффис, дэлгүүр, үйлчилгээний 32,000 м² барилга.",
      en: "32,000 m² Grade-A office and retail podium.",
    },
    description: {
      mn: "Санхүү, технологийн компаниудын төв оффис болсон төсөл. Нарийн чанарын хяналтын дагуу гүйцэтгэгдсэн.",
      en: "Anchored by finance and technology tenants, delivered under a formal QA/QC regime.",
    },
    location: {
      mn: "Сүхбаатар дүүрэг, Чингисийн өргөн чөлөө",
      en: "Sukhbaatar district — Chinggis Avenue frontage",
    },
    coverImageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
    ],
    planningNotes: {
      mn: "LEED-тэй ойролцоо зорилтот эрчим хүчний хэмнэлтийн арга хэмжээ хэрэгжүүлсэн.",
      en: "Energy conservation measures aligned with LEED-equivalent targets.",
    },
    features: [
      {
        mn: "Давхар өндөр тааз, нээлттэй оффисын төлөвлөлт",
        en: "High-floor-to-floor heights with flexible floorplates",
      },
    ],
    completedAt: "2022-11-30",
  },
];

export const mockNews: NewsArticle[] = [
  {
    id: "news-1",
    slug: "shine-togtoolt-khukh-tenger",
    publishedAt: "2026-03-18",
    title: {
      mn: "Хөх тэнгис резиденс төсөл шинэ шатандаа шилжлээ",
      en: "Blue Horizon Residence advances to its next construction stage",
    },
    excerpt: {
      mn: "Үндсэн бүтцийг бүрэн босгож, дотор инженерийн шугам сүлжээг суурилуулж эхэллээ.",
      en: "Structural frame completion unlocks MEP rough-in across typical floors.",
    },
    content: {
      mn: "Төслийн баг 2026 оны эхний улиралд үндсэн бүтцийг бүрэн гүйцэтгэж, дулаан, ус, цахилгааны шугамыг давхар бүрт суурилуулж эхлээд байна. Аюулгүй байдлын хяналтын баг өдөр бүр талбайд ажиллаж, гүйцэтгэгч компаниудтай зөвлөлдөнө. Ирэх сард фасадны дулаалгын ажил эхлэх төлөвтэй.",
      en: "During Q1 2026 the project team topped out the primary structure and began MEP rough-in on typical floors. Safety officers are present daily, coordinating trades ahead of façade insulation works scheduled to start next month.",
    },
    coverImageUrl:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    author: { mn: "Төслийн алба", en: "Project Communications" },
  },
  {
    id: "news-2",
    slug: "togs-geree-shine-eelj",
    publishedAt: "2026-02-02",
    title: {
      mn: "Шинэ жилийн эхэнд стратегийн түншлэлийн гэрээ байгуулав",
      en: "Strategic partnership agreements signed for the new year",
    },
    excerpt: {
      mn: "Олон улсын материалын нийлүүлэгчидтэй урт хугацааны хамтын ажиллагааг өргөжүүллээ.",
      en: "Extended long-term supply agreements with international material partners.",
    },
    content: {
      mn: "Чанарын тогтвортой байдлыг хангах зорилгоор бид Европын гэрээт нийлүүлэгчидтэй хамтын ажиллагаагаа өргөжүүлж, төмөр бетон, дулаалгын материалын нийлүүлэлтийг тогтмолжууллаа. Энэ нь төслүүдийн хугацаа алдагдах эрсдлийг бууруулна.",
      en: "To stabilize quality inputs we expanded agreements with European suppliers for structural concrete constituents and insulation products, reducing schedule risk on active sites.",
    },
    coverImageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
  },
];

export const mockGallery: GalleryImage[] = [
  {
    id: "gal-1",
    categoryId: "exterior",
    order: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80",
    altMn: "Орон сууцны барилгын гадна тал",
    altEn: "Residential building exterior facade",
  },
  {
    id: "gal-2",
    categoryId: "interior",
    order: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80",
    altMn: "Зочны өрөөний дотоод засал",
    altEn: "Living room interior fit-out",
  },
  {
    id: "gal-3",
    categoryId: "construction",
    order: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1000&q=80",
    altMn: "Барилгын талбай дээрх ажилчид",
    altEn: "Construction crew on active site",
  },
  {
    id: "gal-4",
    categoryId: "landscape",
    order: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80",
    altMn: "Гадна цэцэрлэг, явган зам",
    altEn: "Landscaped courtyard and walkways",
  },
  {
    id: "gal-5",
    categoryId: "exterior",
    order: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1000&q=80",
    altMn: "Өндөр барилгын шөнөний гэрэлтүүлэг",
    altEn: "High-rise exterior lighting at dusk",
  },
  {
    id: "gal-6",
    categoryId: "interior",
    order: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80",
    altMn: "Гал тогооны орчин үеийн шийдэл",
    altEn: "Modern kitchen specification",
  },
];

export const mockContactInfo: ContactInfo = {
  id: "contact-1",
  address: {
    mn: "Улаанбаатар хот, Сүхбаатар дүүрэг, 1-р хороо, Чингисийн өргөн чөлөө 15, 8 давхар",
    en: "15 Chinggis Avenue, 8th Floor, 1st khoroo, Sukhbaatar district, Ulaanbaatar",
  },
  phone: "+976 11 320080",
  email: "info@esgelen-construction.mn",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5347.0!2d106.905!3d47.918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzA0LjgiTiAxMDbCsDU0JzE4LjAiRQ!5e0!3m2!1sen!2smn!4v1",
  businessHours: {
    mn: "Даваа–Баасан 09:00–18:00",
    en: "Monday–Friday 09:00–18:00",
  },
};

export const mockContactSubmissions: ContactSubmission[] = [
  {
    id: "sub-1",
    name: "Б.Батбаяр",
    phone: "+976 88112233",
    email: "batbayar@example.mn",
    message:
      "Зайсан орчмын орон сууцны төслийн борлуулалтын мэдээлэл авахыг хүсэж байна.",
    createdAt: "2026-04-10T09:12:00.000Z",
    read: false,
  },
  {
    id: "sub-2",
    name: "Sarah Johnson",
    phone: "+1 415 555 0198",
    email: "s.johnson@example.com",
    message:
      "We are evaluating EPC partners for a commercial podium in UB. Please share your credentials deck.",
    createdAt: "2026-04-08T14:40:00.000Z",
    read: true,
  },
];

export const mockStats = [
  {
    value: "68+",
    label: { mn: "Амжилттай хэрэгжүүлсэн төсөл", en: "Delivered projects" },
  },
  {
    value: "1.2M m²+",
    label: { mn: "Нийт барилгын талбай", en: "Gross floor area delivered" },
  },
  {
    value: "240+",
    label: { mn: "Мэргэжилтэн", en: "Specialists on staff" },
  },
  {
    value: "15 жил",
    label: { mn: "Салбарын туршлага", en: "Years of sector experience" },
  },
];
