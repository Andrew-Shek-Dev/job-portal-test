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

### Create index.tsx
```tsx
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

### Install nest-next
```
yarn add nest-next
```

### Setup the connection between nest.js and next.js
```typescript
//app.module.ts
//...
import { RenderModule } from 'nest-next';
import Next from 'next';
//...
@Module({
    imports: [RenderModule.forRootAsync(Next({dev:true}),{ viewsDir: null })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
```

```typescript
//app.controller.ts
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render('index')
    home() {
        return {};
    }
}
```

### Setup AWS Amplify
```bash
amplify init
```

```
? Enter a name for the project <Project Name>
The following configuration will be applied:

Project information
| Name: <Project Name>
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? **No**
? Enter a name for the environment dev
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react
? Source Directory Path:  src
? Distribution Directory Path: **.next**
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation
....
⠙ Initializing project in the cloud...
....
Initialized your environment successfully.

Your project has been successfully initialized and connected to the cloud!
```

```bash
amplify add hosting
```

```
? Select the plugin module to execute Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)
? Choose a type Continuous deployment (Git-based deployments)
? Continuous deployment is configured in the Amplify Console. Please hit enter once you connect your repository 
....
Remaining Steps are worked on AWS
```