## Install Nest.js
```
npm install -g @nestjs/cli
```

### Create Nest.js Project
```
npx @nestjs/cli new <Project Name>
cd <Project Name>
code .
```

### Update Nest.js config file
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "entryFile": "server/main"
}
```

### Install Next.js
```
yarn add next react react-dom
yarn add -D @types/react @types/react-dom eslint-config-next
```

### Test Next Server
```
yarn next dev
```

### Modify tsconfig.build.json to tsconfig.server.json
```json
// ./tsconfig.server.json
{
    "extends": "./tsconfig.json",
    "compilerOptions": {
        "noEmit": false
    },
    "include": [
        "./src/server/**/*.ts",
        "./src/shared/**/*.ts",
        "./@types/**/*.d.ts"
    ]
}
```

### Modify package.json
```json
scripts: {
    "build": "yarn build:next && yarn build:nest",
    "build:next": "next build",
    "build:nest": "nest build --path ./tsconfig.server.json",
    "start": "node ./dist/server/main.js",
    "start:next": "next dev",
    "start:dev": "nest start --path ./tsconfig.server.json --watch",
    "start:debug": "nest start --path ./tsconfig.server.json --debug --watch",
}
```

### Create App.tsx and index.tsx
```tsx
//App.tsx
import { AppProps } from 'next/app'
import React from 'react'

const App = ({Component,pageProps}:AppProps) => {
  return <Component {...pageProps}/>
}

export default App

//index.tsx
import React from 'react'
const Home = () => {
  return <h1>Home</h1>
}

export default Home
```

### Test Server
```
yarn start:next
```

### Remark
add .next folder to your .gitignore - that is where NEXT.js stores its builds.