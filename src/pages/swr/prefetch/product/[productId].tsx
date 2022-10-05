import { useRouter } from 'next/router';
import React from 'react';
import useSWR from 'swr';

const ProductId = () => {
  const router = useRouter();
  const { data } = useSWR(
    `https://dummyjson.com/products/${router.query.productId}`,
    (url) => {
      console.log('prefetch');
      return fetch(url).then((res) => res.json());
    },
  );
  if (!data) return <>Loading...</>;
  return <div>{JSON.stringify(data)}</div>;
};

export default ProductId;
