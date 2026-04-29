import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CaseStudyHeader from '@/components/case-study/CaseStudyHeader';
import CaseStudyGallery from '@/components/case-study/CaseStudyGallery';
import RoleAndTeam from '@/components/case-study/RoleAndTeam';
import ProblemAndGoals from '@/components/case-study/ProblemAndGoals';
import ProcessSection from '@/components/case-study/ProcessSection';
import SolutionsSection from '@/components/case-study/SolutionsSection';
import Takeaways from '@/components/case-study/Takeaways';
import CustomContent from '@/components/case-study/CustomContent';
import LightboxProvider from '@/components/case-study/LightboxProvider';
import { getCaseStudyBySlug, getAllCaseStudySlugs } from '@/lib/queries';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

import type { PortableTextBlock } from '@portabletext/types';

type SanitySlugItem = { slug: { current: string } };
type GalleryImage = { asset?: { asset?: { _ref?: string } }; caption?: string; alt?: string };
type CaseStudySection = {
  _type: string;
  _key: string;
  contentType?: string | null;
  richText?: PortableTextBlock[] | null;
  myRole?: string | null;
  team?: string[] | null;
  duration?: string | null;
  tools?: string[] | null;
  images?: GalleryImage[];
  steps?: Array<{ phase: string; description: string; activities?: string[] | null }> | null;
  solutionDescription?: string | null;
  metrics?: Array<{ value: string; label: string }> | null;
  takeaways?: Array<{ title: string; description: string }> | null;
  problem?: string | null;
  constraints?: string[] | null;
  goals?: string[] | null;
  heading?: string | null;
};
type CaseStudyData = {
  title: string;
  shortDescription?: string;
  category?: string;
  year?: string;
  client?: string;
  coverImage?: Record<string, unknown>;
  sections?: CaseStudySection[];
};

export async function generateStaticParams() {
  try {
    const slugs = await getAllCaseStudySlugs();
    return slugs.map((item: SanitySlugItem) => ({ slug: item.slug.current }));
  } catch {
    return [];
  }
}

function renderSection(section: CaseStudySection) {
  switch (section._type) {
    case 'roleAndTeamSection':
      return (
        <RoleAndTeam
          key={section._key}
          myRole={section.myRole}
          team={section.team}
          duration={section.duration}
          tools={section.tools}
        />
      );

    case 'problemGoalsSection':
      return (
        <ProblemAndGoals
          key={section._key}
          contentType={section.contentType}
          richText={section.richText}
          problem={section.problem}
          constraints={section.constraints}
          goals={section.goals}
        />
      );

    case 'gallerySection': {
      const images = (section.images ?? [])
        .filter((img: any) => img?.asset?.asset?._ref)
        .map((img: any) => ({
          url: urlFor(img.asset).width(1200).url(),
          caption: img.caption,
          alt: img.alt,
        }));
      return <CaseStudyGallery key={section._key} images={images} />;
    }

    case 'processSection':
      return (
        <ProcessSection
          key={section._key}
          contentType={section.contentType}
          richText={section.richText}
          steps={section.steps}
        />
      );

    case 'solutionSection':
      return (
        <SolutionsSection
          key={section._key}
          contentType={section.contentType}
          richText={section.richText}
          solutionDescription={section.solutionDescription}
          metrics={section.metrics}
        />
      );

    case 'takeawaysSection':
      return (
        <Takeaways
          key={section._key}
          contentType={section.contentType}
          richText={section.richText}
          takeaways={section.takeaways}
        />
      );

    case 'customContentSection':
      return (
        <CustomContent
          key={section._key}
          heading={section.heading}
          richText={section.richText}
        />
      );

    default:
      return null;
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let caseStudy: CaseStudyData | null = null;

  try {
    caseStudy = await getCaseStudyBySlug(slug);
  } catch {
    // Sanity not connected yet
  }

  if (!caseStudy) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: '100vh',
            textAlign: 'center',
            padding: '140px 2rem 5rem',
          }}
        >
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            Case Study Not Found
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}
          >
            This page will appear once you add case studies in Sanity.
          </h1>
          <Link
            href="/"
            style={{
              color: 'var(--accent)',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            ← Back to Home
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const coverImageUrl = caseStudy.coverImage
    ? urlFor(caseStudy.coverImage).width(1400).url()
    : undefined;

  return (
    <>
      <Navbar />
      <LightboxProvider>
        <main>
          <CaseStudyHeader
            title={caseStudy.title}
            shortDescription={caseStudy.shortDescription ?? ''}
            category={caseStudy.category ?? ''}
            year={caseStudy.year ?? ''}
            client={caseStudy.client}
            coverImage={coverImageUrl}
          />
          {(caseStudy.sections ?? []).map(renderSection)}
        </main>
      </LightboxProvider>
      <Footer />
    </>
  );
}
