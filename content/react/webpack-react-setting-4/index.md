---
title: 'Webpack + React + TypeScript Boilerplate (4) - 타입스크립트, 리액트 설정하기'
category: react
date: 2023-10-12 17:15:00
tags:
  - webpack
  - babel
  - ForkTsCheckerWebpackPlugin
  - TsconfigPathsPlugin
---

# TypeScript 설치 및 설정

필요한 패키지를 설치하자.

```bash
$ yarn add -D typescript tsconfig-paths-webpack-plugin fork-ts-checker-webpack-plugin
```

**tsconfig-paths-webpack-plugin** <br/>
`tsconfig.json` 파일에 설정된 경로 별칭(path aliases)을 webpack에게 알려주고, 이러한 별칭을 해석하여 모듈을 로드할 때 실제 경로를 찾도록 도와주는 플러그인이다. 이 플러그인을 설치하지 않는다면 경로 별칭을 tsconfig 파일과 webpack 설정 파일에 중복해서 설정하기 때문에 이 플러그인을 사용했다.

**fork-ts-checker-webpack-plugin** <br/>
이 플러그인은 타입스크립트 타입 체크를 별도의 프로세스로 실행하여 webpack 빌드 시간을 줄여주는 역할을 한다. 그리고 `babel-loader`는 타입체크를 수행하지 않기 때문에 이 플러그인을 사용하면 개발 중에 실시간으로 타입 오류를 감지하고 알림을 받을 수 있다.

## TypeScript 설정 파일 작성

` tsc` 명령어를 사용하여 `tsconfig.json` 파일을 생성하거나 직접 파일을 생성해준다.

```bash
$ yarn tsc --init
# or
$ touch tsconfig.json
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "module": "esnext",
    "target": "esnext",
    "moduleResolution": "Node",
    "jsx": "preserve",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "strictNullChecks": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": [".eslintrc.js", "src"],
  "exclude": ["node_modules", "build"],
  "extends": "./tsconfig.paths.json"
}
```

설정에 대한 설명은 [babel과 tsc](https://chamdom.blog/typescript/babel-and-tsc)에서 확인할 수 있다.

## TypeScript 경로 별칭(alias) 설정

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
      // "@components/*": ["src/components/*"],
      // "@hooks/*": ["src/hooks/*"],
      // "@layout/*": ["src/layout/*"],
      // "@pages/*": ["src/pages/*"],
      // "@styles/*": ["src/styles/*"],
      // "@utils/*": ["src/utils/*"]
    }
  }
}
```

## webpack 설정 파일 작성

`webpack.config.js` 파일에 다음과 같이 설정을 추가한다.

```js
// webpack.common.js
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  plugins: [
    // ...
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  resolve: {
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

# 프로젝트 실행

### package.json 스크립트 추가

아래와 같이 `package.json`에 스크립트를 추가한다.

```json
// package.json
"scripts": {
  "start": "webpack-dev-server --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js",
}
```

# 마치며

이렇게 Webpack, Babel, TypeScript, React를 사용하여 프로젝트를 초기 설정하는 방법을 알아보았다. 설정을 하는 부분이라서 조금 복잡하고 어렵다고 느껴졌다. 중간에 잘못된 설정이 있어 계속 수정하기를 반복했는데 이 과정에서 많은 것을 배울 수 있었다! 추가적으로 설정해야할 부분이나 오류가 있다면 계속해서 코드와 이 게시글을 함께 업데이트하도록 하겠다.

이 글을 보고 프로젝트를 초기 설정하는 분들이 있다면 많은 도움이 되었으면 좋겠다.😁

<br /><br />

> boilerPlate 코드는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

<br />

---

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
