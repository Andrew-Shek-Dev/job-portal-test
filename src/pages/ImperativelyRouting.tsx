import React from 'react';
import { useRouter } from 'next/router';

const ImperativelyRouting = () => {
  const posts = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const router = useRouter();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.id}>
          <button
            onClick={async () => {
              //Doing some await task
              setTimeout(() => {
                router.push(`/post/${p.id}`);
              }, 2000);
            }}
          >
            <a>Post Id:{p.id}</a>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ImperativelyRouting;
