import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  updateTime: string;
}

interface HomeProps {
  post: Post;
}

const prerender_ssg = ({ post }: HomeProps) => {
  const router = useRouter();

  if (router.isFallback) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Last Update Time:{post.updateTime}</p>
    </div>
  );
};

export default prerender_ssg;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`);
  const post: Post = await res.json();
  return {
    props: {
      post: {
        ...post,
        updateTime: new Date().toLocaleString(),
      },
    },
  };
};
