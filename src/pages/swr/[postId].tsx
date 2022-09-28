import { GetServerSideProps } from 'next';
<<<<<<< HEAD
import { useState } from 'react';
import { useProduct } from 'src/shared/useProduct';
//import useSWR from 'swr';
=======
import Link from 'next/link';
import { useMemo, useState } from 'react';
import useSWR from 'swr/immutable';
>>>>>>> 1f3bd4cbfbe1d546cda3b23b831c4c0c9e36ba12

interface SWRPostProp {
  id: number;
  content: string;
}

//const fetcher = (url, id) => fetch(`${url}/${id}`).then((res) => res.json());
<<<<<<< HEAD
// const fetcher = (url, params) => {
//   console.log('fetching...');
//   return fetch(
//     Object.keys(params).reduce((link, path) => `${link}/${params[path]}`, url),
//   ).then((res) => res.json());
// };
=======
const fetcher = (url, params) => {
  console.log('[/id] fetching...');
  return fetch(
    Object.keys(params).reduce(
      (link, path) => `${link}/${params[path]}`,
      `https://jsonplaceholder.typicode.com${url}`,
    ),
  ).then((res) => res.json());
};
>>>>>>> 1f3bd4cbfbe1d546cda3b23b831c4c0c9e36ba12

const SWRPost = ({ id, content }: SWRPostProp) => {
  //   const { data, error } = useSWR(
  //     ['https://jsonplaceholder.typicode.com/posts', id /*Primitive Data Case*/],
  //     fetcher,
  //   );
  const [counter, setCounter] = useState(0);
<<<<<<< HEAD
  // const {  data, error/*, isValidating, mutate*/  } = useSWR(
  //   [
  //     'https://jsonplaceholder.typicode.com/posts',
  //     //SWR deep compares data changes by default. If the data value isn’t changed, a re-render will not be triggered.
  //     { id },
  //   ],
  //   fetcher,
  //   //{ initialData }
  // );
  const { data, error } = useProduct(1);
=======
  const params = useMemo(() => ({ id }), [id]);
  const { data, error } = useSWR(['/posts', params], fetcher);
>>>>>>> 1f3bd4cbfbe1d546cda3b23b831c4c0c9e36ba12

  if (!data) return <div>{content}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Content />
      <Content />
      <Content />
      <Content />
      <button
        onClick={() => {
          setCounter((previous) => previous + 1);
        }}
      >
        Count {counter}
      </button>
      <Link href="/swr/PostListCSRswr">
        <a>Back to Post List Page</a>
      </Link>
    </div>
  );
};

export default SWRPost;

export const getServerSideProps: GetServerSideProps<
  { id: number; content: string },
  { postId: string }
> = async ({ params }) => {
  return {
    props: {
      id: parseInt(params.postId),
      content: `Loading Post ID ${params.postId}....Wait!`,
    },
  };
};

function Content() {
  const { data, error } = useProduct(1);
  if (error) return <>Error!</>;
  return <div>{JSON.stringify(data)}</div>;
}
