---
title: 'Webpack + React + TypeScript Boilerplate (3) - babel, polyfill 설정하기'
category: react
date: 2023-10-12 17:10:00
tags:
  - babel
  - polyfill
---

# 들어가며

> 이 포스팅에서는 간단하게 설정 방법만 작성했다. 자세한 설명은 [이 포스팅](https://chamdom.blog/webpack-babel-setting)에서 다룬다.

# 패키지 설치

`babel` 7버전부터 `ts-loader`를 사용하지 않고 `@babel/preset-typescript`를 사용하여 `ts`파일을 컴파일 할 수 있다. 자세한 내용은 [TypeScript With Babel: A Beautiful Marriage](https://iamturns.com/typescript-babel/)에서 확인할 수 있다.

```bash
$ yarn add @babel/runtime-corejs3
$ yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader
```

**@babel/preset-env** <br/>
`@babel/preset-env`는 babel이 지원하는 최신 자바스크립트 문법을 사용할 수 있도록 해주는 preset이다. 이 preset은 브라우저 지원 범위를 설정할 수 있기 때문에 브라우저에 맞게 코드를 변환해준다. 또한 `@babel/preset-env`는 `@babel/plugin-transform-runtime`과 함께 사용하면 `core-js`를 사용하여 폴리필을 적용할 수 있다.

**@babel/preset-react** <br/>
`@babel/preset-react`는 React를 사용할 수 있도록 해주는 preset이다.

**@babel/preset-typescript** <br/>
babel은 기본적으로 타입스크립트의 문법을 해석할 수 없기 때문에 `@babel/preset-typescript`를 사용하여 babel이 타입스크립트의 문법을 해석할 수 있도록 해준다.

# babel.config.json 설정

`babel.config.json` 파일을 루트 디렉토리에 생성하고 다음과 같이 설정한다.

```json
// babel.config.json
{
  "presets": [
    ["@babel/preset-env", { "modules": false }],
    ["@babel/preset-react", { "runtime": "automatic" }],
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ],
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]]
}
```

**["@babel/preset-env", { "modules": false }]** <br/>
모듈 변환을 하지 않고 ES6 모듈을 그대로 사용한도록 하는 설정이다. commonJS 모듈은 런타임에 동적으로 모듈을 로드하기 때문에 빌드 도구(webpack)가 어떤 코드가 실제로 사용되는지 사전에 정확하게 알 수 없게 된다. 또한 ES6 모듈처럼 명시적으로 어떤 변수나 함수가 외부로 보내지는지 알 수 없고 객체로 내보내기 때문에 이 설정은 `import/export` 문을 그대로 사용하기 위함이다.

**["@babel/preset-react", { "runtime": "automatic" }]** <br/>
이 설정은 React 17부터 도입된 새로운 JSX Transform을 지원하기 위한 설정이다. 이 설정을 사용하면 React.createElement 호출 대신 Babel에 의해 자동으로 처리된다. 따라서 별도로 `import React from 'react';`를 추가할 필요가 없어진다. 자세한 내용은 [React 공식문서](https://ko.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)에서 확인할 수 있다.

**["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]** <br/>
이 설정은 다음 게시글에서 좀 더 자세하게 설명하겠지만, babel이 `.tsx`파일 내부의 JSX 코드를 해석할 수 있도록 해주는 설정이다. babel이 트랜스파일링 하도록, tsc가 타입 체크의 역할을 하도록 설정했기 때문에 이렇게 설정한다는 것만 알고 넘어가자.

### browserlists 설정

`@babel/preset-env`는 `browserlists` 설정에 따라 브라우저를 지원한다. `browserlists` 설정은 `package.json` 파일에 다음과 같이 작성할 수 있다.

```json
// package.json
{
  "browserslist": ["last 2 versions", "safari >= 7"]
}
```

# webpack 설정 파일 작성

webpack 설정 파일에 `babel-loader`를 추가한다.

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

<br /><br />

> boilerPlate 코드는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

<br />

---

# 참고

- [Differences in output of Typescript compiler and Babel for classes](https://kevinwil.de/differences-in-output-of-typescript-compiler-and-babel-for-classes/)
- [babel공식문서 - @babel/preset-env](https://babeljs.io/docs/babel-preset-env)
- [Webpack공식문서 - Tree Shaking](https://webpack.js.org/guides/tree-shaking/)
- [Webpack에서 Tree Shaking 적용하기](https://medium.com/naver-fe-platform/webpack%EC%97%90%EC%84%9C-tree-shaking-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-1748e0e0c365)
