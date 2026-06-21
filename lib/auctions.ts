/**
 * E-auction catalogue (SARFAESI / bank auctions). Status (live / upcoming /
 * completed) is derived from the auction window at build time.
 *
 * The first three entries use the real data provided. The live and past
 * entries are illustrative so every section of the page is populated.
 */

export type AuctionAssetType =
  | "land"
  | "residential"
  | "commercial"
  | "industrial";
export type AuctionStatus = "live" | "upcoming" | "completed";
export type AuctionOutcome = "sold" | "unsold" | "withdrawn";

export interface Auction {
  slug: string;
  lotNo: string;
  borrower: string;
  assetType: AuctionAssetType;
  title: string;
  excerpt: string;
  description: string[];
  /** Plot area in sq ft, used for sorting. */
  area: number;
  /** Human-readable area, e.g. "7 acres" or "4,848 sq ft". */
  areaLabel: string;
  reservePrice: number;
  emd: number;
  currency: "INR";
  authority: string;
  /** ISO datetimes (IST). */
  start: string;
  end: string;
  inspectionDate?: string;
  emdLastDate?: string;
  address: {
    area: string;
    city: string;
    region: string;
    postalCode?: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Approximate coordinate (no exact survey pin available). */
  approxGeo?: boolean;
  streetViewHeading?: number;
  result?: { outcome: AuctionOutcome; salePrice?: number };
}

export const auctions: Auction[] = [
  // ---- Real data ---------------------------------------------------------
  {
    slug: "rakshitha-textiles-erode",
    lotNo: "EA-2026-014",
    borrower: "M/s. Rakshitha Textiles",
    assetType: "commercial",
    title: "Commercial Property — Nalli Hospital Road, Erode",
    excerpt:
      "1,618.75 sq ft commercial property on Nalli Hospital Road, Erode. Bank e-auction.",
    description: [
      "Secured asset of M/s. Rakshitha Textiles offered for sale by e-auction under the SARFAESI Act. The property measures 1,618.75 sq ft and is located on Nalli Hospital Road, a well-trafficked commercial stretch in Erode.",
      "Bidders must deposit the EMD before the cut-off and complete KYC on the e-auction portal to participate.",
    ],
    area: 1618.75,
    areaLabel: "1,618.75 sq ft",
    reservePrice: 15700000,
    emd: 1570000,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-06-22T10:30:00+05:30",
    end: "2026-06-22T13:30:00+05:30",
    inspectionDate: "2026-06-18",
    emdLastDate: "2026-06-20",
    address: {
      area: "Nalli Hospital Road",
      city: "Erode",
      region: "TN",
      postalCode: "638009",
      country: "IN",
    },
    geo: { lat: 11.34645, lng: 77.71729 },
    streetViewHeading: 73,
  },
  {
    slug: "gayatri-adventure-park-veerapandi",
    lotNo: "EA-2026-016",
    borrower: "M/s. Gayatri Prop Adventure Park",
    assetType: "land",
    title: "7-Acre Land — Veerapandi Village, Coimbatore North",
    excerpt:
      "7 acres of land at Veerapandi Village, Coimbatore North Taluk. Bank e-auction.",
    description: [
      "A large 7-acre land parcel at Veerapandi Village, Coimbatore North Taluk, offered for sale by e-auction. Suited to development, institutional, or leisure use given its scale and setting near the Anaikatti foothills.",
      "Intending bidders should inspect the property and review the encumbrance and title documents published with the auction notice.",
    ],
    area: 304920,
    areaLabel: "7 acres",
    reservePrice: 35100000,
    emd: 3510000,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-06-29T11:00:00+05:30",
    end: "2026-06-29T16:00:00+05:30",
    inspectionDate: "2026-06-24",
    emdLastDate: "2026-06-27",
    address: {
      area: "Veerapandi Village, Coimbatore North Taluk",
      city: "Coimbatore",
      region: "TN",
      postalCode: "641110",
      country: "IN",
    },
    geo: { lat: 11.10747, lng: 76.74831 },
    streetViewHeading: 181,
  },
  {
    slug: "jb-conductors-sanganoor",
    lotNo: "EA-2026-018",
    borrower: "M/s. J B Conductors",
    assetType: "commercial",
    title: "Commercial Land — Gandhipuram SRD, Sanganoor, Coimbatore",
    excerpt:
      "4,848 sq ft commercial land at Gandhipuram SRD, Sanganoor Village, Coimbatore. Bank e-auction.",
    description: [
      "Secured asset of M/s. J B Conductors: 4,848 sq ft of commercial land at Gandhipuram SRD, Sanganoor Village, Coimbatore — a prime, well-connected location close to the Gandhipuram commercial hub.",
      "The sale is conducted on an 'as is where is' and 'as is what is' basis under the SARFAESI Act. EMD and KYC must be completed before the auction.",
    ],
    area: 4848,
    areaLabel: "4,848 sq ft",
    reservePrice: 63911000,
    emd: 6391100,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-07-23T10:30:00+05:30",
    end: "2026-07-23T13:30:00+05:30",
    inspectionDate: "2026-07-17",
    emdLastDate: "2026-07-21",
    address: {
      area: "Gandhipuram SRD, Sanganoor Village",
      city: "Coimbatore",
      region: "TN",
      postalCode: "641027",
      country: "IN",
    },
    geo: { lat: 11.041, lng: 76.968 },
    approxGeo: true,
    streetViewHeading: 90,
  },

  // ---- Illustrative entries (to populate Live + Past sections) ------------
  {
    slug: "sri-venkateswara-mills-tiruppur",
    lotNo: "EA-2026-012",
    borrower: "M/s. Sri Venkateswara Mills",
    assetType: "industrial",
    title: "Industrial Unit — SIDCO, Tiruppur",
    excerpt:
      "12,500 sq ft industrial unit with shed at SIDCO Industrial Estate, Tiruppur. Live e-auction.",
    description: [
      "An industrial unit with covered shed at SIDCO Industrial Estate, Tiruppur, currently open for live bidding on the e-auction portal.",
      "Register, deposit EMD, and place your bid before the auction window closes.",
    ],
    area: 12500,
    areaLabel: "12,500 sq ft",
    reservePrice: 28500000,
    emd: 2850000,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-06-19T10:00:00+05:30",
    end: "2026-06-23T17:00:00+05:30",
    inspectionDate: "2026-06-14",
    emdLastDate: "2026-06-17",
    address: {
      area: "SIDCO Industrial Estate",
      city: "Tiruppur",
      region: "TN",
      postalCode: "641604",
      country: "IN",
    },
    geo: { lat: 11.1085, lng: 77.3411 },
    streetViewHeading: 120,
  },
  {
    slug: "annapoorna-foods-peelamedu",
    lotNo: "EA-2026-006",
    borrower: "M/s. Annapoorna Foods",
    assetType: "commercial",
    title: "Commercial Building — Peelamedu, Coimbatore",
    excerpt:
      "3,200 sq ft commercial building at Peelamedu, Coimbatore. Auction completed — sold.",
    description: [
      "A commercial building at Peelamedu, Coimbatore, sold via e-auction in April 2026 above its reserve price.",
    ],
    area: 3200,
    areaLabel: "3,200 sq ft",
    reservePrice: 42000000,
    emd: 4200000,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-04-10T11:00:00+05:30",
    end: "2026-04-10T14:00:00+05:30",
    address: {
      area: "Peelamedu",
      city: "Coimbatore",
      region: "TN",
      postalCode: "641004",
      country: "IN",
    },
    geo: { lat: 11.0299, lng: 77.0266 },
    streetViewHeading: 200,
    result: { outcome: "sold", salePrice: 45600000 },
  },
  {
    slug: "ks-traders-warehouse-salem",
    lotNo: "EA-2026-003",
    borrower: "M/s. K S Traders",
    assetType: "industrial",
    title: "Warehouse — Suramangalam, Salem",
    excerpt:
      "8,000 sq ft warehouse at Suramangalam, Salem. Auction completed — unsold.",
    description: [
      "An 8,000 sq ft warehouse at Suramangalam, Salem, offered in February 2026. The auction closed without a qualifying bid; a re-auction may be scheduled.",
    ],
    area: 8000,
    areaLabel: "8,000 sq ft",
    reservePrice: 19500000,
    emd: 1950000,
    currency: "INR",
    authority: "Authorised Officer (SARFAESI)",
    start: "2026-02-25T10:30:00+05:30",
    end: "2026-02-25T13:30:00+05:30",
    address: {
      area: "Suramangalam",
      city: "Salem",
      region: "TN",
      postalCode: "636005",
      country: "IN",
    },
    geo: { lat: 11.6643, lng: 78.1311 },
    streetViewHeading: 300,
    result: { outcome: "unsold" },
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function auctionStatus(a: Auction, now = new Date()): AuctionStatus {
  if (a.result) return "completed";
  const start = new Date(a.start);
  const end = new Date(a.end);
  if (now < start) return "upcoming";
  if (now > end) return "completed";
  return "live";
}

export function getAuctions(): Auction[] {
  return auctions;
}

export function getAllAuctionSlugs(): string[] {
  return auctions.map((a) => a.slug);
}

export function getAuctionBySlug(slug: string): Auction | undefined {
  return auctions.find((a) => a.slug === slug);
}

export function groupAuctions(now = new Date()): {
  live: Auction[];
  upcoming: Auction[];
  past: Auction[];
} {
  const live: Auction[] = [];
  const upcoming: Auction[] = [];
  const past: Auction[] = [];
  for (const a of auctions) {
    const status = auctionStatus(a, now);
    if (status === "live") live.push(a);
    else if (status === "upcoming") upcoming.push(a);
    else past.push(a);
  }
  upcoming.sort((a, b) => +new Date(a.start) - +new Date(b.start));
  past.sort((a, b) => +new Date(b.start) - +new Date(a.start));
  return { live, upcoming, past };
}

export const assetTypeLabels: Record<AuctionAssetType, string> = {
  land: "Land",
  residential: "Residential",
  commercial: "Commercial",
  industrial: "Industrial",
};

export const statusLabels: Record<AuctionStatus, string> = {
  live: "Live now",
  upcoming: "Upcoming",
  completed: "Completed",
};

export const outcomeLabels: Record<AuctionOutcome, string> = {
  sold: "Sold",
  unsold: "Unsold",
  withdrawn: "Withdrawn",
};
