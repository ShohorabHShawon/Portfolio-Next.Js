import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  if (secret !== process.env.MY_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!slug) {
    return NextResponse.json(
      { message: 'Missing slug param' },
      { status: 400 },
    );
  }

  try {
    // This should revalidate the path for the given slug
    // e.g., /blog/my-first-post
    await NextResponse.revalidate(`/blog/${slug}`);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    // If there was an error, Next.js will continue to show the last successfully generated page
    return NextResponse.json(
      { message: 'Error revalidating', error: err },
      { status: 500 },
    );
  }
}
