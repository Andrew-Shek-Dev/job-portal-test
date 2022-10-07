import useSWRInfinite from 'swr/infinite';
import { SWRConfig } from 'swr';
import { GetStaticProps } from 'next';

const ProductList = ({ fallback }) => {
  const getProducts = (pageIdx, previousPageData) => {
    if (previousPageData && previousPageData.length === 0) return null;
    return `https://dummyjson.com/products?limit=10&skip=${
      10 * pageIdx
    }&select=title,price`;
  };

  interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }

  interface Error {
    msg: string;
  }

  const {
    data: products,
    isValidating,
    size,
    setSize,
  } = useSWRInfinite<Product, Error>(getProducts, (url) =>
    fetch(url).then((res) => res.json()),
  );

  if (isValidating) return <>Loading...</>;

  return (
    <SWRConfig value={{ fallback }}>
      <div>
        {products.map((product) => (
          <div>{JSON.stringify(product)}</div>
        ))}
        <button onClick={() => setSize(size + 1)}>Load More</button>
      </div>
    </SWRConfig>
  );
};

export default ProductList;

export const getStaticProps: GetStaticProps = async () => {
  const url = `https://dummyjson.com/products?limit=10&skip=0&select=title,price`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: {
      fallback: {
        [url]: data,
      },
    },
  };
};
