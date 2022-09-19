import { GetStaticProps, GetStaticPaths } from 'next';
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
      <div>SSG and Dynamic Route Demo</div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Last Update Time:{post.updateTime}</p>
    </div>
  );
};

export default prerender_ssg;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // { params: { year: '2021', month: '7', day: '24' } }, nested routes
    // { params: { date: ['2021', '7', '24'] } }, catch all routes
    // optional catch all rotues ??
    fallback: 'blocking',
    //if false: go to 404 page - suitable static content web site
    //if true: if not found, the page will be generated immediately before return it.In the meantime, router.isFallback is used showing progress. Otherwise, the built html will be returned.
    //if "blocking",  if not found, the page will be generated immediately before return it.In the meantime, but no router.isFallback. Otherwise, the built html will be returned.
  };
};
