import { Client } from '@notionhq/client';
const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});
export const getPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({
    page_id: pageId,
  });
  return response;
};

export const getBlock = async (id: string) => {
  const myBlocks = await notion.blocks.children.list({
    block_id: id,
  });
  return myBlocks;
};

export const getDB = async () => {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
  });
  console.log('@@@@@', myPosts);
  return myPosts;
};
