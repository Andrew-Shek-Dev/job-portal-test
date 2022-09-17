import { GetServerSideProps } from 'next';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface HomeProps {
  post: Post;
}

const ssr = ({ post }: HomeProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default ssr;
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post: Post = await res.json();
  return {
    props: {
      post,
    },
  };
};
