import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { mutate } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';

const ProductList = () => {
  const router = useRouter();
  const getProducts = (pageIdx, previousPageData) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `https://dummyjson.com/products?limit=10&skip=${
      10 * pageIdx
    }&select=title,price`;
  };
  const {
    data: products,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite(getProducts, (url) =>
    fetch(url).then((res) => res.json()),
  );

  useEffect(() => {
    //Preload a Product with ID 1 and the correspondent page
    const url = 'https://dummyjson.com/products/1';
    mutate(
      url,
      fetch(url).then((res) => res.json()),
    );
    router.prefetch('/swr/prefetch/product/1');
  }, []);

  if (isValidating) return <>Loading...</>;

  return (
    <div>
      {products.map((product) => (
        <div>{JSON.stringify(product)}</div>
      ))}
      {/*
        Note that this is bad for SEO if you want it to be crawled.
        Reference:https://stackoverflow.com/questions/65086108/next-js-link-vs-router-push-vs-a-tag
       <button onClick={ () => router.push('/swr/prefetch/product/1')}>Go to Details Page</button> 
       */}
      {/* It's good for SEO. */}
      <Link href="/swr/prefetch/product/1">
        <a>Go to Details Page</a>
      </Link>
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
};

export default ProductList;
