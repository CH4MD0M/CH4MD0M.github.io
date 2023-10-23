---
title: 'Webpack + React + TypeScript Boilerplate (1) - 프로젝트 초기화 및 eslint, prettier 설정하기'
category: react
date: 2023-10-12 17:00:00
tags:
  - webpack
  - eslint
  - prettier
---

# 들어가기 전에

React 환경을 구축하기 위해 **CRA (Create-React-App)**를 사용한다면 기본적으로 Webpack과 Babel과 같은 설정들이 세팅되어 있다. 모듈 번들러(Module Bundler)에 대해 공부하면서 CRA 없이 React 프로젝트를 설정하고 싶었다. 그래서 CRA 없이 React 프로젝트를 시작하는 방법을 정리해보았다.

> Webpack과 관련된 내용은 [웹팩(webpack) 이란?](https://chamdom.blog/what-is-webpack/)에서 확인할 수 있다.

# 프로젝트 초기 설정

### 폴더 구조

폴더 구조는 다음과 같다.

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
├── .eslintrc.js
├── .prettierignore
├── .prettierrc.js
├── babel.config.json
├── package.json
├── tsconfig.json
├── tsconfig.path.json
├── webpack.common.js
├── webpack.dev.js
├── webpack.prod.js
└── yarn.lock
```

### 프로젝트 초기화

```bash
$ mkdir webpack-react-ts
$ cd webpack-react-ts
$ yarn init -y
$ mkdir src public dist
```

# eslint, prettier 관련 라이브러리 설치

먼저 eslint와 prettier를 설치하자.

```bash
$ yarn add -D eslint eslint-plugin-react eslint-plugin-react-hooks
```

**eslint:** ESLint는 JavaScript 코드에서 문제점을 찾고 코드 스타일을 체크하는 린트 도구.

**eslint-plugin-react:** React 프로젝트에서 React 관련 규칙을 추가하여 React 코드를 검사하는 데 도움을 준다. React 컴포넌트 및 JSX 코드에 대한 린트 규칙을 제공한다.

**eslint-plugin-react-hooks:** React Hook 사용에 관한 규칙을 제공하고 React Hook을 올바르게 사용하고 예기치 않은 오류를 방지하는 데 도움을 준다.

```bash
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

**prettier:** 코드를 일관된 스타일로 자동으로 포맷팅하여 읽기 쉽고 일관된 코드 스타일을 유지하기 위한 코드 포맷팅 도구다.

**eslint-config-prettier:** ESLint와 Prettier를 함께 사용할 때, ESLint와 Prettier 간의 충돌을 방지하기 위해 설치한다. ESLint에서 Prettier와 겹치는 포매팅룰을 삭제한다.

**eslint-plugin-prettier:** ESLint 규칙과 Prettier 규칙 간의 충돌을 자동으로 해결하도록 도와준다. 이 플러그인을 사용하면 코드 포맷팅에 관한 ESLint 규칙을 활성화하고, 이러한 규칙을 Prettier로 전달하여 일관된 코드 스타일을 유지할 수 있다.

```bash
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

**@typescript-eslint/eslint-plugin:** TypeScript 파일에서 타입 및 정적 분석을 수행하고 TypeScript 관련 규칙을 제공한다.

**@typescript-eslint/parser:** TypeScript 코드를 ESLint가 이해할 수 있도록 변환하는 역할을 한다.

# eslint, prettier 설정 파일 작성

## .eslintrc.js 파일 생성

파일을 루트 디렉토리에 생성한다. 파일명은 `.eslintrc.js` 또는 `.eslintrc`로 작성하면 된다.

```bash
$ touch .eslintrc.js
# 또는
$ touch .eslintrc
```

## .eslintrc.js 파일 작성

```js
module.exports = {
  // 이 ESLint 설정은 이 설정 파일이 있는 디렉토리를 기준으로 모든 하위 디렉토리와 파일에 적용된다.
  root: true,

  // 실행 환경을 정의. 여기서는 브라우저와 Node.js 환경에서 실행되는 코드를 대상으로 한다.
  env: {
    browser: true,
    node: true,
  },

  // TypeScript 코드를 분석하기 위한 파서
  parser: '@typescript-eslint/parser',

  // 파서에 전달되는 옵션들을 정의한다.
  parserOptions: {
    // ECMAScript 버전을 2020(ES11)으로 지정
    ecmaVersion: 2020,
    // 모듈 시스템을 사용하는 코드를 분석하도록 설정
    sourceType: 'module',
    // 타입 정보에 기반한 ESLint 규칙을 사용하기 위해 tsconfig.json 파일의 경로를 지정
    project: './tsconfig.json',
    // tsconfig.json 파일의 위치를 지정. __dirname은 현재 파일의 위치를 나타낸다.
    tsconfigRootDir: __dirname,
    // JSX 문법을 사용할 수 있도록 설정
    ecmaFeatures: {
      jsx: true,
    },
  },

  // ESLint에 추가적인 기능을 제공하는 플러그인들을 명시
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],

  extends: [
    'eslint:recommended', // ESLint의 기본 권장 규칙
    'plugin:react/recommended', // React를 위한 권장 규칙
    'plugin:react-hooks/recommended', // React Hooks를 위한 권장 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript를 위한 권장 규칙
    'plugin:prettier/recommended', // Prettier와 ESLint를 함께 사용하기 위한 설정
  ],

  // 특정 규칙들을 오버라이드하거나 추가하는 섹션
  rules: {
    // React를 사용할 때 'React'를 import 하지 않아도 되게 설정
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    // React Hooks의 의존성 배열을 정확하게 명시하도록 경고
    'react-hooks/exhaustive-deps': 1,
    // TypeScript에서 'any' 타입의 명시적 사용을 허용
    '@typescript-eslint/no-explicit-any': 0,
  },

  // ESLint 규칙에서 사용할 추가적인 설정. 여기서는 React 버전을 자동으로 감지하도록 설정한다.
  settings: {
    react: {
      version: 'detect',
    },
  },

  // ESLint가 파일을 무시하도록 하는 패턴들이다.
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'webpack.*.js'],
};
```

### parser는 왜 필요할까?

TypeScript는 구문 분석기를 사용하여 TypeScript 소스 코드를 추상 구문 트리 (AST)로 변환한다. TypeScript AST는 ESLint에서 바로 사용될 수 없다. 따라서 `@typescript-eslint/parser`는 TypeScript AST를 ESLint가 이해할 수 있는 형식으로 변환한다. 이를 통해 일부 ESLint 규칙이 타입 정보를 기반으로 코드를 검사할 수 있다.

### project 옵션

ESLint의 parserOptions 섹션에서 project 옵션을 설정하면, `@typescript-eslint/parser`는 해당 `tsconfig.json` 파일을 사용하여 타입 정보를 가져온다. 이를 통해 타입 기반의 ESLint 규칙을 활용할 수 있게 된다.

## .prettierrc.js 파일 생성

이 파일 또한 루트 디렉토리에 생성한다. 파일명은 `.prettierrc.js` 또는 `.prettierrc`로 작성하면 된다.

```bash
$ touch .prettierrc.js
# 또는
$ touch .prettierrc
```

## .prettierrc.js 파일 작성

본인의 취향에 맞게 작성하면 된다!

```js
module.exports = {
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  singleQuote: true,
  arrowParens: 'avoid',
};
```

<br /><br />

> boilerPlate 코드는 [여기](https://github.com/CH4MD0M/webpack-react-ts-boilerplate)에서 확인할 수 있다.

<br />

---

# 참고

- [Webpack 공식 문서](https://webpack.js.org/)
- [ESLint 공식 문서](https://eslint.org/)
- [React + TypeScript + Webpack5 초기 설정](https://ryuhojin.tistory.com/19)
- [프론트엔드 개발환경의 이해: 웹팩(심화)](https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html)
