import { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';

interface ConceptProps {
  data: number[];
}

//Second Step : HTML Page Ready and download the js file
const Concept = ({ data }: ConceptProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Third Step : Reload the page on Client Side after data fetching
    setTimeout(() => {
      setLoading(false);
    }, 20000);
  }, [loading]);

  //Server Side Version First
  if (loading) {
    return <>{data}</>;
  }

  return (
    <>
      <div>{data}</div>
      <div>Client Side Rendering Time : {Date.now()}</div>
    </>
  );
};

export default Concept;

//First Step : Create the page first on Server Side
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      data: `Server Side Rendering time ${Date.now()}`,
    },
  };
};
