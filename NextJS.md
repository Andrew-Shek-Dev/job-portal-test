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

## Handling Server Side Rendering (SSR)/Static Side Generation (SSG)
Next.js 是一個基於 React 的框架，它同時支援 SSR (Server Side Rendering) 與 SSG (Static Side Generation) 兩種方法，不需要很多的設定就可以讓網站同時有這兩種功能。

Next.js 在設計上可以混用兩種方法，像是 /page-a 希望能夠 SSR，因為網站內容很常改變，需要 API 支援變動頻繁的資料；而 /page-b 則是使用 SSG 則是可以用在內容較不常改變的頁面，例如 Landing Page 或部落格等

## Optimizing Image Files
SEO => content => core web vitals mark => speed and newer image format such as webp(< 45% of PNG file size )=>webpack/gulp + plugin => complex setup/maintenance => Next.js simplify the processing (depend on browser supported format)

## File Structure
* pages - store all of pages (file-based routing)
* next.config.js - application-specific settings such as .env variables,base path, header, webpack config,etc...
* next-env.d.ts - import all types used in Next.js (let Next.js support *.module.css without config under typescript). 
* .eslintrc - control quality of source code