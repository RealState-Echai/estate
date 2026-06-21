/**
 * Schema.org JSON-LD builders. Rich structured data helps search engines
 * understand the organisation, individual listings, breadcrumbs, and the
 * listings collection — improving eligibility for rich results.
 */

import { siteConfig, absoluteUrl } from "@/lib/site";
import {
  type Property,
  statusLabels,
  typeLabels,
} from "@/lib/properties";

type Json = Record<string, unknown>;

/** RealEstateAgent / Organization — emitted site-wide from the root layout. */
export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    logo: absoluteUrl("/icon.svg"),
    image: absoluteUrl("/opengraph-image"),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      addressRegion: siteConfig.contact.address.region,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

/** WebSite schema with SearchAction — enables a sitelinks search box. */
export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/properties/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Single listing — modelled as a SingleFamilyResidence offer. */
export function propertySchema(property: Property): Json {
  const url = absoluteUrl(`/properties/${property.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "SingleFamilyResidence"],
    "@id": `${url}/#listing`,
    name: property.title,
    description: property.excerpt,
    url,
    category: typeLabels[property.type],
    image: property.images.map((i) => i.url),
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    yearBuilt: property.yearBuilt,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "FTK", // square foot
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address.street,
      addressLocality: property.address.city,
      addressRegion: property.address.region,
      postalCode: property.address.postalCode,
      addressCountry: property.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.geo.lat,
      longitude: property.geo.lng,
    },
    amenityFeature: property.features.map((f) => ({
      "@type": "LocationFeatureSpecification",
      name: f,
      value: true,
    })),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability:
        property.status === "sold"
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: { "@id": `${siteConfig.url}/#organization` },
      description: statusLabels[property.status],
    },
  };
}

/** BreadcrumbList for nested pages. */
export function breadcrumbSchema(
  items: { name: string; path: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** ItemList for the listings index — helps surface the collection. */
export function listingsCollectionSchema(properties: Property[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Property Listings",
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/properties/${property.slug}`),
      name: property.title,
    })),
  };
}
