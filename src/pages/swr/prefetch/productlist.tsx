import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';
import { mutate } from 'swr';
import { useRouter } from 'next/router';

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
  } = useSWRInfinite(
    getProducts,
    (url) => fetch(url).then((res) => res.json()),
    {
      initialSize: 2,
    },
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
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
};

export default ProductList;
