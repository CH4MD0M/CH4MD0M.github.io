---
title: 바벨(Babel)과 폴리필(Polyfill)
category: web
date: 2023-04-04
tags:
  - babel
  - polyfill
---

우리가 웹 개발을 하다보면 한번쯤은 `Babel`과 `Polyfill`이라는 용어를 들어본 적이 있을 것이다. 필자도 들어본 것 같긴한데 정확히 무엇인지는 모르겠어서 정리해보려고 한다.😁

이번 포스팅에서는 `Babel`과 `Polyfill`의 정의와 각각의 역할에 대해 알아볼 것이다.

# Babel이란?

먼저 조금 더 익숙한 `Babel`에 대해 알아보자.

`Babel`은 자바스크립트의 새로운 문법을 사용할 수 있게 해주는 도구이다. 즉, `Babel`은 최신 자바스크립트 문법을 지원하지 않는 브라우저에서도 최신 자바스크립트 문법을 사용할 수 있게 해주는 도구이다.

### 왜 컴파일러라고 할까?🤔

공식사이트에 따르면 Babel은 자바스크립트 컴파일러라고 한다.

> Babel is a JavaScript compiler.

필자는 여기서 저수준의 언어로 변환하는 것이 컴파일이라고 하는 것 아닌가? 바벨은 자바스크립트를 자바스크립트로 변환하는 것이 아닌가? 그렇다면 바벨은 컴파일러라고 할 수 있을까? 라는 의문이 생겼다. 하지만 정확한 개념을 알고있지 못해서 생긴 의문이었고 혹시나 필자처럼 생각하는 사람이 있을 수 있기 때문에 기록을 남기려고 한다.😁

한 언어로 작성된 소스 코드를 다른 언어로 변환하는 것을 **컴파일**이라고 한다. **트랜스파일** 컴파일의 한 종류로, 한 언어로 작성된 소스 코드를 비슷한 수준의 추상화를 가진 다른 언어로 변환하는 것을 말한다.

즉, **추상화 수준이 비슷한 언어로 컴파일하는 것을 특별히 트랜스파일이라고 부른다고 보면 된다.**

따라서 Babel은 엄밀히 말하면 트랜스파일러지만, 위와 같은 이유로 자바스크립트 컴파일러라고 부른다.

### Babel은 왜 필요할까?

그렇다면 왜 `Babel`이 필요할까? 프론트엔드 기술은 빠르게 발전하고 있다. 그리고 ECMAScript는 매년 새로운 자바스크립트 문법을 추가하고 있다. 이렇게 새로운 문법이 추가되면서 브라우저는 새로운 문법을 지원하지 못하는 경우가 생긴다. 이런 경우에 `Babel`을 사용하면 새로운 문법을 사용할 수 있다.

예를 들어, ES6에서 도입된 `arrow function`나 `class` 같은 문법을 일반 함수나 프로토 타입을 이용한 함수로 변환해주는 역할을 한다.

```js
// ES6 문법
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hello, ${this.name}!`);
  }
}

const person = new Person('John');
person.sayHello();
```

```js
// Babel 변환 후
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log('Hello, ' + this.name + '!');
};

var person = new Person('John');
person.sayHello();
```

# Polyfill이란?

mdn에서는 `polyfill`을 다음과 같이 정의하고 있다.

> polyfill은 기본적으로 지원하지 않는 이전 브라우저에서 최신 기능을 제공하는 데 필요한 코드 (일반적으로 웹의 JavaScript)입니다.

`polyfill`은 우선 브라우저에서 지원되는 JavaScript 기능을 확인한다. 브라우저가 특정 기능을 지원하지 않는 경우, 해당 기능을 제공하는 코드를 추가적으로 제공하여 브라우저가 해당 기능을 **"이해"**할 수 있게 만든다.

예를 들어, `Promise`는 ES6에서 도입된 기능이지만, ES6를 완벽하게 지원하지 않는 구버전 브라우저에서는 이 기능을 사용할 수 없다. 이런 경우, `polyfill`을 구버전 브라우저에서도 사용할 수 있도록 `Promise`를 구현한다. 아래 코드를 보자.

```js
// Promise를 사용하는 코드
var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve('Success');
  }, 2000);
});

promise
  .then(function (result) {
    console.log(result);
  })
  .catch(function (error) {
    console.error(error);
  });
```

만약 구버전 브라우저에서 위 코드를 실행하면 `Promise`가 정의되지 않았다는 오류가 발생한다. 이런 경우 `polyfill`은 다음과 같이`Promise`를 구현한다.

```js
// Promise 폴리필
if (!window.Promise) {
  window.Promise = function (executor) {
    var self = this;
    self.onResolve = null;
    self.onReject = null;

    function resolve(value) {
      if (self.onResolve) {
        self.onResolve(value);
      }
    }

    function reject(reason) {
      if (self.onReject) {
        self.onReject(reason);
      }
    }

    executor(resolve, reject);
  };
}
```

# Babel과 Polyfill은 각각 어떤 역할을 할까?

`babel`은 브라우저가 이해하지 못하는 **새로운 문법(최신 자바스크립트 문법)**을 이해할 수 있게 변환해주는 역할을 하고, `polyfill`은 **브라우저가 지원하지 않는 기능**을 지원하는 코드를 제공해주는 역할을 한다

**새로운 문법은 babel에 의해 컴파일될 수 있다.** 새로운 문법에는 다음과 같은 것들이 있다.

- arrow function
- class
- template literal
- const/let

babel에 의해 컴파일될 수 없고, polyfill이 필요한 것은 다음과 같다. 이들은 브라우저가 지원하지 않는 기능, 즉 ES5의 `global namespace(window)`에 존재하지 않는 것들이다.

- 새로운 객체 (`Promise`, `Set`, `Map`, ...)
- 새로운 메서드 (`Array.prototype.includes`, `Object.assign`,...)
- 새로운 함수 (`fetch`, ...)

정리해보면 ES6 이상의 새로운 문법은 babel에 의해 컴파일될 수 있지만, ES5의 `global namespace(window)`에 존재하지 않는 것은 polyfill이 필요하다.

> [여기](https://github.com/zloirock/core-js#features)에 polyfill이 필요한 기능들이 정리되어 있다. 이를 제외한 나머지 기능들은 Babel로 컴파일이 가능하다.

<br /><br />

> webpack 설정 과정은 [Webpack + React + TypeScript Boilerplate](https://chamdom.blog/webpack-react-setting/)에서 확인할 수 있다.

> Babel의 적용 방법과 원리에 대한 내용은 [Babel 적용하며 이해하기(with. React, TS)](https://chamdom.blog/webpack-babel-setting/)에서 확인할 수 있다.

> Polyfill의 적용 방법은 [Polyfill 적용하며 이해하기(with. React, TS)](https://chamdom.blog/webpack-polyfill-setting/)에서 확인할 수 있다.

<br />

---

# 참고

- [컴파일 / 트랜스파일 / 인터프리터 비교 쉽게 설명](https://inpa.tistory.com/entry/CS-%F0%9F%96%A5%EF%B8%8F-%EC%BB%B4%ED%8C%8C%EC%9D%BC-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8C%8C%EC%9D%BC-%EC%9D%B8%ED%84%B0%ED%94%84%EB%A6%AC%ED%84%B0-%EB%B9%84%EA%B5%90-%EC%89%BD%EA%B2%8C-%EC%84%A4%EB%AA%85)
- [babel 이란 무엇인가?](https://bravenamme.github.io/2020/02/12/what-is-babel/)
- [컴파일과 폴리필의 차이점 분석 (babel, polyfill)](https://happysisyphe.tistory.com/49)
- [Compiling vs Polyfills with Babel (JavaScript)](https://ui.dev/compiling-polyfills)
