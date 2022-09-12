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

export const getServerProps:GetServerSideProps = async()=>{
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

If you use older version of Next.js, you would add the _document.tsx under `pages` folder and add following code which generate the CSS on server side.
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