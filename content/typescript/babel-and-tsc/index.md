---
title: babel과 tsc
category: typescript
date: 2023-10-21
tags:
  - tsc
  - babel
---

# 들어가며

[이 포스팅](https://chamdom.blog/webpack-react-setting-4/)에서 설정에 대한 자세한 설명이 없었는데, 이번 포스팅에서 babel과 tsc의 역할, 설정 파일에 대해 좀 더 자세히 살펴보자.

# tsc와 babel의 역할

`TypeScript Compiler(tsc)`와 `babel` 둘 다 컴파일러의 역할을 하는데 어떤 것을 사용해야 할지 헷갈릴 수 있다. 이 둘의 역할을 간단하게 정리하면 다음과 같다.

### tsc(TypeScript Compiler)

- tsc는 TypeScript 코드를 JavaScript 코드로 변환하며, 동시에 타입 검사도 수행한다.
- TypeScript는 기본적으로 최신 ECMAScript 표준을 따르기 때문에 tsc는 최신 JavaScript 기능을 포함한 TypeScript 코드를 이전 버전의 JavaScript로도 변환할 수 있다.

### babel

- `babel`은 JavaScript 컴파일러로, 주로 최신 ECMAScript 표준의 코드를 호환성 있는 이전 버전의 JavaScript로 변환(트랜스파일)하는데 사용된다.
- `babel`은 플러그인 시스템을 가지고 있어, 다양한 변환을 사용자 정의할 수 있다. 예를 들어, React JSX 문법이나 TypeScript 코드도 적절한 플러그인 또는 프리셋을 사용하면 JavaScript로 변환할 수 있다.
- 그러나 `babel` 자체는 TypeScript의 타입 시스템을 이해하지 못하므로, **타입 검사를 수행할 수 없다.**

# 어떤 것을 컴파일러로 사용할까?

위 설명을 보면 tsc와 babel(프리셋을 사용하면) 모두 타입스크립트를 이해하고 자바스크립트로 변환할 수 있다. 그렇다면 둘 중 어떤 것을 사용해야 할까?

두 컴파일러를 모두 사용하는 것은 비효율적이다. 거의 유사한 작업을 수행하기 때문에 두 컴파일러를 모두 사용하면 빌드 시간이 길어지게 되고, 트랜스파일링 결과에 미세한 차이가 있을 수 있다. 따라서 역할을 분리하여 사용하는 것이 좋다. 따라서 **`tsc`는 타입 검사를 수행하고, `babel`은 트랜스파일링을 수행하도록 설정한다.**

### 왜 babel을 트랜스파일링 역할만 하도록 설정할까?

babel은 JavaScript 코드를 변환할 때 TypeScript의 타입 선언이 무시되고 타입 정보가 제거된다. 따라서 **빠르게 트랜스파일링 할 수 있다.** 그리고 babel은 플러그인 시스템을 가지고 있어, 다양한 변환을 사용자 정의할 수 있다. 예를 들어, React JSX 문법이나 TypeScript 코드도 적절한 플러그인 또는 프리셋을 사용하면 JavaScript로 변환할 수 있다.

# 설정 파일에 대한 설명

이전에 설정했던 babel 설정 파일과 tsconfig 파일을 같이 살펴보자.

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "jsx": "preserve",
    "noEmit": true,
    "isolatedModules": true
  }
  // ...
}
```

### "jsx": "preserve"

이 옵션은 TypeScript 컴파일러에게 JSX 코드를 그대로 보존하도록 지시한다. 즉, JSX를 변환 작업을 tsc가 처리하지 않고 Babel로 넘기는 것이다. 이 설정은 babel이 JSX를 처리할 수 있도록 하기 위해 필요하다.

### "noEmit": true

이 옵션은 TypeScript 컴파일러에게 코드를 트랜스파일하거나 타입 선언 파일을 생성하지 말라고 지시한다. 즉, tsc는 타입 체킹만을 수행하고, 실제 코드의 변환은 babel에게 맡기는 것이다.

### "isolatedModules": true

이 옵션은 TypeScript 컴파일러에게 각 파일을 모듈로 취급하라고 지시한다. 즉, 각 파일을 모듈로 취급하면 파일 간의 의존성을 추적할 수 있고, 이를 통해 더 빠른 타입 체킹을 수행할 수 있다.

```json
// babel.config.json
{
  "presets": [
    // ...
    ["@babel/preset-react", { "runtime": "automatic" }],
    ["@babel/preset-typescript", { "isTSX": true, "allExtensions": true }]
  ]
}
```

### @babel/preset-typescript

`{"isTSX": true, "allExtensions": true}` 옵션은 babel에게 .tsx 파일과 .ts 파일 모두에서 JSX 구문을 올바르게 파싱하도록 지시한다. 이것은 위에서 설정한 `"jsx": "preserve"`와 연관되어 있어 babel이 JSX를 처리할 수 있도록 하는 설정이다.

### @babel/preset-react

`@babel/preset-typescript`에서 파싱한 JSX 구문의 처리는 `@babel/preset-react`에서 이루어진다. `{"runtime": "automatic"}` 설정은 새로운 JSX 변환을 활성화하여 `import React from 'react';` 구문 없이 JSX를 사용할 수 있도록 한다.

<br />

---

# 참고

- [TSConfig Option: isolatedModules](https://www.typescriptlang.org/tsconfig#isolatedModules)
- [{ tsconfig.json } 제대로 알고 사용하기](https://velog.io/@sooran/tsconfig.json-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
- [Babel vs tsc](https://cloudless.blog/post/babel-vs-tsc)
- [Using Babel with TypeScript](https://www.typescriptlang.org/ko/docs/handbook/babel-with-typescript.html)
