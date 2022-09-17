import Link from 'next/link';
import { useRouter } from 'next/router';
import { getProductById } from 'src/shared/fake-data';
import {
  BackLink,
  PageTitle,
  ProductContainer,
} from '../../styles/[postId].style';

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
  const { postId } = router.query;

  if (!postId) return <></>;

  //NOTE: Why don't use useEffect here?
  //Answer: We use SSR now! Not CSR!
  const product = getProductById(postId as string);

  return (
    <>
      <PageTitle>商品詳細頁面</PageTitle>
      <BackLink>
        <Link href="/products">回產品列表</Link>
      </BackLink>
      <ProductContainer>{JSON.stringify(product)}</ProductContainer>
    </>
  );
};

export default post;
