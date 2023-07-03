---
title: 'CRA 사용하지 않고 React 프로젝트 시작하기'
category: react
date: 2023-03-29
tags:
  - webpack
  - react
  - babel
---

# 들어가기 전에

React 환경을 구축하기 위해 **CRA (Create-React-App)**를 사용한다면 기본적으로 Webpack과 Babel과 같은 설정들이 세팅되어 있다. 모듈 번들러(Module Bundler)에 대해 공부하면서 CRA 없이 React 프로젝트를 설정하고 싶었다. 그래서 CRA 없이 React 프로젝트를 시작하는 방법을 정리해보았다.

> Webpack과 관련된 내용은 [웹팩(webpack) 이란?](https://chamdom.blog/what-is-webpack/)에서 확인할 수 있다.

# 프로젝트 초기화 및 폴더 구조

### 프로젝트 초기화

```bash
$ mkdir webpack-react-ts
$ cd webpack-react-ts
$ yarn init -y
```

### 폴더 구조

폴더 구조는 아래와 같이 구성하였다.

```bash
├── node_modules
├── public
│   └── index.html
├── src
│   ├── App.tsx
│   └── index.tsx
├── .eslintrc
├── babel.config.json
├── package.json
├── tsconfig.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock
```

# Webpack 설치 및 설정

### Webpack 설치

Webpack과 관련된 라이브러리들을 설치한다.

```bash
$ yarn add --dev webpack webpack-cli webpack-dev-server webpack-merge
```

추가적으로 필요한 라이브러리들을 설치한다.

```bash
$ yarn add --dev clean-webpack-plugin core-js fork-ts-checker-webpack-plugin html-webpack-plugin terser-webpack-plugin
```

**✨optional✨**

CSS, SCSS, SASS 등 스타일 관련 라이브러리를 설치하고 싶다면 아래 명령어를 실행한다. styled-components와 같은 CSS-in-JS 라이브러리를 사용한다면 설치하지 않아도 된다.

```bash
$ yarn add --dev css-loader css-minimizer-webpack-plugin mini-css-extract-plugin sass sass-loader style-loader
```

### Webpack 설정

`webpack.common.js`를 먼저 생성할 것이다. 이 파일은 개발 환경과 배포 환경에서 공통적으로 사용되는 설정들을 담고 있다. 추가적인 설정에 관한 설명은 이 게시글이 너무 길어질 수 있기 때문에 자세하게 다루지 못하지만, 간단하게 주석으로 설명을 달아두었다.

`babel` 7버전부터 `ts-loader`를 사용하지 않고 `@babel/preset-typescript`를 사용하여 `ts`파일을 컴파일 할 수 있다. 자세한 내용은 [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/)에서 확인할 수 있다. `babel`에 대한 설정은 밑에서 다루겠다.

```js
//webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  // entry 파일 설정
  entry: './src/index.tsx',
  output: {
    // 번들링된 파일이 저장될 경로
    path: path.resolve(__dirname, 'build'),
    // 번들링된 파일 이름(캐싱을 위해 파일 이름에 해시값을 추가)
    filename: '[name].[contenthash:8].bundle.js',
    // 빌드 전 폴더를 정리하는 옵션
    clean: true,
    // 웹사이트에서 정적 자원을 참조하는 기본 경로 설정
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash:8][ext]',
        },
      },
      {
        test: /\.svg$/,
        // SVG를 처리하기 위해 @svgr/webpack 사용
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    // Typescript의 타입 검사를 위한 플러그인
    new ForkTsCheckerWebpackPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    // 경로 별칭 설정 (예: "@/components"를 "src/components"로 해석)
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
```

다음은 `webpack.dev.js`를 생성한다. 이 파일은 개발 환경에서만 사용되는 설정들을 담고 있다. `webpack.common.js`을 import 하여 공통적인 설정들을 가져오고 `merge`를 통해 개발 환경에서만 사용되는 설정들을 추가한다.

```js
//webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // 웹팩 개발 서버 설정
  devServer: {
    open: true, // 개발 서버 실행 시 브라우저를 자동으로 열어줌
    hot: true, // HMR(Hot Module Replacement)을 사용할 수 있게 해줌
    historyApiFallback: true, // SPA에서 react-router-dom을 사용할 때 404 에러가 발생하는 것을 방지
    compress: true, // gzip 압축
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});
```

마지막으로 `webpack.prod.js`를 생성한다. 이 파일은 배포 환경에서만 사용되는 설정들을 담고 있다. `webpack.dev.js`와 마찬가지로 `webpack.common.js`을 import 하여 공통적인 설정들을 가져오고 `merge`를 통해 배포 환경에서만 사용되는 설정들을 추가한다.

```js
//webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    // CSS 파일을 별도의 파일로 추출
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].[contenthash:8].css',
    }),
    // 빌드 전 폴더를 정리하는 플러그인
    new CleanWebpackPlugin(),
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    // 코드 최소화를 위한 플러그인
    minimizer: [
      // Javascript 파일 최소화
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // console.log 제거
          },
        },
      }),
      // CSS 파일 최소화
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // 모든 주석 제거
            },
          ],
        },
      }),
    ],
    // 코드 분할 설정
    splitChunks: {
      chunks: 'all',
    },
  },

  // 성능 경고 설정
  performance: {
    hints: false, // 경고 비활성화
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
```

# Babel 설치 및 설정

### Babel 설치

babel 관련 패키지들을 설치한다.

```bash
$ yarn add --dev @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

### Babel 설정

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.5%, not dead",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-react",
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ]
}
```

# TypeScript 설치 및 설정

이제 TypeScript를 설치하고 설정해보자.

### TypeScript 관련 패키지 설치

```bash
$ yarn add --dev @typescript-eslint/parser eslint typescript
```

### TypeScript 설정

Typescript를 전역해 설치 했다면, `tsc --init` 명령어 실행으로 `tsconfig.json` 파일을 생성할 수 있고 만약 설치하지 않았다면 따로 파일을 생성해도 무방하다.

```json
// tsconfig.json
{
  "compilerOptions": {
    "lib": ["ES2020", "DOM"],
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "Node",
    "target": "es5",
    "strict": true,
    "strictNullChecks": false,
    "esModuleInterop": true,
    "sourceMap": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

### eslint 설정

```json
// .eslintrc
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "node": true
  },
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:cypress/recommended"
  ]
}
```

# React 설치 및 설정

이제 마지막으로 React를 설치하고 설정해보자.

### React 관련 패키지 설치

```bash
$ yarn add react react-dom react-router-dom styled-components
$ yarn add --dev @types/react @types/react-dom @types/styled-components
```

### React 파일 작성

webpack.common.js에서 entry 포인트로 지정한 `index.tsx`를 생성한다.

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

**index.html 작성**

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

# 프로젝트 실행

### package.json 스크립트 추가

아래와 같이 `package.json`에 스크립트를 추가한다.

```json
// package.json
"scripts": {
  "start": "webpack-dev-server --config webpack.dev.js",
  "build": "webpack --config webpack.prod.js"
}
```

### 개발 서버 실행

```bash
$ yarn start
```

# 마치며

이렇게 Webpack, Babel, TypeScript, React를 사용하여 프로젝트를 초기 설정하는 방법을 알아보았다. 설정을 하는 부분이라서 조금 복잡하고 어렵다고 느껴졌다. 처음에 설정을 끝냈다고 느꼈지만 구글링을 하면서 잘못되었거나 추가적으로 설정해야할 부분이 계속 나오게 되었다. 이 boilerPlate를 기반으로 프로젝트를 진행하면서 추가적으로 설정해야할 부분이 있으면 계속해서 업데이트를 하고 이 게시글도 바로바로 업데이트 하려고 한다.

이 글을 보고 프로젝트를 초기 설정하는 분들이 있다면 많은 도움이 되었으면 좋겠다.😁

> 위의 설정을 기반으로 만든 boilerPlate는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [Differences in output of Typescript compiler and Babel for classes](https://kevinwil.de/differences-in-output-of-typescript-compiler-and-babel-for-classes/)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
