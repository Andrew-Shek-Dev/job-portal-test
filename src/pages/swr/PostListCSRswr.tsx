import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  PostBody,
  PostContainer,
  PostFooter,
  PostTitle,
} from '../../styles/postList.style';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostData = {
  post: Post;
  comments: Comment[];
};
const posts: PostData[] = [];

type PostsProps = {
  posts: PostData[];
};

const fetcher = (url) => {
  console.log('[PostListCSRswr] fetching....');
  return fetch(`https://jsonplaceholder.typicode.com${url}`).then((r) =>
    r.json(),
  );
};
const PostList = ({ posts }: PostsProps) => {
  const {
    data /* Return value of fetcher - data is undefined if data is not ready*/,
    error /* Error thrown from fetcher */,
  } = useSWR(
    /*key*/ () =>
      /*value/callback*/
      //posts.length == 1
      /*?*/ '/posts',
    //: null /*, or, undefined(throw error) - No Calling API - Lazy Loading, e.g., Read More Product*/,
    /*fetch function,取得資料的函式, e.g., ()=>axios/fetch */ fetcher,
  );
  const [postsCache, setPostsCache] = useState<PostData[]>([...posts]);

  useEffect(() => {
    if (data) {
      const newPosts = [
        ...postsCache,
        ...data.slice(1).map((post) => ({ post, comments: [] })),
      ];
      setPostsCache(newPosts);
    }
  }, [data]);

  if (error) return <div>Fail to load</div>;
  if (!data) return <PostContainer>Loading...</PostContainer>;

  return (
    <div>
      {postsCache.map(({ post, comments }) => (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <PostFooter>Posted by {post.userId} ?? minutes ago</PostFooter>
          <div>comments</div>
          <div>
            {comments.map((comment) => (
              <div>
                [Posted by {comment.name}] {comment.body}
              </div>
            ))}
          </div>
          <Link href={`/swr/${post.id}`}>
            <a>Details</a>
          </Link>
        </PostContainer>
      ))}
    </div>
  );
};

export default PostList;

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const post = await getData('https://jsonplaceholder.typicode.com/posts/1');
  const comments = await getData(
    'https://jsonplaceholder.typicode.com/post/1/comments',
  );

  posts.push({
    post,
    comments: comments.filter((comment: Comment) => comment.postId == post.id),
  });

  return {
    props: {
      posts,
    },
  };
};
