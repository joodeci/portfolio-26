import WorkCard from '@/components/ui/WorkCard';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { getCaseStudies } from '@/lib/queries';
import { urlFor } from '@/lib/sanity';

export default async function WorkSection() {
  // This fetches case studies from Sanity CMS
  // If Sanity isn't set up yet, it will show placeholder cards
  let caseStudies: any[] = [];

  try {
    caseStudies = await getCaseStudies();
  } catch (e) {
    console.log('Sanity not connected yet — showing placeholder data');
  }

  // Placeholder data shown before Sanity is connected
  const placeholderProjects = [
    {
      _id: '1',
      title: 'E-Commerce Redesign',
      shortDescription: 'Complete overhaul of a fashion retailer\'s checkout flow, reducing drop-off by 34% and increasing mobile conversion by 48%.',
      category: 'E-Commerce',
      year: '2024',
      slug: { current: 'ecommerce-redesign' },
      tags: ['UX Research', 'Interaction Design', 'A/B Testing'],
    },
    {
      _id: '2',
      title: 'FinTech Dashboard',
      shortDescription: 'Designing a complex investment portfolio dashboard that made dense financial data legible and actionable for retail investors.',
      category: 'Finance',
      year: '2024',
      slug: { current: 'fintech-dashboard' },
      tags: ['Data Visualisation', 'Systems Design', 'Accessibility'],
    },
    {
      _id: '3',
      title: 'Brand Identity System',
      shortDescription: 'Building a comprehensive design system and brand identity for a DTC skincare startup from the ground up.',
      category: 'Graphic Design',
      year: '2023',
      slug: { current: 'brand-identity-system' },
      tags: ['Brand Strategy', 'Design Systems', 'Typography'],
    },
  ];

  const projects = caseStudies.length > 0 ? caseStudies : placeholderProjects;

  return (
    <div
      id="work"
      style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}
    >
      <SectionWrapper id="work-content">
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <p className="section-label">Selected Work</p>
          <div className="divider" />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 500,
              color: 'var(--text-primary)',
              maxWidth: '500px',
              lineHeight: 1.2,
            }}
          >
            Case Studies &amp; Projects
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
              maxWidth: '500px',
              lineHeight: 1.7,
            }}
          >
            A selection of projects spanning e-commerce, finance, and brand design. 
            Each tells a story of problem-solving through thoughtful design.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {projects.map((project: any) => (
            <WorkCard
              key={project._id}
              title={project.title}
              description={project.shortDescription}
              category={project.category}
              year={project.year}
              slug={project.slug.current}
              tags={project.tags || []}
              coverImage={
                project.coverImage
                  ? urlFor(project.coverImage).width(800).url()
                  : undefined
              }
            />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}