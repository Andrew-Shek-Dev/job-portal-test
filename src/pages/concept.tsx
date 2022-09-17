import { Suspense, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

interface ConceptProps {
  data: number[];
}

const concept = ({ data }: ConceptProps) => {
  const [_data, setData] = useState(null)
    useEffect(() => {
      if (data) {
        setData(data)
      } else {
        // fetch client side and setData
      }
    });
    return (
      <>
        {_data === null && <>Loading...</>}
        {_data && <>{_data}</>}
      </>
    );
};

export default concept;

const timeout = ()=>new Promise((resolve) => { setTimeout(() => { resolve([4,5,6]); }, 10000); })

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await timeout();
  return {
    props: {
      data
    },
  };
};
