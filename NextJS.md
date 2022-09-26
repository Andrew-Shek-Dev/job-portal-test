# Next.js Lecture Note
## Introduction
TBA

## Why we need Next.js?
* Handling SSR/Pre-Rendering Processing
* Handling SSR/SSG
* Optimizing Image Files
* Full Stack Framework => Frontend (React) + Backend/API (API routes)
* Big Community Support
* TikTok、Netflix、GitHub、Uber、Twitch has used Next.js

### Handling SSR/Pre-Rendering Processing
現在 SPA (Single Page Application) 盛行的時代，許多網站在沒有框架或後端支援的情況下，僅僅使用像是 React 或 Vue 等前端框架，要做到 SSR 或 pre-rendering 還需要做許多設定，做這些技術研究都得花費時間成本與心思，最後才能導入到專案中。

所以 Next.js 的出現能夠解決工程師心中的痛，不必再花費很多時間處理 pre-rendering 或 SSR 的問題，而是利用框架的優勢，讓工程師更專注在開發核心功能上面。

### Handling Server Side Rendering (SSR)/Static Side Generation (SSG)
Next.js 是一個基於 React 的框架，它同時支援 SSR (Server Side Rendering) 與 SSG (Static Side Generation) 兩種方法，不需要很多的設定就可以讓網站同時有這兩種功能。

Next.js 在設計上可以混用兩種方法，像是 /page-a 希望能夠 SSR，因為網站內容很常改變，需要 API 支援變動頻繁的資料；而 /page-b 則是使用 SSG 則是可以用在內容較不常改變的頁面，例如 Landing Page 或部落格等

### Optimizing Image Files
SEO => content => core web vitals mark => speed and newer image format such as WEBP(< 45% of PNG file size )=>webpack/gulp + plugin => complex setup/maintenance => Next.js simplify the processing (depend on browser supported format)

## File Structure
* pages - store all of pages (file-based routing)
* next.config.js - application-specific settings such as .env variables,base path, header, webpack config,etc...
* next-env.d.ts - import all types used in Next.js (let Next.js support *.module.css without config under typescript). 
* .eslintrc - control quality of source code

## Concept Section : CSR (Client Side Rendering) - React
第一次跟伺服器請求的 HTML 檔裡面幾乎不包含任何的內容，伺服器並沒有傳入資料到 HTML。接著，後續會再透過載入的 bundle，也就是 JS 的檔案，再讓 JS 執行 AJAX 跟伺服器請求資料，最後將資料渲染到畫面上（JS會塞入資料到 <div> 的節點中。）。

Pros
* Bundle 在一開始就載入進來，後續渲染畫面就不用不斷地跟伺服器端交互，體感上會比 SSR 快，而且在切換頁面的使用者體驗也會更好。
* 對於伺服器來說，也會有較小的負擔。
Cons
* Bundle 需要包含呼叫 API 的程式碼，一般來說整體會檔案大小會比較大一點，因此載入的時間就會稍微長一些。在載入完之後，也需要呼叫 API 也是一段時間成本。
* 資料都是在瀏覽器端由 AJAX 發送請求跟伺服器端拿資料，如此一來 google 的爬蟲就沒辦法拿到資料，對於有礙於 SEO。

## Concept Section : SSR (Server Side Rendering) - PHP vs Next.js
PHP: 透過伺服器端處理任何的資料，然後再直接編譯成 HTML 檔案，最後使用者看到的就是完整包含資料的 HTML。缺點是在切換頁面時，瀏覽器的畫面很明顯地閃爍，大家應該都有經驗，在這種情況下瀏覽網站的使用者體驗 (UX) 不是很好。

SPA頁面不必再因為畫面不斷閃爍, 但因為資料都是在瀏覽器端由 AJAX 發送請求跟伺服器端拿資料，如此一來 google 的爬蟲就沒辦法拿到資料，對於有礙於 SEO。

SSR can resolve this issue, but SSR and SPA need working together nowadays. HTML content with dynamic data send to the client such as browser, so google 爬蟲也就可以順利地爬到網站中的內容。

Pros
* SEO-friendly
* 網頁的資料(HTML)都是動態的，而且使用者在看到瀏覽網頁時還不用等待 API 回來後，再透過 JS 渲染資料到畫面上，大部分的時候這種方式的使用者體驗更好。

Cons
* 伺服器一直處理使用者的請求，一直產生有資料的 HTML，並送到瀏覽器端，這樣的工作對於伺服器來說是一個負擔。如果是blog case，就會唔太適合。因為Blog不會每分每秒都在改變，浪費資源處理並產生有資料的HTML - SSG幫到你！

## Concept Section : SSG (Static Side Generation) - Next.js
SSG 意味著所有的內容都在 bulid 的時候都打包進入檔案中，所以使用者在瀏覽網站時，就可以拿到完整的 HTML 檔案。優點除了可以有利於 SEO 之外，還有因為每次使用者拿到的 HTML 內容都不會變，所以還可以讓 HTML 被 cache 在 CDN 上，很適合用在資料變動較小的網站中，像是Blog、產品介紹頁這種應用中。

## Concept Section : Factors on selection of CSR,SSR and SSG
* SEO (CSR 實際上可以參與 SEO，但是不利於內容變動快速的網站)
* 更快地載入頁面內容 ?
    1. Speed : SSG < SSR < CSR
    2. client-side hardware and software performance
    3. SSG vs SSR => 內容是靜態?變動很頻繁?
    4. 頁面中的有些內容其實不必參與 SEO 的過程，SSR 只需把「對使用者有價值的資料」渲染完畢，把剩下的部分交由 CSR 處理，使用者可以更快地看到內容, 有利於「First Contentful Paint」的SEO評分。

## Next.js與CSR,SSR and SSG
* getInitialProps : 主要功能為在載入頁面之前，異步的去抓取需要的資料，並將資料變為該 Page Component 的 props，它的執行順序會在所有 react component lifecycle 之前。初次載入頁面的時候 getInitialProps 會在 server side 執行，當使用 Next/Link | Next/Router 進行跳轉時，它則會在 client side 執行，而如果跳轉頁面不是使用上面的方式，getInitialProps 都是會在 server-side 執行喔！如果是 CSR 的 React 架構，往往是在 useEffect 去執行 API call，但在 Next.js 架構中，許多 API call 會被拉到 getInitialProps 執行。

* getStaticProps (SSG)： 在 build 的時候抓取資料
* getStaticPaths (SSG)： dynamic routes?
* getServerSideProps (SSR)：在使用者進入網頁時，每一次發送請求伺服器都會抓取資料
* react-router-dom (CSR): useEffect,useState,etc....

## File-based routing
* basic unit: page equivalent to react component
* file name = router(path) name
* static route, dynamic route, catch all route

### Static Routes
這是最基本定義 page 的方式。你的資料夾層級如何，url必如何。無需再自定義路由，just like react。
pages/index.tsx => "/"
pages/post.tsx => page/post/index.tsx => "/post"

```
如果是 component 是一個 page，則它必須用 default export 而不是 named export 。
```

### Dynamic Routes
動態的 url such as `/post/<post-id>`。
 `/post/<post-id>` => `/pages/post/[postId].tsx`

是Page中如何取得postId？
```tsx
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query; //<-- 1

  return <p>Post: {postId}</p>;
};

export default Post;
```

How about `/post/123?hello=world`?
```tsx
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { postId, hello} = router.query; //<--

  return <p>Post: {hello} {postId}</p>;
};

export default Post;
```

How about `/post/123?postId=abc`?
```tsx
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { postId } = router.query; //<--123 (override value)

  return <p>Post: {postId}</p>;
};

export default Post;
```

`/pages/post/<postId>/<commentId>.tsx` => `pages/post/[postId]/[commentId].tsx`

### catch all routes
一篇 post 的設 url 會設計成這個樣子 /pages/post/<year>/<month>/<day> ，接下來讀者可能會頭痛了，難道要定義多層級的資料夾嗎？而且最後可能還只有一個 /pages/.../day.tsx ，這樣感覺挺麻煩的。

使用官方稱作為「catch all routes」的定義方式，一次拿到所有層級的參數。

`/post/2021/12/31` =>`/pages/[...date].tsx` => 無限地加上新的參數 => 陣列被儲存在 router.query

```json
{
  date: [2021, 12, 31];
}
```


```
！注意！
在使用 router.query 時要注意「第一次 render 時拿不到值」的問題，因為 Next.js 有 Automatic Static Optimization 的機制，在第一個階段 (第一次渲染) 會先執行 pre-rendering 產生靜態的 HTML，這時候 router.query 會是空的 {} ，在第二個階段 (第二次渲染) 時才能夠從 router.query 中拿到值。

解決方法：做if condition checking
```

### 使用Routes：Link Component
```tsx
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
            <Link href={`/post/${"1"}`}>
            <a>Switch to pages/post/1</a>
            </Link>
        </li>
        <li>
            <Link
              href={{
                pathname:"/post/[postId]",
                query:{postId:1234}
              }}
            >Dynamic Link</Link>
        </li>
    </ul>
  )
}

export default link
```

To use the link under a component:
```tsx
import Link from 'next/link';
import { useRouter } from 'next/router';

const post = () => {
    const router = useRouter();
    const {postId} = router.query;
    const posts = [{id:1},{id:2},{id:3}]
  return (
    // <div>Post Id : {postId}</div>
    <ul>
        {posts.map(postItem=>(<li key={postItem.id}>
            <Link href={`/post/${postItem.id}`}>
                <a>Post Id: {postItem.id}</a>
                {/*OR {`Post Id: ${postItem.id}`} */}
            </Link>
        </li>))}
    </ul>
  )
}

export default post;
```

### Bonus: Imperatively routing
To delay the routing because of extra processing required such as google analytics, following code can be done:

```tsx
import React from 'react'
import { useRouter } from 'next/router'

const ImperativelyRouting = () => {
    const posts = [{id:1},{id:2},{id:3}];
    const router = useRouter();
  return (
    <ul>
        {posts.map(p=>(<li key={p.id}>
            <button onClick={async()=>{
                //Doing some await task
                setTimeout(()=>{
                    router.push(`/post/${p.id}`)
                },2000);
            }}>
                <a>Post Id:{p.id}</a>
            </button>
        </li>))}
    </ul>
  )
}

export default ImperativelyRouting
```

### Bonus: Shallow Routing
Shallow routing 是一種用於同一個 page 的路由，你能夠改變 url 上的 query string，但是不執行 getServerSideProps 、 getStaticProps 與 getInitialProps 裡面的程式，此外還會保留 page 中的狀態。

Note:
只能在同一個 url 上切換!

Example:
```tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const ShallowRouting = () => {
    const router = useRouter();
    const [counter,setCounter] = useState<number[]>([]);

    useEffect(()=>{
        if(router.query.counter){
            setCounter(previous=>[...previous,parseInt(router.query.counter as string)]);
        }
    },[router.query.counter]);
  return (
    <>
    <ul>
        {counter.map(c=>(<li key={c}>{c}</li>))}
    </ul>
    <button onClick={()=>{
        router.push(`/ShallowRouting?counter=${Math.floor(Math.random()*100)}`,undefined,{shallow:true});
    }}>Add Counter</button>
    </>
  )
}

export default ShallowRouting
```

## Next.js與CSS(Styled Components)
### Installation
```
yarn add styled-components
yarn add -D @types/styled-components
```

### Apply on Component
```tsx
import styled from 'styled-components'; //<--
import { GetServerSideProps } from 'next';//<--error because of it

const Container = styled.div`
    text-align:center
`//<--

const home = () => {
  return (
    <Container>home</Container> {/*//<--*/}
  )
}

export default home

export const getServerProps:GetServerSideProps = async()=>{
    return {
        props:{}
    }
}//<--error because of it
```

The error will be shown below because of inconsistences `className` of server side(SSR and SSG) and client side(React).

```json
next-dev.js?3515:20 Warning: Prop `className` did not match. Server: "sc-jSMfEi eEVBBD" Client: "sc-bczRLJ cPhGO"
    at div
    at O (webpack-internal:///./node_modules/styled-components/dist/styled-components.browser.esm.js:31:19811)
    at home
    at App (webpack-internal:///./node_modules/next/dist/pages/_app.js:64:9)
    at ErrorBoundary (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:8:20740)
    at ReactDevOverlay (webpack-internal:///./node_modules/next/dist/compiled/@next/react-dev-overlay/dist/client.js:8:23632)
    at Container (webpack-internal:///./node_modules/next/dist/client/index.js:71:9)
    at AppContainer (webpack-internal:///./node_modules/next/dist/client/index.js:592:26)
    at Root (webpack-internal:///./node_modules/next/dist/client/index.js:703:27) 
```

The error can be resolved following:
```bash
yarn add -D babel-plugin-styled-components
```

## Optimized Image in WEBP format
First, next.config.js is modified as following:
```json
module.exports = {
    //...,
    images:{
        domains:[<image url>]
    }
}
```

Second, avoid reflowing image ,the css file should be added as following:
```ts
export const ImageWrapper = styled.div`
  width: 120px;
  height: 167px;
  position: relative;
`
```

Third, using Image Component in "next/image" as following:
```tsx
import { GetServerSideProps } from 'next';
import {Container,ImageWrapper} from '../styles/home.style';
import Image from 'next/image';

const home = () => {
  return (
    <Container>
      <ImageWrapper>
       <Link href={`/product/${id}`} passHref>
        <Image 
        layout="fill" 
        objectFit="cover"
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"/>
      </ImageWrapper>
      
      <Link href={`/post/${1}`}>
        
      </Link>
    </Container>
  )
}

export default home

export const getServerSideProps:GetServerSideProps = async()=>{
    return {
        props:{}
    }
}
```

Oops! You will find the following error and the image cannot be resized when the page is updated.
```json
warn  - Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/basic-features/fast-refresh#how-it-works
Error: Aborted because ./src/pages/Home.tsx is not accepted
Update propagation: ./src/pages/Home.tsx -> ./node_modules/next/dist/build/webpack/loaders/next-client-pages-loader.js?absolutePagePath=%2FUsers%2Fandrew.tecky%2FDocuments%2FVSCode%2Faws-nestjs-nextjs-job-portal%2Fsrc%2Fpages%2FHome.tsx&page=%2FHome!
    at applyHandler (http://localhost:3000/_next/static/chunks/webpack.js?ts=1662950425046:881:31)
    at http://localhost:3000/_next/static/chunks/webpack.js?ts=1662950425046:564:21
    at Array.map (<anonymous>)
``` 

This is because CSS updating fail on server side(styled-component), that is make sense. Next.js has already ported the styled-component feature now, so we can resolve it by adding following field under next.config.js.

```json
module.exports = {
    env:{
        BACKEND_URL:'http:///localhost:3000'
    },
    images:{
        domains:['fakestoreapi.com']
    },
    compiler: {
        styledComponents: true, //<-this one
    }
}
```

If you use older version of Next.js, you would add the `_document.tsx` under `pages` folder and add following code which generate the CSS on server side.
```ts
import Document from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}
```

When building the apps will show following error:
```
Error: Build optimization failed: found page without a React Component as default export in 
<path>
```

Please move the *.style.ts outside the ./src/pages folder

Reference:
https://stackoverflow.com/questions/65598753/cant-build-react-next-project-found-page-without-a-react-component-as-default/65598867

https://dev.to/daaahailey/errors-i-dealt-with-in-nextjs-styled-components-pages-types-1jc6

## Next.js Main Feature: Pre-Rendering
### Server Side Rendering

### Static Side Generation
To generating the HTML page at building stage, which include fetching data through API. The data will embedded in the built HTML which is sent to client directly when user request it.
Next.js will through `getStaticProps` function complete the action above. Let me showing this in below example:

```tsx
import { GetStaticProps } from 'next';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  updateTime: string;
}

interface HomeProps {
  post: Post;
}

const prerender_ssg = ({ post }: HomeProps) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Last Update Time:{post.updateTime}</p>
    </div>
  );
};

export default prerender_ssg;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const post: Post = await res.json();
  return {
    props: {
      post: {
        ...post,
        updateTime: new Date().toLocaleString(),
      },
    },
  };
};

```

To show the effect, please build the source code first
```
npx next build
```
And run the build version by following command
```
npx next start
```

You will find that the `Last Update Time` will remain unchanged even refreshing page serval time. This show all you guy the data is embedded in the build stage, so it will not modified in refreshing page because client just get built version when refreshing page.

### Dynamic Routes - GetStaticPaths
* What is Dynamic Routes?
The dynamic route<sup>*</sup> is the route name(page name/url name) which depend on data in params/query in URL such as `/post/1` and `/post/2`, which are represented `/posts/[id].tsx` in Next.js project. In SSR case, these dynamic routes pages can be generated in runtime, but how about SSG case? Next.js cannot generate nearly infinite these dynamic routes pages because these dynamic routes can have infinite combination.

* How to handle dynamic routes in SSG?
Next.js can build(generate) HTML pages with routes in specific pattern(e.g.`/post/:id`) such as `/posts/1` and `/posts/2` which are specific in `GetStaticPaths` function.
```tsx
// /pages/posts/[id].tsx
import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  updateTime: string;
}

interface HomeProps {
  post: Post;
}

const prerender_ssg = ({ post }: HomeProps) => {
  const router = useRouter();
  if (router.isFallback) {
    return <>Loading...</>;
  }
  return (
    <div>
      <div>SSG and Dynamic Route Demo</div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <p>Last Update Time:{post.updateTime}</p>
    </div>
  );
};

export default prerender_ssg;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();
  return {
    props: {
      post: {
        ...post,
        updateTime: new Date().toLocaleString(),
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false
  };
};
```

The following code will generate 2 pages `/pages/posts/1` and `/pages/posts/2`
```tsx
// /pages/[id].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    fallback: false
  };
};
```

Next, `catch all routes` are applied in `GetStaticPaths`. The following code will generate a page `/pages/posts/Ann/2022/3`:
```tsx
// /pages/[...searchCriteria].tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params:{ author:'Ann', year: '2022', month: '3' } }],
    fallback: false
  };
};
```

Final, `optional catch all routes`, the following code will generate a page `/pages/posts/`ONLY if the route `pages/posts/[[...date]].tsx` is used:
```tsx
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params:{ date:false } }],
    fallback: false
  };
};
```

Wait! What is the purpose of `fallback`?
* if `false`: go to 404 page - suitable static content web site
* if `true`: if the page is not found, the page will be generated immediately before return it. In the meantime, `router.isFallback` is used showing progress. Otherwise, the built html will be returned. (Try find the html under `.next/server/pages/`)
* if `"blocking"`,  if the page is not found, the page will be generated immediately before return it.In the meantime, but NO `router.isFallback`. Otherwise, the built html will be returned.

** There are 3 types of Dynamic Routes:
* Basic style`/pages/post/[idx].tsx`
* Catch all routes `/pages/posts/[...date].tsx` match to `/posts/2022/11/12 OR /posts/ann/2022` 
* Optional catch all routes `/pages/posts/[[...date]].tsx` match to `/posts OR /posts/2022/11/12`.

* The precedence of routes (top priority on the top), if `/pages/posts/all` is requested,
1. 1<sup>st</sup> priority, Static Route such as `/pages/posts/all`
2. 2<sup>nd</sup> priority, Dynamic routes such as `/pages/posts/[author]`
3. 3<sup>rd</sup> priority, Catch all routes such as `/pages/posts/[...searchCriteria]`

Please find more details under official [documentation](https://nextjs.org/docs/routing/dynamic-routes).

## Incremental Static Regeneration(ISR)
The web site such as big e-commerce web site have many products,so the web site provide searching function and show details for each product in page. If the e-commerce web site have ten thousand product, so Next.js need generating ten thousand pages. This will spend too many time cost on building web site because of too many pages generating. Next.js provide building strategy, ISR, reducing the cost. ISR can let building page dynamically in RUNTIME under SSG by following the strategies, `Builder Faster` and `Higher Cache Hit Rate`.

`Builder Faster` will generate most popular pages first at building stage, so that the build time can be reduced significantly. Client request the page other than the popular one , then the page will be generated in cache at runtime. Otherwise, the page will be gotten from cache directly unless the data in specific page are modified.

`Higher Cache Hit Rate` will generate more pages in minimized build time as possible, so that more pages are cached before user's requesting.

### How to use ISR?
To implement `Builder Faster` and `Higher Cache Hit Rate`, we need the help of `revalidate` and `fallback` under function `GetStaticPaths`. Please note that the HTML page will NOT be re-generated without `revalidate` in official documentation.

```tsx
// /pages/[...id].tsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('Server re-generate page');
  const { id } = params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post: Post = await res.json();
  return {
    props: {
      post: {
        ...post,
        updateTime: new Date().toLocaleString(),
      },
    },
    revalidate:60 //The page is re-built every 60 seconds
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }], //select strategy
    fallback: true, //If ISR, the fallback MUST be true/"blocking"
  };
};
```
### fallback: true v.s. fallback: 'blocking'
* 'blocking' ：官方推薦使用這個參數，原因雖然沒有說，但是在 Next.js 的 GitHub issue 中翻了一會兒，會發現 'blocking' 的好處是有利於 SEO，雖然對於會執行 JavaScript 的 Google 爬蟲沒有影響，但是像是 Facebook 或 Twitter 等不會執行 JavaScript 的爬蟲， 'blocking' 才能確保爬蟲拿到的資料是完整的。
* true : 如上述，因為 true 會使爬蟲看到的是 fallback page，如果沒有執行 JavaScript，則無法拿到更新後的內容，如此對於 SEO 不利。但是，對於需要經過 authentication 的頁面或是後台頁面來說，也許 true 是一個好的選擇，因為不用在意 SEO，而且透過 web skeleton 可以讓使用者更快地看到網頁預載入的內容框，從另一個面向來看是可以優化 UX 的選擇。

[Reference](https://www.smashingmagazine.com/2021/04/incremental-static-regeneration-nextjs/)

## Automatic Static Optimization
`Automatic Static Optimization` is a feature of Next.js. It can analyze each page(component) and determine whether using SSG in it when building web site. The rule is that pages will be generated in build stage if `getServerSideProps` or `getInitialProps` are NOT defined in page(component).

### Extra Info: Why Next.js don't recommend using `getInitialProps`?
1. SSG is not supported if `getInitialProps` used, so the performance is affected. In fact, performance of SSG is better than that of SSR.
2. Whole project cannot use `Automatic Static Optimization` if `getInitialProps` is used in `_app.tsx` which let all components will use SSR.
3. Generated Javascript File's size in `getInitialProps` is bigger than that of `getServerSideProps`. `getInitialProps` will be executed in server-side and client-side, so the generated Javascript file contains both sides code.`getServerSideProps` will be executed in server-side only, so the generated Javascript file contains client-side code only. So, generated Javascript file under `getInitialProps` is larger than that under `getServerSideProps`. The details can read the [blog](https://arunoda.me/blog/ssr-and-server-only-modules).

## CSR under Next.js - Stale-While-Revalidate(SWR)
In Official Next.js documentation, Next.js doesn't claim supporting CSR because it just send the javascript file to React Library and let it run the javascript. So, CSR is not a part of Next.js Framework actually. Let us demo the simplified scenario of Technical Forum:

### SSG Case : It is not suitable.
Posts are updated/added frequently, so web site is not a static web sites.

### SSR Case : Heavy Loading on Server - Loading speed is lower
Let us try SSR version by using below example. Please find the CSS style file [here](./)
```tsx
// swr/PostList.tsx
import { GetServerSideProps } from 'next';
import {
  PostBody,
  PostContainer,
  PostFooter,
  PostTitle,
} from '../../styles/postList.style';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostData = {
  post: Post;
  comments: Comment;
};
const posts: PostData[] = [];

type PostsProps = {
  posts: PostData[];
};

const PostList = ({ posts }: PostsProps) => {
  return (
    <div>
      {posts.map(({ post, comments }) => (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <PostFooter>Post by {post.userId} ?? minutes ago</PostFooter>
        </PostContainer>
      ))}
    </div>
  );
};

export default PostList;

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const postsData = await getData('https://jsonplaceholder.typicode.com/posts');
  const comments = await getData(
    'https://jsonplaceholder.typicode.com/comments',
  );

  posts.push(
    ...postsData.map((post: Post) => ({
      post,
      comments: comments.filter(
        (comment: Comment) => comment.postId == post.id,
      ),
    })),
  );

  return {
    props: {
      posts,
    }
  };
};

```
The black page will last longer. Under "Low Speed 3G"  in the browser inspect the lasted time is more obvious. To resolve the problem, we let server pre-render page with first post with comments only, and then remaining post and comments are rendered in client side (React).

### SSR + CSR case : Reducing Server Loading by changing loading data at client side
To reduce the server loading, we switch the fetching data at client side. The example above is modified like this:
```tsx
// swr/PostListCSR.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import {
  PostBody,
  PostContainer,
  PostFooter,
  PostTitle,
} from '../../styles/postList.style';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostData = {
  post: Post;
  comments: Comment[];
};
const posts: PostData[] = [];

type PostsProps = {
  posts: PostData[];
};

const PostList = ({ posts }: PostsProps) => {
  const [loading, setLoading] = useState(false);
  const [postsCache, setPostsCache] = useState<PostData[]>([...posts]);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((_posts: any) => {
        setPostsCache([
          ...postsCache,
          ..._posts.map((post) => ({ post, comments: [] })),
        ]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <PostContainer>Loading...</PostContainer> : <></>}
      {postsCache.map(({ post, comments }) => (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <PostFooter>Posted by {post.userId} ?? minutes ago</PostFooter>
          <div>comments</div>
          <div>
            {comments.map((comment) => (
              <div>
                [Posted by {comment.name}] {comment.body}
              </div>
            ))}
          </div>
        </PostContainer>
      ))}
    </div>
  );
};

export default PostList;

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const post = await getData('https://jsonplaceholder.typicode.com/posts/1');
  const comments = await getData(
    'https://jsonplaceholder.typicode.com/post/1/comments',
  );

  posts.push({
    post,
    comments: comments.filter((comment: Comment) => comment.postId == post.id),
  });

  return {
    props: {
      posts,
    },
  };
};

```
The blank page has been replaced by "loading" text and the pre-rendering page from server (SSR) under normal case and "Low Speed 3G" case. But the fetching data again every refreshing page even data remain unchanged, this waste the network bandwidth and also reduce client side performance. To resolve this issue, simplifying case ,we need create a cache.


### SSR + CSR + Cache : Seem to be good. Anything Else?
```tsx
// swr/PostListCSRCache.tsx
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import {
  PostBody,
  PostContainer,
  PostFooter,
  PostTitle,
} from '../../styles/postList.style';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostData = {
  post: Post;
  comments: Comment[];
};
const posts: PostData[] = [];

type PostsProps = {
  posts: PostData[];
};

const PostList = ({ posts }: PostsProps) => {
  const [loading, setLoading] = useState(false);
  const [postsCache, setPostsCache] = useState<PostData[]>([...posts]);

  useEffect(() => {
    const cache = localStorage.getItem('posts');
    if (!cache) {
      setLoading(true);
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => res.json())
        .then((_posts: any) => {
          const newPosts = [
            ...postsCache,
            ..._posts.map((post) => ({ post, comments: [] })),
          ];
          setPostsCache(newPosts);
          localStorage.setItem('posts', JSON.stringify(newPosts));
          setLoading(false);
        });
    } else {
      setPostsCache(JSON.parse(localStorage.getItem('posts')));
    }
  }, []);

  return (
    <div>
      {loading ? <PostContainer>Loading...</PostContainer> : <></>}
      {postsCache.map(({ post, comments }) => (
        <PostContainer>
          <PostTitle>{post.title}</PostTitle>
          <PostBody>{post.body}</PostBody>
          <PostFooter>Posted by {post.userId} ?? minutes ago</PostFooter>
          <div>comments</div>
          <div>
            {comments.map((comment) => (
              <div>
                [Posted by {comment.name}] {comment.body}
              </div>
            ))}
          </div>
        </PostContainer>
      ))}
    </div>
  );
};

export default PostList;

const getData = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const post = await getData('https://jsonplaceholder.typicode.com/posts/1');
  const comments = await getData(
    'https://jsonplaceholder.typicode.com/post/1/comments',
  );

  posts.push({
    post,
    comments: comments.filter((comment: Comment) => comment.postId == post.id),
  });

  return {
    props: {
      posts,
    },
  };
};

```

Anything Else ?
* Error Retry：在数据加载出问题的时候，要进行有条件的重试（如仅 5xx 时重试，403、404 时放弃重试）
* Preload：预加载数据，避免瀑布流请求
* SSR、SSG：服务端获取的数据用来提前填充缓存、渲染页面、然后再在客户端刷新缓存
* Pagination：大量数据、分页请求
* Mutation：响应用户输入、将数据发送给服务端
* Optimistic Mutation：用户提交输入时先更新本地 UI、形成「已经修改成功」的假象，同时异步将输入发送给服务端；如果出错，还需要回滚本地 UI
* Middleware：日志、错误上报、Authentication
* etc....

OMG! Too many things needed handling. `SWR` has already handled all of these, so we use `SWR` instead of `useEffect` directly.

`SWR`, full name is `stale-while-revalidate`. It handle caching data following HTTP standard. `SWR` will return the data in cache first. If the data(`stale`) in cache are expired, data will be fetched by calling API and update it in cache (`revalidate`).

### Install SWR
```
yarn add swr
```



### References
* https://blog.skk.moe/post/why-you-should-not-fetch-data-directly-in-use-effect/
* https://javascript.plainenglish.io/why-you-should-use-useswr-instead-of-usestate-when-calling-apis-8b6de5dc18fc
* https://17.reactjs.org/docs/concurrent-mode-suspense.html#approach-1-fetch-on-render-not-using-suspense
* https://lo-victoria.com/a-look-at-react-hooks-useswr-for-data-fetching-in-react


## Common Issue List
* Issue#1 : Why the server side props doesn't called 
Cause : wrong spelling of function name such as getServerProps(❌), getServerSideProps(✅)

Reference : https://stackoverflow.com/questions/73651855/getserversideprops-not-getting-called-for-nested-page-in-next-with-typescript


## References
* https://ithelp.ithome.com.tw/users/20110504/ironman/4269
* https://medium.com/starbugs/%E5%88%9D%E6%8E%A2-server-side-rendering-%E8%88%87-next-js-%E6%8E%A8%E5%9D%91%E8%A8%88%E7%95%AB-d7a9fb48a964
* https://blog.logrocket.com/create-react-app-vs-next-js-performance-differences/
* https://theodorusclarence.com/blog/nextjs-fetch-method