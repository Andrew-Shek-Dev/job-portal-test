import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
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

const PostList = ({ posts }: PostsProps) => {
  const [loading, setLoading] = useState(false);
  const [postsCache, setPostsCache] = useState<PostData[]>([...posts]);

  useEffect(() => {
    const cache = localStorage.getItem('posts');
    if (!cache) {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((_posts: any) => {
          const newPosts = [
            ...postsCache,
            ..._posts.slice(1).map((post) => ({ post, comments: [] })),
          ];
          setPostsCache(newPosts);
          localStorage.setItem('posts', JSON.stringify(newPosts));
          setLoading(false);
        });
    } else {
      setPostsCache(JSON.parse(localStorage.getItem('posts')));
    }
  }, []);

  return (
    <div>
      {loading ? <PostContainer>Loading...</PostContainer> : <></>}
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
