import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => ({}));
    const slug = body?.slug?.current as string | undefined;

    // Revalidate the homepage so the WorkSection listing updates
    revalidatePath('/');

    // Revalidate the specific case study page, or all of them if no slug
    if (slug) {
      revalidatePath(`/case-study/${slug}`);
    } else {
      revalidatePath('/case-study/[slug]', 'page');
    }

    return NextResponse.json({ revalidated: true, slug: slug ?? 'all', now: Date.now() });
  } catch {
    return NextResponse.json({ message: 'Failed to revalidate' }, { status: 500 });
  }
}
