import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCaseStudyBySlug } from '@/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.SANITY_DRAFT_SECRET || !slug) {
    return new Response('Invalid token', { status: 401 });
  }

  const post = await getCaseStudyBySlug(slug, true);

  if (!post) {
    return new Response('Invalid slug', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(`/case-study/${post.slug.current}`);
}
