import { NextResponse } from 'next/server';

export async function GET() {
  const notionApiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  const allPages = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const databaseRes = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(startCursor ? { start_cursor: startCursor } : {}),
      },
    );

    const data = await databaseRes.json();

    if (!data?.results) break;

    allPages.push(...data.results);
    hasMore = data.has_more;
    startCursor = data.next_cursor;
  }

  const blogs = await Promise.all(
    allPages.map(async (page) => {
      const { id, properties } = page;

      const blocksRes = await fetch(
        `https://api.notion.com/v1/blocks/${id}/children`,
        {
          headers: {
            Authorization: `Bearer ${notionApiKey}`,
            'Notion-Version': '2022-06-28',
          },
        },
      );
      const blocksData = await blocksRes.json();

      const contentHtml = blocksData.results
        .map((block) => {
          if (block.type === 'paragraph') {
            return `<p>${block.paragraph.rich_text
              .map((text) => text.plain_text)
              .join(' ')}</p>`;
          } else if (block.type === 'heading_1') {
            return `<h1>${block.heading_1.rich_text
              .map((text) => text.plain_text)
              .join(' ')}</h1>`;
          } else if (block.type === 'heading_2') {
            return `<h2>${block.heading_2.rich_text
              .map((text) => text.plain_text)
              .join(' ')}</h2>`;
          } else if (block.type === 'image') {
            const imageUrl =
              block.image.file?.url || block.image.external?.url;
            return `<img src="${imageUrl}" alt="" />`;
          }

          return '';
        })
        .join('');

      return {
        id,
        slug: properties?.Slug?.rich_text[0]?.plain_text || id,
        title: properties?.title?.title[0]?.plain_text || 'Untitled',
        categories:
          properties?.categories?.multi_select.map((cat) => cat.name) || [],
        thumbnail:
          properties?.thumbnail?.files[0]?.file?.url ||
          properties?.thumbnail?.files[0]?.external?.url ||
          '/default.png',
        publishedDate: properties?.published?.date?.start,
        lastEdited: page.last_edited_time,
        summary: properties?.summary?.rich_text[0]?.plain_text || '',
        route: `/blogs/${properties?.slug?.rich_text[0]?.plain_text || id}`,
        content: contentHtml,
      };
    }),
  );

  return NextResponse.json(blogs);
}
