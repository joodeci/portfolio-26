import { client } from './sanity';

// Fetch all case studies for the Work section grid
export async function getCaseStudies() {
  const query = `*[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    category,
    year,
    coverImage,
    tags,
    publishedAt
  }`;

  return await client.fetch(query);
}

// Fetch a single case study by slug (for the case study page)
export async function getCaseStudyBySlug(slug: string) {
  // Normalise: strip any accidental leading slash so "/subscription" and "subscription" both match
  const normalizedSlug = slug.startsWith('/') ? slug.slice(1) : slug;
  const query = `*[_type == "caseStudy" && (slug.current == $slug || slug.current == "/" + $slug)][0] {
    _id,
    title,
    slug,
    shortDescription,
    category,
    year,
    client,
    coverImage,
    tags,
    sections[] {
      _type,
      _key,
      contentType,
      richText,
      // roleAndTeamSection
      myRole,
      team,
      duration,
      tools,
      // problemGoalsSection
      problem,
      constraints,
      goals,
      // gallerySection
      images[] {
        asset,
        caption,
        alt
      },
      // processSection
      steps[] {
        phase,
        description,
        activities
      },
      // solutionSection
      solutionDescription,
      metrics[] {
        value,
        label
      },
      // takeawaysSection
      takeaways[] {
        title,
        description
      },
      // customContentSection
      heading
    }
  }`;

  return await client.fetch(query, { slug: normalizedSlug });
}

// Get all slugs — used by Next.js to know which pages to generate
export async function getAllCaseStudySlugs() {
  const query = `*[_type == "caseStudy"] { slug }`;
  return await client.fetch(query);
}
