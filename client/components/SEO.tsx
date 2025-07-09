import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  published?: string;
  updated?: string;
  schema?: object;
}

const defaultMeta = {
  title: "TrustConnect - Find Trusted Service Professionals Near You",
  description:
    "Your one-stop destination to discover trusted professionals near you for all your needs - home services, appliance and electronic repairs, beauticians, and much more. Book with confidence.",
  keywords:
    "home services, appliance repair, beauticians, professionals, trusted service providers, local services, home maintenance, cleaning services, handyman, plumber, electrician",
  image: "/og-image.jpg",
  url: "https://trustconnect.com",
  type: "website",
  author: "TrustConnect",
};

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  author,
  published,
  updated,
  schema,
}: SEOProps) {
  const meta = {
    title: title ? `${title} | TrustConnect` : defaultMeta.title,
    description: description || defaultMeta.description,
    keywords: keywords || defaultMeta.keywords,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
    author: author || defaultMeta.author,
  };

  const structuredData = schema || {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrustConnect",
    description: meta.description,
    url: meta.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${meta.url}/services?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    provider: {
      "@type": "Organization",
      name: "TrustConnect",
      url: meta.url,
      logo: `${meta.url}/logo.png`,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-TRUST-CO",
        contactType: "customer service",
        availableLanguage: "English",
      },
      sameAs: [
        "https://facebook.com/trustconnect",
        "https://twitter.com/trustconnect",
        "https://linkedin.com/company/trustconnect",
        "https://instagram.com/trustconnect",
      ],
    },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content={meta.author} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <link rel="canonical" href={meta.url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="TrustConnect" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@trustconnect" />
      <meta name="twitter:creator" content="@trustconnect" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e40af" />
      <meta name="msapplication-TileColor" content="#1e40af" />
      <meta name="application-name" content="TrustConnect" />
      <meta name="apple-mobile-web-app-title" content="TrustConnect" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {/* Article specific meta tags */}
      {published && (
        <meta property="article:published_time" content={published} />
      )}
      {updated && <meta property="article:modified_time" content={updated} />}
      {author && <meta property="article:author" content={author} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://api.stripe.com" />
      <link rel="preconnect" href="https://www.paypal.com" />

      {/* Favicon */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  );
}

// Pre-defined SEO configurations for different page types
export const pageSEO = {
  home: {
    title: "TrustConnect - Find Trusted Service Professionals Near You",
    description:
      "Your one-stop destination to discover trusted professionals near you for all your needs - home services, appliance and electronic repairs, beauticians, and much more.",
    keywords:
      "home services, appliance repair, beauticians, professionals, trusted service providers, local services",
  },

  services: {
    title: "Browse Professional Services",
    description:
      "Discover thousands of verified professionals offering home services, repairs, beauty treatments, and more. Compare ratings, prices, and book instantly.",
    keywords:
      "professional services, home repair, cleaning, beauty services, skilled workers",
  },

  providers: {
    title: "Professional Service Providers",
    description:
      "Meet our verified professional service providers. Background checked, highly rated, and ready to help with your service needs.",
    keywords:
      "service providers, professionals, contractors, specialists, verified experts",
  },

  booking: {
    title: "Book a Service",
    description:
      "Easy online booking for professional services. Choose your date, time, and provider. Secure payment and satisfaction guaranteed.",
    keywords:
      "book service, online booking, schedule appointment, professional services",
  },

  about: {
    title: "About TrustConnect",
    description:
      "Learn about TrustConnect's mission to connect customers with trusted service professionals. Safe, reliable, and convenient service marketplace.",
    keywords: "about trustconnect, company info, mission, service marketplace",
  },

  contact: {
    title: "Contact TrustConnect",
    description:
      "Get in touch with TrustConnect customer support. We're here to help with any questions about our services or platform.",
    keywords: "contact, customer support, help, questions",
  },

  providerRegistration: {
    title: "Become a Service Provider",
    description:
      "Join TrustConnect as a verified service provider. Grow your business, connect with customers, and increase your earnings.",
    keywords:
      "become provider, join platform, service professional, business growth",
  },
};

// Service-specific SEO
export const serviceSEO = {
  homeServices: {
    title: "Home Services - Cleaning, Maintenance & Repairs",
    description:
      "Find trusted home service professionals for cleaning, maintenance, repairs, and more. Background verified providers with excellent ratings.",
    keywords:
      "home services, house cleaning, home maintenance, home repairs, housekeeping",
  },

  applianceRepair: {
    title: "Appliance Repair Services - AC, Refrigerator, Washing Machine",
    description:
      "Expert appliance repair services for all major brands. Same-day service available for AC, refrigerator, washing machine, and more.",
    keywords:
      "appliance repair, AC repair, refrigerator repair, washing machine repair, appliance service",
  },

  beauty: {
    title: "Beauty & Wellness Services - Salon, Spa, Fitness",
    description:
      "Professional beauty and wellness services at your convenience. Salons, spas, personal trainers, and wellness experts.",
    keywords:
      "beauty services, salon services, spa treatments, fitness trainers, wellness",
  },

  automotive: {
    title: "Automotive Services - Car Wash, Repairs, Maintenance",
    description:
      "Professional automotive services including car wash, repairs, maintenance, and detailing. Trusted mechanics and auto professionals.",
    keywords:
      "automotive services, car repair, auto maintenance, car wash, vehicle service",
  },

  electronics: {
    title: "Electronics Repair - Phone, Laptop, TV Repairs",
    description:
      "Expert electronics repair services for phones, laptops, TVs, and all electronic devices. Quick turnaround and warranty included.",
    keywords:
      "electronics repair, phone repair, laptop repair, TV repair, device service",
  },
};
