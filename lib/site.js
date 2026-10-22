// Single source of truth for SEO: names, roles, links and structured data.
// Every page's metadata and the JSON-LD graph read from here.

export const SITE_URL = 'https://shohorab.com';

export const PERSON_NAME = 'Shohorab H Shawon';
export const FULL_NAME = 'Shohorab Hossain Shawon';

// Every way people search for the name. Used in structured data, where search
// engines do read it (unlike the ignored <meta name="keywords">).
export const ALTERNATE_NAMES = [
  'Shohorab Hossain Shawon',
  'Shohorab H. Shawon',
  'Shohorab Shawon',
  'Shohorab Hossain',
  'Shohorab H',
  'Shohorab',
  'Shawon',
  'SHS',
];

export const ROLES = ['Filmmaker', 'Visual Storyteller', 'Photographer', 'Software Developer'];
export const ROLES_TEXT = 'Filmmaker, Visual Storyteller, Photographer & Software Developer';

export const DEFAULT_TITLE = `${PERSON_NAME} — ${ROLES_TEXT}`;
export const DEFAULT_DESCRIPTION =
  `${PERSON_NAME} (${FULL_NAME}) is a Dhaka-based filmmaker, visual storyteller, photographer and software developer ` +
  'with a CSE degree from American International University-Bangladesh (AIUB). Films, photography and software work.';

export const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: `${PERSON_NAME} — ${ROLES_TEXT}`,
};

export const SOCIAL_PROFILES = [
  'https://www.instagram.com/shohorabs.pov/',
  'https://www.facebook.com/shohorabhshawon/',
  'https://www.linkedin.com/in/shohorabhshawon/',
  'https://github.com/ShohorabHShawon',
  'https://www.behance.net/shohorabhshawon',
];

const UNIVERSITY = {
  '@type': 'CollegeOrUniversity',
  name: 'American International University-Bangladesh',
  alternateName: 'AIUB',
  url: 'https://www.aiub.edu',
};

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// schema.org graph: who the site is about, and the site itself.
export const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON_NAME,
      alternateName: ALTERNATE_NAMES,
      givenName: 'Shohorab',
      additionalName: 'Hossain',
      familyName: 'Shawon',
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpg`,
      description: DEFAULT_DESCRIPTION,
      jobTitle: ROLES,
      hasOccupation: [
        { '@type': 'Occupation', name: 'Filmmaker' },
        { '@type': 'Occupation', name: 'Visual Storyteller' },
        { '@type': 'Occupation', name: 'Photographer' },
        { '@type': 'Occupation', name: 'Software Developer' },
      ],
      alumniOf: UNIVERSITY,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'Bachelor of Science in Computer Science and Engineering (CSE)',
        recognizedBy: UNIVERSITY,
      },
      knowsAbout: [
        'Filmmaking',
        'Cinematography',
        'Visual storytelling',
        'Photography',
        'Street photography',
        'Color grading',
        'DaVinci Resolve',
        'Software development',
        'Web development',
        'Next.js',
        'React',
        'Computer Science',
      ],
      homeLocation: {
        '@type': 'Place',
        name: 'Dhaka, Bangladesh',
        address: { '@type': 'PostalAddress', addressLocality: 'Dhaka', addressCountry: 'BD' },
      },
      sameAs: SOCIAL_PROFILES,
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: SITE_URL,
      name: PERSON_NAME,
      alternateName: [FULL_NAME, 'Shohorab Shawon', 'shohorab.com'],
      description: DEFAULT_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
      about: { '@id': PERSON_ID },
    },
  ],
};

/**
 * Per-page metadata with the right canonical URL and share card.
 * Keeps every page self-canonical (a root-level canonical would make
 * search engines treat every page as a copy of the home page).
 */
export function pageMetadata({ title, description = DEFAULT_DESCRIPTION, path = '/', image = OG_IMAGE, type = 'website' }) {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  // Matches the layout's title template ("%s | Shohorab H Shawon").
  const fullTitle = title ? `${title} | ${PERSON_NAME}` : DEFAULT_TITLE;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: PERSON_NAME,
      locale: 'en_US',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
