import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });
export async function getBlogPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  return response.results.map((page) => ({
    id: page.id,
    title: page.properties['Title'].title[0].text.content,
    date: page.properties['Date'].date.start,
    tags: page.properties['Tags'].multi_select.map((tag) => tag.name),
    content: page.properties['Content'].rich_text[0].text.content,
  }));
}
export async function getBlogPostById(id) {
  const response = await notion.pages.retrieve({ page_id: id });
  return {
    id: response.id,
    title: response.properties['Title'].title[0].text.content,
    date: response.properties['Date'].date.start,
    tags: response.properties['Tags'].multi_select.map((tag) => tag.name),
    content: response.properties['Content'].rich_text[0].text.content,
  };
}
