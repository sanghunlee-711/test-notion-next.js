import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { getBlock, getDB, getPage } from '../../lib/notion';

const renderBlock = (block: any) => {
  switch (block.type) {
    case 'heading_1':
      // For a heading
      return <h1>{block['heading_1'].text[0].plain_text} </h1>;
    case 'image':
      // For an image
      return (
        <Image src={block['image'].external.url} width={650} height={400} />
      );
    case 'bulleted_list_item':
      // For an unordered list
      return (
        <ul>
          <li>{block['bulleted_list_item'].text[0].plain_text} </li>
        </ul>
      );
    case 'paragraph':
      // For a paragraph
      return <p>{block['paragraph'].rich_text[0]?.text?.content} </p>;
    default:
      // For an extra type
      return <p>Undefined type </p>;
  }
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

const Post: React.FC<GetStaticProps> = ({ id, post, blocks }) => {
  return (
    <div>
      <Head>
        <title>{id}</title>
      </Head>
      <div>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
        </nav>
      </div>
      {blocks.map((block, index) => {
        return renderBlock(block);
      })}
    </div>
  );
};

export default Post;

export const getStaticProps: GetStaticProps = async (ctx) => {
  let { id } = ctx.params as IParams;
  // Get the dynamic id
  let page_result = await getPage(id);
  // Fetch the post
  let { results } = await getBlock(id);
  // Get the children
  return {
    props: {
      id,
      post: page_result,
      blocks: results,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let { results } = await getDB();
  // Get all posts
  return {
    paths: results.map((post) => {
      // Go through every post
      return {
        params: {
          // set a params object with an id in it
          id: post.id,
        },
      };
    }),
    fallback: false,
  };
};
