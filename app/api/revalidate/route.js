import { BLOG_CACHE_TAGS, getPostById } from '@/lib/notion';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

const getSecret = () =>
  process.env.MY_SECRET_TOKEN || process.env.NOTION_REVALIDATE_SECRET;

function getSlugTag(slug) {
  return `${BLOG_CACHE_TAGS.detailPrefix}:${slug}`;
}

function toCleanString(value) {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function getNestedValue(source, path) {
  if (!source) {
    return undefined;
  }

  return path.split('.').reduce((acc, part) => {
    if (acc === undefined || acc === null) {
      return undefined;
    }

    if (/^\d+$/.test(part)) {
      const index = Number(part);
      return Array.isArray(acc) ? acc[index] : undefined;
    }

    return acc[part];
  }, source);
}

function normalizeSlug(rawValue) {
  const value = toCleanString(rawValue);
  if (!value) {
    return null;
  }

  let slug = value;

  if (/^https?:\/\//i.test(slug)) {
    try {
      const url = new URL(slug);
      slug = url.pathname;
    } catch {
      return null;
    }
  }

  slug = slug.replace(/^\/+|\/+$/g, '');
  if (slug.toLowerCase().startsWith('blog/')) {
    slug = slug.slice(5);
  }

  slug = slug.trim();
  return slug || null;
}

function extractSecret({ request, searchParams, body }) {
  const fromQuery = toCleanString(searchParams.get('secret'));
  const fromBody =
    toCleanString(body?.secret) ||
    toCleanString(body?.token) ||
    toCleanString(body?.apiKey);
  const fromHeader =
    toCleanString(request.headers.get('x-revalidate-secret')) ||
    toCleanString(request.headers.get('authorization'))?.replace(/^Bearer\s+/i, '');

  return fromQuery || fromBody || fromHeader || null;
}

function extractPageId(body) {
  const pageIdPaths = [
    'page_id',
    'pageId',
    'id',
    'entity.id',
    'data.id',
    'data.page_id',
    'data.pageId',
    'page.id',
    'payload.page_id',
    'payload.pageId',
    'notion.page_id',
  ];

  for (const path of pageIdPaths) {
    const candidate = toCleanString(getNestedValue(body, path));
    if (candidate) {
      return candidate;
    }
  }

  return null;
}

function extractSlugFromBody(body) {
  const slugPaths = [
    'slug',
    'route',
    'path',
    'url',
    'post.slug',
    'post.route',
    'entry.slug',
    'entry.route',
    'data.slug',
    'data.route',
    'data.url',
    'data.path',
    'page.slug',
    'page.route',
    'payload.slug',
    'payload.route',
    'payload.path',
    'payload.url',
    'properties.route.rich_text.0.plain_text',
    'properties.route.title.0.plain_text',
    'data.properties.route.rich_text.0.plain_text',
    'data.properties.route.title.0.plain_text',
    'data.properties.slug.rich_text.0.plain_text',
    'data.properties.slug.title.0.plain_text',
  ];

  for (const path of slugPaths) {
    const raw = getNestedValue(body, path);
    const slug = normalizeSlug(raw);
    if (slug) {
      return slug;
    }
  }

  return null;
}

function normalizePayload(searchParams) {
  const slugFromQuery = normalizeSlug(searchParams.get('slug'));
  return {
    secret: toCleanString(searchParams.get('secret')),
    slug: slugFromQuery || null,
    revalidateAll: searchParams.get('all') === 'true',
  };
}

async function revalidateBlog({ slug, revalidateAll }) {
  revalidateTag(BLOG_CACHE_TAGS.list);
  revalidatePath('/blog');

  if (revalidateAll) {
    revalidatePath('/blog', 'layout');
    return {
      revalidated: true,
      mode: 'all',
    };
  }

  if (!slug) {
    return {
      revalidated: true,
      mode: 'list',
    };
  }

  revalidateTag(getSlugTag(slug));
  revalidatePath(`/blog/${slug}`);

  return {
    revalidated: true,
    mode: 'single',
    slug,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const { secret, slug, revalidateAll } = normalizePayload(searchParams);

  if (!getSecret() || secret !== getSecret()) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const result = await revalidateBlog({ slug, revalidateAll });
    return NextResponse.json({ ...result, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err?.message || 'unknown error' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  let body = {};

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const secret = extractSecret({ request, searchParams, body });
  let slug = normalizeSlug(searchParams.get('slug')) || extractSlugFromBody(body);
  const pageId = extractPageId(body);
  const revalidateAll =
    searchParams.get('all') === 'true' || body?.all === true || body?.revalidateAll === true;

  if (!getSecret() || secret !== getSecret()) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  if (!slug && pageId) {
    const post = await getPostById(pageId);
    slug = post?.slug || null;
  }

  try {
    const result = await revalidateBlog({ slug, revalidateAll });
    return NextResponse.json({ ...result, pageId: pageId || null, now: Date.now() });
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: err?.message || 'unknown error' },
      { status: 500 },
    );
  }
}
