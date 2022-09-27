import { GetServerSideProps } from 'next';
import { useState } from 'react';
import useSWR from 'swr';

interface SWRPostProp {
  id: number;
  content: string;
}

//const fetcher = (url, id) => fetch(`${url}/${id}`).then((res) => res.json());
const fetcher = (url, params) => {
  console.log('fetching...');
  return fetch(
    Object.keys(params).reduce((link, path) => `${link}/${params[path]}`, url),
  ).then((res) => res.json());
};

const SWRPost = ({ id, content }: SWRPostProp) => {
  //   const { data, error } = useSWR(
  //     ['https://jsonplaceholder.typicode.com/posts', id /*Primitive Data Case*/],
  //     fetcher,
  //   );
  const [counter, setCounter] = useState(0);
  const { data, error } = useSWR(
    [
      'https://jsonplaceholder.typicode.com/posts',
      //SWR deep compares data changes by default. If the data value isn’t changed, a re-render will not be triggered.
      { id },
    ],
    fetcher,
  );

  if (!data) return <div>{content}</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {JSON.stringify(data)}
      <button
        onClick={() => {
          setCounter((previous) => previous + 1);
        }}
      >
        Count {counter}
      </button>
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
