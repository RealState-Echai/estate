/**
 * Static property catalogue. This is the single data source consumed at
 * build time by every page (SSG). To add a listing, append an entry here —
 * the listings grid, detail pages, sitemap, and JSON-LD all update from it.
 */

export type PropertyStatus = "for-sale" | "for-rent" | "sold";
export type PropertyType =
  | "villa"
  | "penthouse"
  | "estate"
  | "apartment"
  | "townhouse";

export interface PropertyImage {
  url: string;
  alt: string;
}

export interface Property {
  slug: string;
  /** Short public reference code, e.g. "RT-001". */
  propertyId: string;
  title: string;
  /** One-line summary used in cards and meta descriptions. */
  excerpt: string;
  /** Long description (paragraphs) rendered on the detail page. */
  description: string[];
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  currency: "USD";
  bedrooms: number;
  bathrooms: number;
  /** Interior area in square feet. */
  area: number;
  lotSize?: number;
  yearBuilt: number;
  garage: number;
  /** Compass orientation of the main aspect, e.g. "East". */
  facing: string;
  featured: boolean;
  /** Trust signals shown as badges. */
  verified: boolean;
  ownerDirect: boolean;
  hotDeal?: boolean;
  /** Income-generating properties carry these investment figures. */
  monthlyIncome?: number;
  /** Gross annual rental yield as a percentage, e.g. 4.2. */
  rentalYield?: number;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: { lat: number; lng: number };
  /** Optional Street View framing (degrees). */
  streetView?: { heading: number; pitch?: number };
  /** Nearby points of interest shown in the location section. */
  nearby: { name: string; distance: string }[];
  features: string[];
  images: PropertyImage[];
  agent: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}

const img = (id: string, alt: string): PropertyImage => ({
  url: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`,
  alt,
});

export const properties: Property[] = [
  {
    slug: "azure-cliff-villa",
    propertyId: "RT-001",
    facing: "West",
    verified: true,
    ownerDirect: false,
    title: "Azure Cliff Villa",
    excerpt:
      "A glass-walled modern villa perched above the Pacific with infinity pool and panoramic ocean views.",
    description: [
      "Set into a private cliffside, Azure Cliff Villa is an exercise in restraint and light. Floor-to-ceiling glass dissolves the boundary between the living spaces and the horizon, while warm oak floors and travertine ground the interiors.",
      "The principal suite occupies its own wing, opening onto a terrace and the infinity-edge pool that appears to spill into the ocean beyond. A chef's kitchen, climate-controlled wine cellar, and home cinema complete the offering.",
    ],
    type: "villa",
    status: "for-sale",
    price: 8650000,
    currency: "USD",
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    lotSize: 18000,
    yearBuilt: 2021,
    garage: 3,
    featured: true,
    address: {
      street: "14 Cliff Edge Road",
      city: "Carmel-by-the-Sea",
      region: "CA",
      postalCode: "93923",
      country: "US",
    },
    geo: { lat: 36.5552, lng: -121.9233 },
    streetView: { heading: 160 },
    nearby: [
      { name: "Carmel Beach", distance: "0.4 mi" },
      { name: "Pebble Beach Golf Links", distance: "3.2 mi" },
      { name: "Carmel Plaza shopping", distance: "1.1 mi" },
      { name: "Point Lobos State Reserve", distance: "2.8 mi" },
    ],
    features: [
      "Infinity-edge pool",
      "Floor-to-ceiling ocean views",
      "Wine cellar",
      "Home cinema",
      "Smart-home automation",
      "Heated travertine terraces",
    ],
    images: [
      img("photo-1600596542815-ffad4c1539a9", "Modern cliffside villa exterior at dusk"),
      img("photo-1600585154340-be6161a56a0c", "Bright open-plan living room with ocean view"),
      img("photo-1600607687939-ce8a6c25118c", "Designer kitchen with island and marble counters"),
      img("photo-1600566753086-00f18fb6b3ea", "Principal suite with floor-to-ceiling windows"),
    ],
    agent: {
      name: "Vivienne Laurent",
      title: "Senior Estate Advisor",
      phone: "+1-555-0100",
      email: "vivienne@example.com",
    },
  },
  {
    slug: "skyline-penthouse-one",
    propertyId: "RT-002",
    facing: "South",
    verified: true,
    ownerDirect: false,
    monthlyIncome: 38000,
    rentalYield: 3.7,
    title: "Skyline Penthouse One",
    excerpt:
      "A full-floor penthouse wrapped in glass, 58 storeys above the city with a private rooftop terrace.",
    description: [
      "Skyline Penthouse One crowns one of the city's most coveted towers. A private elevator opens directly into a gallery-like foyer, leading to interiors finished in book-matched stone, brushed brass, and rift-cut walnut.",
      "Entertaining is effortless: a 40-foot great room flows to a wraparound terrace with an outdoor kitchen and fire feature. The wellness suite includes a steam room, sauna, and a glass-edge plunge pool overlooking the skyline.",
    ],
    type: "penthouse",
    status: "for-sale",
    price: 12400000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 5,
    area: 5400,
    yearBuilt: 2020,
    garage: 2,
    featured: true,
    address: {
      street: "1 Beacon Tower, PH58",
      city: "San Francisco",
      region: "CA",
      postalCode: "94105",
      country: "US",
    },
    geo: { lat: 37.7897, lng: -122.3942 },
    streetView: { heading: 90 },
    nearby: [
      { name: "Ferry Building Marketplace", distance: "0.3 mi" },
      { name: "Salesforce Park", distance: "0.5 mi" },
      { name: "Financial District", distance: "0.2 mi" },
      { name: "Bay Bridge", distance: "0.6 mi" },
    ],
    features: [
      "Private elevator entry",
      "Wraparound rooftop terrace",
      "Steam room & sauna",
      "Glass-edge plunge pool",
      "Smart-glass walls",
      "24/7 concierge",
    ],
    images: [
      img("photo-1545324418-cc1a3fa10c00", "Luxury penthouse living room at night"),
      img("photo-1502672260266-1c1ef2d93688", "Penthouse terrace with city skyline view"),
      img("photo-1560448204-e02f11c3d0e2", "Elegant dining area with floor-to-ceiling windows"),
      img("photo-1522708323590-d24dbb6b0267", "Spa-like bathroom with freestanding tub"),
    ],
    agent: {
      name: "Marcus Reyes",
      title: "Director, Urban Collection",
      phone: "+1-555-0100",
      email: "marcus@example.com",
    },
  },
  {
    slug: "willow-hall-estate",
    propertyId: "RT-003",
    facing: "East",
    verified: true,
    ownerDirect: false,
    title: "Willow Hall Estate",
    excerpt:
      "A gated 1.5-acre estate with reflecting pond, guest house, and meticulously landscaped grounds.",
    description: [
      "Behind private gates, Willow Hall Estate unfolds across manicured lawns and mature oaks. The residence pairs timeless architecture with thoroughly modern systems, anchored by a double-height entry hall flooded with natural light.",
      "Grounds include a reflecting pond, tennis court, and a detached guest house. Inside, a paneled library, formal and casual dining, and a conservatory create a home equally suited to grand entertaining and quiet retreat.",
    ],
    type: "estate",
    status: "for-sale",
    price: 15800000,
    currency: "USD",
    bedrooms: 7,
    bathrooms: 9,
    area: 11200,
    lotSize: 65000,
    yearBuilt: 2016,
    garage: 4,
    featured: true,
    address: {
      street: "8 Willow Hall Lane",
      city: "Atherton",
      region: "CA",
      postalCode: "94027",
      country: "US",
    },
    geo: { lat: 37.4613, lng: -122.1977 },
    streetView: { heading: 200 },
    nearby: [
      { name: "Stanford University", distance: "4.5 mi" },
      { name: "Menlo Country Club", distance: "1.2 mi" },
      { name: "Sand Hill Road", distance: "3.0 mi" },
      { name: "Atherton Caltrain", distance: "0.9 mi" },
    ],
    features: [
      "Gated 1.5-acre grounds",
      "Tennis court",
      "Reflecting pond",
      "Detached guest house",
      "Paneled library",
      "Conservatory",
    ],
    images: [
      img("photo-1613490493576-7fde63acd811", "Grand estate facade with manicured lawn"),
      img("photo-1600210492486-724fe5c67fb0", "Elegant double-height entry hall"),
      img("photo-1600585152220-90363fe7e115", "Formal living room with fireplace"),
      img("photo-1600566753190-17f0baa2a6c3", "Landscaped garden and pond at sunset"),
    ],
    agent: {
      name: "Eleanor Whitfield",
      title: "Principal, Legacy Estates",
      phone: "+1-555-0100",
      email: "eleanor@example.com",
    },
  },
  {
    slug: "harborview-townhouse",
    propertyId: "RT-004",
    facing: "North",
    verified: true,
    ownerDirect: true,
    hotDeal: true,
    monthlyIncome: 14500,
    rentalYield: 4.1,
    title: "Harborview Townhouse",
    excerpt:
      "A four-storey waterfront townhouse with private dock access and a roof deck overlooking the marina.",
    description: [
      "Harborview Townhouse delivers turn-key waterfront living moments from the marina. Each level is thoughtfully zoned, from the garden-level media room to the top-floor primary suite with its own lounge and terrace.",
      "An elevator services all four floors, and the roof deck — complete with kitchenette and fire pit — frames sweeping harbor views. Deeded dock access makes weekends on the water effortless.",
    ],
    type: "townhouse",
    status: "for-sale",
    price: 4250000,
    currency: "USD",
    bedrooms: 4,
    bathrooms: 4,
    area: 3900,
    yearBuilt: 2019,
    garage: 2,
    featured: false,
    address: {
      street: "27 Harborview Walk",
      city: "Sausalito",
      region: "CA",
      postalCode: "94965",
      country: "US",
    },
    geo: { lat: 37.8591, lng: -122.4853 },
    streetView: { heading: 280 },
    nearby: [
      { name: "Sausalito Ferry Terminal", distance: "0.5 mi" },
      { name: "Marinship Park", distance: "0.7 mi" },
      { name: "Bridgeway shops & dining", distance: "0.4 mi" },
      { name: "Golden Gate Bridge", distance: "2.1 mi" },
    ],
    features: [
      "Private elevator",
      "Deeded dock access",
      "Roof deck with fire pit",
      "Garden-level media room",
      "Marina views",
      "Two-car garage",
    ],
    images: [
      img("photo-1605276374104-dee2a0ed3cd6", "Waterfront townhouse exterior"),
      img("photo-1600047509807-ba8f99d2cdde", "Open living space with harbor view"),
      img("photo-1556912172-45b7abe8b7e1", "Modern kitchen with breakfast bar"),
      img("photo-1584622650111-993a426fbf0a", "Rooftop deck with seating and views"),
    ],
    agent: {
      name: "Daniel Okafor",
      title: "Waterfront Specialist",
      phone: "+1-555-0100",
      email: "daniel@example.com",
    },
  },
  {
    slug: "the-vineyard-residence",
    propertyId: "RT-005",
    facing: "East",
    verified: true,
    ownerDirect: true,
    monthlyIncome: 28000,
    rentalYield: 4.9,
    title: "The Vineyard Residence",
    excerpt:
      "A modern farmhouse on five acres of working vineyard with a barrel room and alfresco dining pavilion.",
    description: [
      "The Vineyard Residence blends rustic warmth with clean contemporary lines. Reclaimed timber, board-formed concrete, and steel-framed glass open the home to rows of estate vines and rolling hills.",
      "A temperature-controlled barrel room and tasting lounge anchor the lower level, while the alfresco pavilion — with pizza oven and outdoor fireplace — is built for long evenings under the stars.",
    ],
    type: "villa",
    status: "for-sale",
    price: 6900000,
    currency: "USD",
    bedrooms: 5,
    bathrooms: 5,
    area: 5600,
    lotSize: 217800,
    yearBuilt: 2018,
    garage: 3,
    featured: false,
    address: {
      street: "300 Vine Hollow Road",
      city: "Napa",
      region: "CA",
      postalCode: "94558",
      country: "US",
    },
    geo: { lat: 38.5025, lng: -122.2654 },
    streetView: { heading: 120 },
    nearby: [
      { name: "Downtown Napa", distance: "6.0 mi" },
      { name: "Oxbow Public Market", distance: "6.3 mi" },
      { name: "Silverado Trail", distance: "1.5 mi" },
      { name: "Napa Valley Wine Train", distance: "6.1 mi" },
    ],
    features: [
      "Five-acre working vineyard",
      "Barrel room & tasting lounge",
      "Alfresco dining pavilion",
      "Pizza oven & outdoor fireplace",
      "Solar with battery storage",
      "Saltwater pool",
    ],
    images: [
      img("photo-1568605114967-8130f3a36994", "Modern farmhouse among vineyard rows"),
      img("photo-1583608205776-bfd35f0d9f83", "Warm living room with timber beams"),
      img("photo-1600573472550-8090b5e0745e", "Kitchen with island opening to terrace"),
      img("photo-1571055107559-3e67626fa8be", "Outdoor dining pavilion at dusk"),
    ],
    agent: {
      name: "Sofia Marchetti",
      title: "Country & Vineyard Estates",
      phone: "+1-555-0100",
      email: "sofia@example.com",
    },
  },
  {
    slug: "the-glass-house-loft",
    propertyId: "RT-006",
    facing: "North-East",
    verified: true,
    ownerDirect: false,
    hotDeal: true,
    title: "The Glass House Loft",
    excerpt:
      "A light-filled designer loft in a converted landmark building with soaring ceilings and a private terrace.",
    description: [
      "Inside a celebrated landmark conversion, The Glass House Loft pairs original cast-iron columns with crisp modern interiors. Twelve-foot windows draw light deep into the open-plan living space.",
      "A discreet primary suite, study, and chef's kitchen surround a central great room, while a planted private terrace offers a rare pocket of green in the heart of the district.",
    ],
    type: "apartment",
    status: "for-rent",
    price: 14500,
    currency: "USD",
    bedrooms: 2,
    bathrooms: 2,
    area: 2400,
    yearBuilt: 1908,
    garage: 1,
    featured: false,
    address: {
      street: "55 Foundry Street, Loft 3",
      city: "San Francisco",
      region: "CA",
      postalCode: "94107",
      country: "US",
    },
    geo: { lat: 37.7765, lng: -122.3936 },
    streetView: { heading: 45 },
    nearby: [
      { name: "Oracle Park", distance: "0.6 mi" },
      { name: "Caltrain 4th & King", distance: "0.4 mi" },
      { name: "Yerba Buena Gardens", distance: "0.7 mi" },
      { name: "Moscone Center", distance: "0.5 mi" },
    ],
    features: [
      "Original cast-iron columns",
      "12-foot windows",
      "Private planted terrace",
      "Chef's kitchen",
      "Secure parking",
      "Landmark building",
    ],
    images: [
      img("photo-1502005229762-cf1b2da7c5d6", "Bright open-plan designer loft"),
      img("photo-1493809842364-78817add7ffb", "Living area with large windows and plants"),
      img("photo-1505691938895-1758d7feb511", "Modern kitchen in converted loft"),
      img("photo-1522771739844-6a9f6d5f14af", "Cozy reading nook by the window"),
    ],
    agent: {
      name: "Priya Anand",
      title: "City Leasing Advisor",
      phone: "+1-555-0100",
      email: "priya@example.com",
    },
  },
];

// ---------------------------------------------------------------------------
// Query helpers (used by pages, sitemap, and structured data)
// ---------------------------------------------------------------------------

export function getAllProperties(): Property[] {
  return properties;
}

export function getAllPropertySlugs(): string[] {
  return properties.map((p) => p.slug);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

/** Income-generating listings, highest gross yield first. */
export function getInvestmentProperties(): Property[] {
  return properties
    .filter((p) => p.monthlyIncome != null && p.rentalYield != null)
    .sort((a, b) => (b.rentalYield ?? 0) - (a.rentalYield ?? 0));
}

/** Sorted list of unique cities for the location filter. */
export function getAllCities(): string[] {
  return Array.from(new Set(properties.map((p) => p.address.city))).sort();
}

/** Whole-dollar price per square foot (sale listings). */
export function pricePerSqft(property: Property): number {
  return Math.round(property.price / property.area);
}

export const statusLabels: Record<PropertyStatus, string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  sold: "Sold",
};

export const typeLabels: Record<PropertyType, string> = {
  villa: "Villa",
  penthouse: "Penthouse",
  estate: "Estate",
  apartment: "Apartment",
  townhouse: "Townhouse",
};
