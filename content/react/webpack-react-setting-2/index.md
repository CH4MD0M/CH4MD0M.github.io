---
title: 'React + TypeScript + Webpack 프로젝트 설정하기(2)'
category: react
date: 2023-04-16
tags:
  - webpack
  - babel
  - webpackDevServer
---

# Webpack 설치 및 설정

`webpack.common.js`를 먼저 생성할 것이다. 이 파일은 개발 환경과 배포 환경에서 공통적으로 사용되는 설정들을 담고 있다. 추가적인 설정에 관한 설명은 이 게시글이 너무 길어질 수 있기 때문에 자세하게 다루지 못하지만, 간단하게 주석으로 설명을 달아두었다. 개발 환경은 `webpack.dev.js`에 배포 환경은 `webpack.prod.js`에 설정을 할 것이다.

## webpack.common.js

```bash
$ yarn add -D webpack webpack-cli webpack-merge
$ yarn add -D css-loader sass sass-loader style-loader @svgr/webpack
$ yarn add -D copy-webpack-plugin dotenv-webpack fork-ts-checker-webpack-plugin html-webpack-plugin
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  // entry point 설정
  entry: './src/index.tsx',

  // output 설정
  output: {
    path: path.resolve(__dirname, 'build'), // 번들된 파일의 출력 경로 설정
    filename: 'js/[name].[contenthash:8].bundle.js', // 번들된 파일의 이름 설정
    chunkFilename: 'js/[id].[contenthash:8].chunk.js', // 청크 파일의 이름 설정
    clean: true, // 빌드 시 기존 파일 삭제 여부 설정
    publicPath: '/', // 번들 파일의 공개 경로 설정
  },

  // 모듈 설정
  module: {
    rules: [
      {
        test: /\.tsx?$/i, // .tsx 또는 .ts 확장자를 가진 파일에 대해서
        exclude: /node_modules/, // node_modules 폴더에서는 제외
        use: 'babel-loader', // babel-loader를 사용하여 변환
      },
      {
        test: /\.(png|jpe?g|gif|ico|webp)$/i, // 이미지 파일 확장자에 대해서
        type: 'asset/resource', // asset/resource 모듈 타입을 사용하여 파일을 리소스로 처리
        generator: {
          filename: 'images/[name].[contenthash:8][ext]', // images 폴더에 [name].[contenthash:8][ext] 형식으로 저장
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

    // TypeScript 타입 체크를 위한 플러그인
    new ForkTsCheckerWebpackPlugin(),

    // 환경 변수 로드를 위한 플러그인
    new Dotenv({
      systemvars: true, // 시스템 환경 변수 사용 여부 설정
    }),
  ],

  // 모듈 해석 설정
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 모듈 해석에 사용할 확장자 설정
    plugins: [new TsconfigPathsPlugin()], // TypeScript의 경로 별칭을 웹팩에서 인식할 수 있도록 설정
  },
};
```

## webpack.dev.js

```bash
$ yarn add -D webpack-dev-server
```

```js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // development 모드로 설정
  mode: 'development',

  // 디버깅을 위한 소스 맵 설정
  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i, // .sass, .scss, .css 확장자에 대해서
        use: ['style-loader', 'css-loader', 'sass-loader'], // style-loader, css-loader, sass-loader를 차례로 사용하여 변환
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
  },
});
```

## webpack.prod.js

```bash
$ yarn add -D clean-webpack-plugin css-minimizer-webpack-plugin terser-webpack-plugin
```

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  // production 모드로 설정
  mode: 'production',

  // 소스 맵 설정
  devtool: 'source-map',

  // 모듈 설정
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i, // .sass, .scss, .css 확장자에 대해서
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        // MiniCssExtractPlugin.loader, css-loader, sass-loader를 차례로 사용하여 변환
      },
    ],
  },

  // 플러그인 설정
  plugins: [
    // CSS 파일 추출을 위한 플러그인
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css', // 번들된 CSS 파일의 이름 설정
      chunkFilename: 'css/[id].[contenthash:8].css', // 청크 파일의 이름 설정
    }),

    // 빌드 시 기존 파일 정리를 위한 플러그인
    new CleanWebpackPlugin(),
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

    // 청크 파일 분리 설정
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // node_modules 폴더 내의 모듈을 대상으로 분리
          name: 'vendors', // 청크 파일 이름 설정
          chunks: 'all', // 모든 청크에 대해 분리
        },
      },
    },
  },
});
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

# 마치며

이렇게 Webpack, Babel, TypeScript, React를 사용하여 프로젝트를 초기 설정하는 방법을 알아보았다. 설정을 하는 부분이라서 조금 복잡하고 어렵다고 느껴졌다. 처음에 설정을 끝냈다고 느꼈지만 구글링을 하면서 잘못되었거나 추가적으로 설정해야할 부분이 계속 나오게 되었다. 이 boilerPlate를 기반으로 프로젝트를 진행하면서 추가적으로 설정해야할 부분이 있으면 계속해서 업데이트를 하고 이 게시글도 바로바로 업데이트 하려고 한다.

이 글을 보고 프로젝트를 초기 설정하는 분들이 있다면 많은 도움이 되었으면 좋겠다.😁

> 위의 설정을 기반으로 만든 boilerPlate는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [Differences in output of Typescript compiler and Babel for classes](https://kevinwil.de/differences-in-output-of-typescript-compiler-and-babel-for-classes/)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
