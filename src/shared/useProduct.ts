import useSWR from 'swr';

const fetcher = (url, params) => {
  console.log('fetching...');
  return fetch(
    //Object.keys(params).reduce((link, path) => `${link}/${params[path]}`, url),
    `${url}/${params}`,
  ).then((res) => res.json());
};

export function useProduct(id: number | undefined) {
  //const params = useMemo(() => !id?({}):({ id }), [id]);
  const { data, error } = useSWR(
    ['https://jsonplaceholder.typicode.com/posts', id],
    fetcher,
  );
  return { data, error };
}
