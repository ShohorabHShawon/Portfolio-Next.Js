import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

const mapPageToPost = (page) => {
  const props = page.properties;
  return {
    id: page.id,
    title: props.title?.title?.[0]?.plain_text || 'Untitled',
    slug: props.route?.rich_text?.[0]?.plain_text || '',
    summary:
      props.summary?.rich_text?.map((text) => text.plain_text).join('') ||
      '',
    date: props.publishedDate?.date?.start || '',
    lastEdited: page.last_edited_time,
    author: props.authorName?.rich_text?.[0]?.plain_text || 'Unknown',
    thumbnail:
      props.thumbnail?.files?.[0]?.external?.url ||
      props.thumbnail?.files?.[0]?.file?.url ||
      '',
    categories: props.categories?.multi_select?.map((c) => c.name) || [],
  };
};

export async function getAllPosts() {
  try {
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set in environment variables');
    }

    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'publishedDate',
          direction: 'descending',
        },
      ],
    });

    return res.results.map(mapPageToPost);
  } catch (error) {
    console.error('Error fetching posts from Notion:', error.message);
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

export async function getPostBySlug(slug) {
  try {
    if (!databaseId) {
      throw new Error('NOTION_DATABASE_ID is not set in environment variables');
    }

    const res = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: 'status',
            select: {
              equals: 'Published',
            },
          },
          {
            property: 'route',
            rich_text: {
              equals: slug,
            },
          },
        ],
      },
      page_size: 1,
    });

    if (res.results.length === 0) {
      return null;
    }

    return mapPageToPost(res.results[0]);
  } catch (error) {
    console.error(`Error fetching post by slug "${slug}":`, error.message);
    throw new Error(
      `Failed to fetch post with slug "${slug}": ${error.message}`,
    );
  }
}