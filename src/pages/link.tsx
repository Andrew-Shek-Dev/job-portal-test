import Link from 'next/link';

const link = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Switch to pages/index.tsx</a>
        </Link>
      </li>
      <li>
        <Link href="/csr">
          <a>Switch to pages/csr.tsx</a>
        </Link>
      </li>
      <li>
        <Link href="/ssr">
          <a>Switch to pages/ssr.tsx</a>
        </Link>
      </li>
      <li>
        <Link href="/ssg">
          <a>Switch to pages/ssg.tsx</a>
        </Link>
      </li>
      <li>
        <Link href={`/post/${'1'}`}>
          <a>Switch to pages/post/1</a>
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: '/post/[postId]',
            query: { postId: 1234 },
          }}
        >
          Dynamic Link
        </Link>
      </li>
    </ul>
  );
};

export default link;
