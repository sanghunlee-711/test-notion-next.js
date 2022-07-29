import type { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { getDB } from '../lib/notion';
import styles from '../styles/Home.module.css';
const Home: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Latest posts</h1>
      {props.posts.map((result, index) => {
        console.log(result);
        return (
          <div className={styles.cardHolder} key={index}>
            <Link href={`/posts/${result.id}`}>
              <span>{result.id}</span>
              {/* <Image
                src={result.cover.external.url}
                width={300}
                height={200}
                alt="img"
              /> */}
            </Link>
            <div className={styles.cardContent}>
              <Link href={`/posts/${result.id}`}>Where is Title Key..</Link>
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default Home;

export async function getServerSideProps() {
  // Get the posts
  let { results } = await getDB();
  // Return the result
  return {
    props: {
      posts: results,
    },
  };
}
