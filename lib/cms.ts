const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const USE_PREVIEW = process.env.DATOCMS_USE_PREVIEW === "true";

const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
  srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

interface FetchAPIOptions {
  variables?: any;
  preview?: boolean;
}
async function fetchAPI(query: string, options?: FetchAPIOptions) {
  const preview = options?.preview ?? USE_PREVIEW;
  const variables = options?.variables;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${API_TOKEN}`);

  if (preview) {
    headers.append("X-Include-Drafts", "true");
  }

  const res = await fetch(API_URL, {
    cache: "force-cache",
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

const SECTIONS_QUERY = `
{
  hero {
    heading
    subheading
  }
  allSections {
    id
    verb
    adjective
    cards {
      id
      image {
        responsiveImage(imgixParams: {fm: jpg, h: 512 }) {
          ...responsiveImageFragment
        }
      }
      title
      titleBlock {
        __typename
        ... on ProjectTitleRecord {
          subtitle
        }
        ... on TalkTitleRecord {
          date
          location
        }
        ... on TeachTitleRecord {
          location
        }
      }
      url
      actions {
				asset {
          url
          format
        }
        icon
        id
        tooltip
        url
      }
    }
  }
  contact {
    means {
      id
      alt
      icon
      url
    }
  }
}

${responsiveImageFragment}
`;

export interface ResponsiveImage {
  srcSet: string;
  webpSrcSet: string;
  sizes: string;
  src: string;
  width: number;
  height: number;
  aspectRatio: number;
  alt: string;
  title: string;
  bgColor: string;
  base64: string;
}

export interface CardAction {
  id: string;
  icon: "Github" | "Youtube" | "File";
  url?: string;
  asset?: {
    url: string;
    format: string;
  };
  tooltip?: string;
}

export type TitleBlock =
  | { __typename: "ProjectTitleRecord"; subtitle?: string }
  | {
      __typename: "TalkTitleRecord";
      date?: string;
      location?: string;
    }
  | {
      __typename: "TeachTitleRecord";
      location?: string;
    }
  | {
      __typename: "ArticleTitleRecord";
    };

export interface Card {
  id: string;
  title: string;
  titleBlock: TitleBlock;
  url: string;
  image: {
    responsiveImage: ResponsiveImage;
  };
  actions?: CardAction[];
}

export interface Section {
  id: string;
  verb: string;
  adjective: string;
  cards: Card[];
}

export interface ContactMeans {
  id: string;
  alt: string;
  icon: string;
  url: string;
}

export interface Hero {
  heading: string;
  subheading: string;
}

export async function getSections(): Promise<{
  sections: Section[];
  contactMeans: ContactMeans[];
  hero: Hero;
}> {
  const data = await fetchAPI(SECTIONS_QUERY);

  const contactMeans = (data?.contact?.means ?? []) as ContactMeans[];
  const sections = (data?.allSections ?? []) as Section[];
  const hero = data?.hero as Hero;

  return {
    hero,
    sections,
    contactMeans,
  };
}
