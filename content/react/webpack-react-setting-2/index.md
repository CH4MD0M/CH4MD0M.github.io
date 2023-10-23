---
title: 'Webpack + React + TypeScript Boilerplate (2) - webpack 설정하기'
category: react
date: 2023-10-12 17:04:00
tags:
  - webpack
  - webpackDevServer
---

이번 포스팅에서는 webpack을 설정해보자.

먼저 `webpack.common.js`를 생성할 것이다. 이 파일은 개발 환경과 배포 환경에서 공통적으로 사용되는 설정들을 담고 있다. 추가적인 설정에 관한 설명은 이 게시글이 너무 길어질 수 있기 때문에 자세하게 다루지 못하지만, 간단하게 주석으로 설명을 달아두었다.

개발 환경은 `webpack.dev.js`에 배포 환경은 `webpack.prod.js`에 설정을 할 것이다.

# webpack.common.js

### 패키지 설치

```bash
$ yarn add -D webpack webpack-cli webpack-merge
$ yarn add -D css-loader sass sass-loader style-loader @svgr/webpack
$ yarn add -D copy-webpack-plugin dotenv-webpack html-webpack-plugin
```

### 설정 파일 작성

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // entry point 설정
  entry: './src/index.tsx',

  // output 설정
  output: {
    path: path.resolve(__dirname, 'build'), // 번들된 파일의 출력 경로 설정
    filename: 'js/[name].[contenthash:8].bundle.js', // 번들된 파일의 이름 설정
    chunkFilename: 'js/[name].[contenthash:8].chunk.js', // 청크 파일의 이름 설정
    clean: true, // 빌드 시 기존 파일 삭제 여부 설정
    publicPath: '/', // 번들 파일의 공개 경로 설정
  },

  // 모듈 설정
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i, // 이미지 파일 확장자에 대해서
        type: 'asset/resource', // asset/resource 모듈 타입을 사용하여 파일을 리소스로 처리
        generator: {
          filename: 'images/[name].[contenthash:8][ext]',
          // images 폴더에 [name].[contenthash:8][ext] 형식으로 저장
        },
      },
      {
        test: /\.svg$/, // .svg 확장자에 대해서
        use: ['@svgr/webpack'], // @svgr/webpack 로더를 사용하여 SVG를 컴포넌트로 변환
      },
    ],
  },

  // 플러그인 설정
  plugins: [
    // HTML 파일 생성을 위한 플러그인
    new HtmlWebpackPlugin({
      template: 'public/index.html', // 템플릿 파일 경로 설정
      favicon: 'public/favicon.ico', // 파비콘 파일 경로 설정
    }),

    // 정적 파일 복사를 위한 플러그인
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public', // 복사할 파일이 위치한 디렉토리 설정
          globOptions: {
            ignore: ['**/index.html', '**/favicon.ico'], // 특정 파일 제외 설정
          },
        },
      ],
    }),

    // 환경 변수 로드를 위한 플러그인
    new Dotenv({
      systemvars: true, // 시스템 환경 변수 사용 여부 설정
    }),
  ],

  // 모듈 해석 설정
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 모듈 해석에 사용할 확장자 설정
  },
};
```

# webpack.dev.js

`webpack.dev.js`는 개발 환경에서 사용할 설정 파일이다.

### 패키지 설치

```bash
$ yarn add -D webpack-dev-server
```

`webpack-dev-server`는 API proxy, 모듈 핫 로딩(MHR) 등을 지원해서 개발 프로세스를 단순화하고 향상시키는 데 도움을 주는 유용한 라이브러리다.

### 설정 파일 작성

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // development 모드로 설정
  mode: 'development',

  // 디버깅을 위한 소스 맵 설정
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.s?css$/i, // .sass, .scss, .css 확장자에 대해서
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // style-loader, css-loader, sass-loader를 차례로 사용하여 변환
      },
    ],
  },

  // 개발 서버 설정
  devServer: {
    open: true, // 브라우저 자동 열기 여부 설정
    hot: true, // HMR(Hot Module Replacement) 활성화 여부 설정
    historyApiFallback: true, // HTML5 History API를 사용하는 SPA(Single Page Application)에서의 페이지 전환 설정
    compress: true, // gzip 압축 사용 여부 설정
    port: 3000, // 개발 서버 포트 설정
    liveReload: true, // 변경된 내용 자동 새로고침 여부 설정
  },
});
```

# webpack.prod.js

`webpack.prod.js`는 배포 환경에서 사용할 설정 파일이다.

### 패키지 설치

```bash
$ yarn add -D clean-webpack-plugin css-minimizer-webpack-plugin terser-webpack-plugin
```

**clean-webpack-plugin:** 빌드 시 기존 파일 정리를 위한 플러그인

**css-minimizer-webpack-plugin:** CSS 코드 압축 플러그인

**terser-webpack-plugin:** JavaScript 코드 압축 플러그인

### 설정 파일 작성

```js
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(common, {
  // production 모드로 설정
  mode: 'production',

  // 소스 맵 설정
  devtool: 'hidden-source-map',

  // 모듈 설정
  module: {
    rules: [
      {
        test: /\.s?css$/i, // .sass, .scss, .css 확장자에 대해서
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // MiniCssExtractPlugin.loader, css-loader, sass-loader를 차례로 사용하여 변환
      },
    ],
  },

  // 플러그인 설정
  plugins: [
    // 빌드 시 기존 파일 정리를 위한 플러그인
    new CleanWebpackPlugin({
      // build 폴더 내부의 모든 파일 삭제 설정
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.resolve(process.cwd(), 'build/**/*'),
      ],
    }),

    // CSS 파일 추출을 위한 플러그인
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 번들된 CSS 파일의 이름 설정
      chunkFilename: 'css/[id].[contenthash:8].css', // 청크 파일의 이름 설정
    }),
  ],

  // 최적화 설정
  optimization: {
    usedExports: true, // 사용된 내보내기(exports)만을 포함시키는 설정
    minimize: true, // 코드 압축 여부 설정
    minimizer: [
      // JavaScript 코드 압축 플러그인
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔(console) 로그 제거 설정
          },
        },
      }),

      // CSS 코드 압축 플러그인
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }, // 주석 제거 설정
            },
          ],
        },
      }),
    ],
  },
});
```

<br /><br />

> boilerPlate 코드는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

<br />

---

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
