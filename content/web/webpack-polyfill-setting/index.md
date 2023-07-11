---
title: 'webpack에서 polyfill 설정하기'
category: web
date: 2023-07-09
tags:
  - babel
  - polyfill
  - webpack
---

# 들어가며

[이 포스팅](https://chamdom.blog/webpack-babel-setting/)에 이어서 이번 포스팅에서는 webpack에서 polyfill을 설정하는 방법에 대해 알아보도록 하자.

> `webpack`에 대한 설명 [여기](https://chamdom.blog/what-is-webpack/)에서 확인할 수 있고, <br/> `Babel`과 `polyfill`에 대한 설명은 [여기](https://chamdom.blog/webpack-react-setting/)에서 확인할 수 있다.

# Polyfill 설정

> Babel v7.4.0부터 @babel/polyfill 패키지는 사용되지 않습니다. 대신 ECMAScript 기능을 대체하는 core-js/stable, 제너레이터 함수 기능을 대체하는 regenerator-runtime/runtime을 사용합니다.

`@babel/polyfill`은 `core-js`로 대체되었다. 이제는 @babel/preset-env와 core-js를 함께 사용하여 필요한 폴리필을 동적으로 가져오고, 대상 환경에 맞게 트랜스파일링하여 애플리케이션의 호환성을 유지할 수 있다.

## @babel/preset-env

```bash
$ yarn add -D @babel/preset-env
$ yarn add core-js@3
```

설치가 완료되면 `babel.config.json`을 다음과 같이 수정한다.

```json
// babel.config.json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ]
}
```

### useBuiltIns

useBuiltIns 옵션은 다음 세 가지 값을 가질 수 있다.

**false** <br/>
이 값은 @babel/preset-env가 폴리필을 자동으로 추가하지 않도록 한다. 이 경우, 필요한 폴리필을 직접 import해야 한다.

```js
// index.js (or your entry point)
import 'core-js/features/array/flat';
import 'core-js/features/promise';
```

**entry** <br/>
이 값을 설정하면, `import 'core-js';`와 `import 'regenerator-runtime/runtime';`를 소스 코드(entry point)에 추가해야 한다. 그러면 Babel이 필요한 폴리필을 자동으로 추가해준다.

```js
// index.js (or your entry point)
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// ////////////////
// Output
import 'core-js/modules/es.array.unscopables.flat';
import 'core-js/modules/es.array.unscopables.flat-map';
import 'core-js/modules/es.object.from-entries';
import 'core-js/modules/web.immediate';
```

**usage** <br/>
이 값이 가장 권장되는 방식dl다. 이 설정을 사용하면, Babel이 코드를 분석하여 필요한 폴리필만 자동으로 추가해준다. 이 경우, 소스 코드에 별도로 import를 추가할 필요가 없다.

```js
const set = new Set([1, 2, 3]);
[1, 2, 3].includes(2);

// ////////////////
// Output
import 'core-js/modules/es.array.includes';
import 'core-js/modules/es.array.iterator';
import 'core-js/modules/es.object.to-string';
import 'core-js/modules/es.set';

const set = new Set([1, 2, 3]);
[1, 2, 3].includes(2);
```

### 문제점

위 방법에는 한 가지 문제가 있다. 바로 **전역 오염(global pollution)**이 발생한다는 것이다.

먼저, 아래와 같이 `Promise`를 사용하는 간단한 원래의 코드를 살펴보자.

```js
// Original ES6+ code
const promise = new Promise((resolve, reject) => {
  resolve('Babel is awesome!');
});

promise.then(msg => console.log(msg));
```

@babel/preset-env와 core-js 폴리필을 사용하면 위의 코드는 다음과 같이 트랜스파일링된다.

```js
// Transpiled ES5 code
require('core-js/modules/es.promise');
require('core-js/modules/es.string.iterator');

var promise = new Promise(function (resolve, reject) {
  resolve('Babel is awesome!');
});

promise.then(function (msg) {
  return console.log(msg);
});
```

위의 코드에서 Promise 폴리필이 적용되면서 원래의 Promise 생성자가 폴리필로 대체되었다. 이것은 글로벌 객체인 Promise에 대한 참조를 모두 변경한다. 이를 **전역 오염**이라 하고, 이는 라이브러리나 프레임워크가 Promise 생성자를 사용하고 있을 경우, 예상하지 못한 결과를 초래할 수 있다.

## @babel/plugin-transform-runtime

전역 오염이 되는 것을 방지하기 위해 `@babel/plugin-transform-runtime`을 사용한다. 이 플러그인은 Babel이 변환하는 모든 코드에 대해 내장 함수와 객체의 동일한 복사본을 재사용하고, 이를 통해 코드 크기를 줄이는 동시에 전역 스코프의 오염을 방지한다.

위 Promise 예제를 `@babel/plugin-transform-runtime`을 사용하여 트랜스파일링하면 다음과 같다.

```js
// Transpiled ES5 code
var _promise = require('core-js-pure/features/promise');

var promise = new _promise(function (resolve, reject) {
  resolve('Babel is awesome!');
});

promise.then(function (msg) {
  return console.log(msg);
});
```

이 플러그인은 `core-js-pure`를 사용한다. core-js-pure는 core-js의 **모듈 버전**으로, 이는 전역 객체를 수정하지 않는다. 대신, 필요한 polyfill을 직접 import하는 방식으로 사용한다.

위의 코드에서 볼 수 있듯이, Promise의 polyfill은 `core-js-pure/features/promise`에서 import 된다. 따라서 Promise가 지원되지 않는 환경에서도 코드가 작동하며, 전역 Promise를 수정하지 않기 때문에 전역 오염을 방지할 수 있는 것이다.

```bash
$ yarn add @babel/runtime-corejs3
$ yarn add -D @babel/plugin-transform-runtime
```

`babel.config.json`을 다음과 같이 설정하면 된다.

```json
{
  // ...
  "plugins": [["@babel/plugin-transform-runtime", { "corejs": 3 }]]
}
```

# 마치며

babel 설정에 이어 polyfill 설정하는 방법까지 알아보았다. 확실히 브라우저 호환성을 위해서 많은 노력이 있음을 알 수 있었다.

<br />

---

# 참고

- [core-js란? (바벨에서 폴리필을 다루는 방식의 변화)](https://simsimjae.medium.com/%EA%B0%9C%EB%B0%9C%EC%9D%84-%ED%95%98%EB%8B%A4%EB%B3%B4%EB%8B%88-%EC%9D%B4%EB%9F%B0-%EC%97%90%EB%9F%AC%EA%B0%80-%EC%83%9D%EA%B2%A8%EC%84%9C-%EC%9B%90%EC%9D%B8%EC%9D%84-%EC%B0%BE%EB%8B%A4%EA%B0%80-%ED%8F%B4%EB%A6%AC%ED%95%84-%EB%AC%B8%EC%A0%9C%EB%9D%BC%EB%8A%94%EA%B1%B8-%EA%B9%A8%EB%8B%AB%EA%B3%A0-%EC%A0%95%EB%A6%AC%ED%95%A9%EB%8B%88%EB%8B%A4-217a207f8181)
- [Poiemaweb-@babel/plugin-transform-runtime을 사용해 폴리필 추가하기](https://poiemaweb.com/babel-polyfill)
- [Babel7과 corejs3 설정으로 전역 오염 없는 폴리필 사용하기](https://tech.kakao.com/2020/12/01/frontend-growth-02/)
- [babel/polyfill is deprecated warning in create-react-app](https://stackoverflow.com/questions/61551044/babel-polyfill-is-deprecated-warning-in-create-react-app)
