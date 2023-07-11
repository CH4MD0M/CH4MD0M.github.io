---
title: 'React + TypeScript + Webpack 프로젝트 설정하기(1)'
category: react
date: 2023-04-15
tags:
  - webpack
  - babel
  - polyfill
---

# 들어가기 전에

React 환경을 구축하기 위해 **CRA (Create-React-App)**를 사용한다면 기본적으로 Webpack과 Babel과 같은 설정들이 세팅되어 있다. 모듈 번들러(Module Bundler)에 대해 공부하면서 CRA 없이 React 프로젝트를 설정하고 싶었다. 그래서 CRA 없이 React 프로젝트를 시작하는 방법을 정리해보았다.

> Webpack과 관련된 내용은 [웹팩(webpack) 이란?](https://chamdom.blog/what-is-webpack/)에서 확인할 수 있다.

# 프로젝트 초기화

**폴더 구조**

폴더 구조는 다음과 같이 구성한다.

```bash
├── node_modules
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── types
│   ├── App.tsx
│   └── index.tsx
├── .eslintrc
├── .prettierrc
├── babel.config.json
├── package.json
├── tsconfig.json
├── tsconfig.path.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock
```

**프로젝트 초기화**

```bash
$ mkdir webpack-react-ts
$ cd webpack-react-ts
$ yarn init -y
$ mkdir src public dist
```

# TypeScript 설치 및 설정

```bash
$ yarn add -D tsconfig-paths-webpack-plugin typescript

```

### TypeScript 설정 파일 작성

`tsc 명령어`를 사용하여 `tsconfig.json` 파일을 생성할 수도 있고 직접 파일을 생성할 수도 있다.

```bash
$ yarn tsc --init
# or
$ touch tsconfig.json
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["ES2020", "DOM"],
    "jsx": "react-jsx",
    "module": "esnext",
    "moduleResolution": "Node",
    "strict": true,
    "strictNullChecks": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "forceConsistentCasingInFileNames": false
  },
  "include": ["src"],
  "extends": "./tsconfig.paths.json"
}
```

### TypeScript 경로 별칭(alias) 설정

경로 별칭(alias) 설정을 위해서 `tsconfig.paths.json` 파일을 생성하고 `tsconfig.json` 파일에서 `extends`를 통해 `tsconfig.paths.json` 파일을 상속받도록 설정한다.

```bash
$ touch tsconfig.paths.json
```

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

> ⚠️ webpack 설정 파일은 뒤에서 작성하겠지만 `webpack.common.js`의 `resolve`에 플러그인을 다음과 같이 추가해줘야 한다.

```js
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // ...
  resolve: {
    // ...
    plugins: [new TsconfigPathsPlugin()],
  },
};
```

# React 설치 및 설정

**패키지 설치**

```bash
$ yarn add react react-dom
$ yarn add -D @types/react @types/react-dom
```

**파일 생성**

```bash
$ touch public/index.html
```

**index.html 작성**

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Webpack React TypeScript Starter</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**index.tsx 작성**

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);

root.render(<App />);
```

**App.tsx 작성**

```tsx
// App.tsx
import React from 'react';

const App = () => {
  return <div>Hello World!</div>;
};

export default App;
```

# Babel, Polyfill 설정

`babel` 7버전부터 `ts-loader`를 사용하지 않고 `@babel/preset-typescript`를 사용하여 `ts`파일을 컴파일 할 수 있다. 자세한 내용은 [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/)에서 확인할 수 있다.

**패키지 설치**

```bash
$ yarn add @babel/runtime-corejs3
$ yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

**babel.config.json 설정**

> 자세한 설명은 [이 포스팅](https://chamdom.blog/webpack-babel-setting)에서 다룬다.

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      { "targets": { "browsers": ["last 2 versions", "safari >= 7"] } }
    ],
    "@babel/preset-react",
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ],
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]]
}
```

**webpack 설정 파일 작성**

```js
// webpack.common.js

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.tsx?$/i, // .tsx 또는 .ts 확장자를 가진 파일에 대해서
        exclude: /node_modules/, // node_modules 폴더에서는 제외
        use: 'babel-loader', // babel-loader를 사용하여 변환
      },
      // ...
    ],
  },
};
```

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [Differences in output of Typescript compiler and Babel for classes](https://kevinwil.de/differences-in-output-of-typescript-compiler-and-babel-for-classes/)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
