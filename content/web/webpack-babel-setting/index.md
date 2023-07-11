---
title: 'webpack에서 babel 설정하기'
category: web
date: 2023-07-08
tags:
  - babel
  - webpack
---

# 들어가며

[이 포스팅](https://chamdom.blog/webpack-react-setting/)에서 react를 webpack으로 구성하는 방법을 다뤘는데 각 설정에 대해 자세히 다루지 않았다. 이번 포스팅에서는 webpack에서 babel을 설정하는 방법에 대해 알아보도록 하자.

> `webpack`에 대한 설명 [여기](https://chamdom.blog/what-is-webpack/)에서 확인할 수 있고, <br/> `Babel`과 `polyfill`에 대한 설명은 [여기](https://chamdom.blog/webpack-react-setting/)에서 확인할 수 있다.

babel 설정 파일을 다음과 같이 작성했다. 하나씩 살펴보자.

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

# 설치되는 패키지 설명

설치되는 패키지에 대해 간단하게 설명하자면 다음과 같다.

`babel-loader` <br/>
웹팩(webpack)에서 Babel을 사용할 수 있게 해주는 로더(loader)다. 이 로더는 Babel을 사용하여 JavaScript 파일을 변환하는 역할을 하며, Babel이 제공하는 모든 기능을 사용할 수 있다.

`@babel/core` <br/>
Babel의 핵심 패키지다. 코드 변환 작업을 실제로 처리하는 역할을 담당한다. 플러그인과 프리셋을 사용하여 JavaScript 코드를 구문 분석하고 변환하는 역할을 한다.

`@babel/preset-env` <br/>
최신 JavaScript 문법과 기능을 사용하면서 특정 환경을 대상으로 설정할 수 있는 Babel 프리셋이다. 이 프리셋은 대상 환경(브라우저, Node.js 버전 등)에 따라 필요한 플러그인을 자동으로 결정한다.

`@babel/preset-react` <br/>
React를 사용할 때 필요한 Babel 플러그인을 모아놓은 프리셋이다.

`@babel/preset-typescript` <br/>
TypeScript를 사용할 때 필요한 Babel 플러그인을 모아놓은 프리셋이다.

# 설치한 패키지들의 역할

`babel-loader`, `babel-core`, `presets`, `plugins`가 어떤 역할을 하는지 알아보기 위해 babel의 동작 과정에 대해 알아보자.

### Babel의 동작 과정

**1. babel-loader 실행:** 웹팩에서 Babel Loader를 구성하면 JavaScript 파일이 웹팩의 로더 파이프라인에 통과하면서 babel-core에 전달된다.

**2. 코드 입력:** Babel은 컴파일할 Java₩cript 코드를 입력으로 받는다.

**3. 구문 분석 (Parsing):** Babel은 코드를 구문 분석하여 `AST(Abstract Syntax Tree)`로 변환한다. AST는 코드의 추상적인 구조를 나타내는 트리 형태의 데이터 구조다.

**4. 플러그인 적용:** Babel은 구문 분석된 AST에 사용자가 지정한 플러그인을 적용한다. 플러그인은 AST를 조작하거나 변환하는 로직을 가지고 있으며, 특정 기능을 지원하거나 문법을 변환하는 역할을 한다.

**5. 변환 (Transformation):** 플러그인이 적용된 AST를 기반으로 Babel은 코드를 변환한다. 이 변환 단계에서는 새로운 문법을 구형 브라우저에서도 동작하는 ES5 코드로 변환하거나, 특정 기능을 polyfill로 대체하는 등의 작업이 수행된다.

**6. 코드 생성 (Code Generation):** 변환된 AST를 다시 JavaScript 코드로 생성한다. 이 단계에서 Babel은 AST를 순회하며 JavaScript 코드를 생성하고, 최종 변환된 코드를 출력한다.

**7. 변환된 코드 출력:** Babel은 최종적으로 변환된 코드를 출력한다. 출력은 일반적으로 파일로 저장되거나, 브라우저에서 동적으로 실행될 수 있다.

정리하자면, Webpack에서 `Babel Loader`를 사용하여 JavaScript 파일을 가져오면 Babel Loader는 Babel Core에 해당 파일을 전달하고, `Babel Core`는 플러그인과 프리셋(`Babel Preset`)을 사용하여 코드를 변환하고 최종 결과를 생성한다.

# Presets, Pulgins

babel 설정 파일을 보면 다음과 같이 크게 `presets`, `plugins`로 나누어져 있다.

```json
// babel.config.json
{
  "presets": [],
  "plugins": []
}
```

## presets랑 pulgins는 뭐가 다른거지?🤔

아래는 presets에 대한 [공식 문서](https://babeljs.io/docs/presets)의 설명이다.

> Babel presets can act as sharable set of Babel plugins and/or config options.

`preset`는 `plugin`를 묶어놓은 것이라고 하는데, 그럼 `presets`만 설정하면 되는거 아닌가? 라는 의문이 생겼다. 이 의문에 대한 답은 다음과 같다!

**Presets**는 특정 Babel 플러그인의 모음이다. 즉, `presets`는 미리 정의된 플러그인 집합을 한 번에 적용하려고 할 때 사용된다.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**Plugins**는 변환을 수행하는 개별 JavaScript 기능이다. 예를 들어, 특정 JavaScript 기능이 presets에 포함되어 있지 않거나 최신 버전의 ECMAScript를 사용하는 경우 또는 특정 기능만을 사용하고 싶은 경우에 사용된다. 즉, `plugins`는 더 세부적이고 구체적인 변환을 처리해야 할 때 유용하다.

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

너무 많은 plugins를 추가하면 빌드 성능이 저하되거나 충돌이 발생할 수 있으므로, 필요한 만큼만 사용하는 것이 좋다.

## Babel의 plugins과 presets의 순서

> Babel의 plugins은 presets보다 먼저 적용된다.

Babel의 plugins과 presets에는 적용되는 순서가 존재한다. 왜 plugins가 먼저 적용될까? 이는 사용자가 정의한 플러그인이 프리셋에 포함된 플러그인보다 우선시되기 때문이라고 하는데🤔 (정확한 이유를 찾지 못했다..🥲)

<br/>

> Babel presets와 plugins 내부에서도 순서가 존재한다.

Babel presets와 plugins의 실행되는 순서도 존재하지만 각각 내부에서도 순서가 존재한다. Babel plugins과 presets를 선언하는 순서는 개발자가 원하는 동작과 사용하고 있는 플러그인과 프리셋의 특성에 따라 달라질 수 있지만, 일반적인 가이드라인은 존재한다. 다음 예제를 보자.

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

### plugins

```json
{
  "plugins": ["transform-decorators-legacy", "transform-class-properties"]
}
```

**plugins는 배열에 넣은 순서대로 실행된다.** 위와 같이 설정하면 `arrow-functions`이 먼저 실행되고 `block-scoping`이 실행된다.

**의존성이 있는 플러그인을 사용하는 경우, 의존성이 있는 플러그인을 먼저 실행하도록 설정해야 한다.** 위 코드로 예시를 들자면, 데코레이터는 해당 행동을 클래스 또는 클래스 프로퍼티에 "데코레이션"하기 전에 먼저 처리되어야 한다. 따라서 데코레이터를 처리하는 플러그인인 `transform-decorators-legacy`가 클래스 프로퍼티를 처리하는 플러그인인 `transform-class-properties`보다 먼저 실행되어야 한다.

### presets

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**presets는 순서가 반대로 실행된다.** 위와 같이 설정하면 `preset-react`가 먼저 실행되고 `preset-env`가 실행된다.

**더 구체적인 변환을 수행하는 프리셋을 다른 프리셋보다 뒤에 위치시켜야 한다.** 위 코드로 예시를 들자면, `@babel/preset-env`와 `@babel/preset-react`를 함께 사용하는 경우, 먼저 `@babel/preset-react`를 실행하여 JSX를 변환한 후에, `@babel/preset-env`를 사용하여 그 외의 ES6+ 코드를 변환하는 것이 좋다.

# 마치며

역시 설정 파일은 단순해 보이지만 깊게 들어가면 복잡하다.😅 이번 포스팅에서는 babel 설정 파일에 대해 알아보았다. 다음 포스팅에서는 polyfill 설정에 대해 알아보도록 하자.

<br />

---

# 참고

- [Difference between plugins and presets in .babelrc](https://stackoverflow.com/questions/45943889/difference-between-plugins-and-presets-in-babelrc)
- [Babel-Plugin Ordering](https://babeljs.io/docs/plugins/#plugin-ordering)
