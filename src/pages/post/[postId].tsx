import Link from 'next/link';
import { useRouter } from 'next/router';

const post = () => {
  //   const router = useRouter();
  //   const {postId} = router.query;
  //   const posts = [{id:1},{id:2},{id:3}]
  // return (
  //   // <div>Post Id : {postId}</div>
  //   <ul>
  //       {posts.map(postItem=>(<li key={postItem.id}>
  //           <Link href={`/post/${postItem.id}`}>
  //               <a>Post Id: {postItem.id}</a>
  //               {/*OR {`Post Id: ${postItem.id}`} */}
  //           </Link>
  //       </li>))}
  //   </ul>
  // )

  const router = useRouter();
  const {postId} = router.query;

  if (!postId) return <></>;

  const product = getProductById(postId as string);
}

export default post;