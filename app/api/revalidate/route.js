import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

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
    // ✅ Correct revalidation method for App Router
    revalidatePath(`/blog/${slug}`);

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err.message },
      { status: 500 },
    );
  }
}
