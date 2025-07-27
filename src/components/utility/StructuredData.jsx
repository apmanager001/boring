import Script from "next/script";

export const WebsiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Boring Squirrel",
    url: "https://boringsquirrel.com",
    description:
      "Free online games platform featuring puzzle games, strategy games, and multiplayer experiences",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://boringsquirrel.com/games?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    sameAs: [
      "https://twitter.com/boringsquirrel",
      "https://facebook.com/boringsquirrel",
    ],
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Boring Squirrel",
    url: "https://boringsquirrel.com",
    logo: "https://boringsquirrel.com/sqir.jpg",
    description: "Free online games platform",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/boringsquirrel",
      "https://facebook.com/boringsquirrel",
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const GameSchema = ({ game }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: game.name,
    description: game.description,
    url: `https://boringsquirrel.com${game.link}`,
    image: `https://boringsquirrel.com${game.image}`,
    applicationCategory: "Game",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
    genre: game.tags.join(", "),
    publisher: {
      "@type": "Organization",
      name: "Boring Squirrel",
    },
  };

  return (
    <Script
      id={`game-schema-${game.id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
