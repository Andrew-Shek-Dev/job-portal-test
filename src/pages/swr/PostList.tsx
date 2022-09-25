import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
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
  comments: Comment;
};
const posts: PostData[] = [];

type PostsProps = {
  posts: PostData[];
};

const PostList = ({ posts }: PostsProps) => {
  return (
    <div>
      {posts.map(({ post, comments }) => (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <PostFooter>Post by {post.userId} ?? minutes ago</PostFooter>
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
  const postsData = await getData('https://jsonplaceholder.typicode.com/posts');
  const comments = await getData(
    'https://jsonplaceholder.typicode.com/comments',
  );

  posts.push(
    ...postsData.map((post: Post) => ({
      post,
      comments: comments.filter(
        (comment: Comment) => comment.postId == post.id,
      ),
    })),
  );

  return {
    props: {
      posts,
    },
  };
};
