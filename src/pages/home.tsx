import { GetServerSideProps } from 'next';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PageTitle } from '../styles/[postId].style';
import { Direction, sortByPrice } from 'src/shared/fake-data';
import { useRouter } from 'next/router';

const Home = () => {
  // return (
  //   <Container>
  //       <ImageWrapper>
  //       <Image
  //       objectFit="cover"
  //       src={imgSrc}/>
  //     </ImageWrapper>
  //     <Link href={`/post/${1}`} passHref>
  //       <ProductTitle>{"Test Link 1"}</ProductTitle>
  //     </Link>
  //   </Container>
  // )

  const [direction, setDirection] = useState<Direction>('ASC');
  const router = useRouter();

  const products = sortByPrice(direction);

  const handleSortingDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //setDirection(e.target.value as Direction);
    /*
    Shallow Routing (即是CSR🤦🏻‍♂️!):
    * 用於同一個 page 的路由 - 原理：改變 url 上的 query string
    * 不執行 getServerSideProps，getStaticProps 與 getInitialProps下，
    * 會保留 page 中的狀態
    */
    const dir = e.target.value;
    router.push(`${router.pathname}?direction=${dir}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    console.log('client side rendering...');
    if (router.query.direction) {
      setDirection(router.query.direction as Direction);
    }
  }, [router.query.direction]);

  return (
    <>
      <PageTitle>商品列表</PageTitle>
      <div>
        Price:
        <select value={direction} onChange={handleSortingDirectionChange}>
          <option value="ASC">價格由低到高</option>
          <option value="DES">價格由高到低</option>
        </select>
      </div>
      <div>{JSON.stringify(products)}</div>
    </>
  );
};

export default Home;

/*
issue: Why the server side props doesn't called because wrong
spelling of function name such as getServerProps(x), getServerSideProps(✔️)

Reference : https://stackoverflow.com/questions/73651855/getserversideprops-not-getting-called-for-nested-page-in-next-with-typescript
*/
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('Server Side Rendering...');
  try {
    return {
      props: {},
    };
  } catch {
    return undefined;
  }
};
