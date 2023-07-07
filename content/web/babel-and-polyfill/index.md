---
title: 'Babel과 Polyfill 정의 & 차이점'
category: web
date: 2023-04-01
tags:
  - babel
  - polyfill
---

우리가 웹 개발을 하다보면 한번쯤은 `Babel`과 `Polyfill`이라는 용어를 들어본 적이 있을 것이다. 필자도 대충 들어본 것 같긴한데 정확히 무엇인지는 잘 모르겠어서 정리해보려고 한다😁

이번 포스팅에서는 `Babel`과 `Polyfill`의 정의와 차이점에 대해 알아보도록 하자.

# Babel이란?

먼저 조금 더 익숙한 `Babel`에 대해 알아보자.

> Babel is a JavaScript compiler.

공식사이트에 따르면 Babel은 자바스크립트 컴파일러라고 한다.

### 왜 컴파일러라고 할까?🤔

궁금증이 생겼다. **컴파일러**는 소스코드를 입력받아서 그것을 기계어로 변환하는 프로그램이다. 그렇다면 Babel은 어떻게 컴파일러라고 할 수 있을까?

Babel은 엄밀히 말하면 트랜스파일러다. 그리고 컴파일이 트랜스파일보다 더 큰 개념이다.

따라서 Babel을 **'자바스크립트 컴파일러'**라고 하는 이유는 소스 코드를 다른 형태로 변환하는 **컴파일** 작업을 수행하기 때문이다. (이는 정통적인 컴파일의 역할과 다르므로 반대한다는 의견도 있다고 한다😅)

## Bebel의 정의

`Babel`은 자바스크립트의 새로운 문법을 사용할 수 있게 해주는 도구이다. 즉, `Babel`은 최신 자바스크립트 문법을 지원하지 않는 브라우저에서도 최신 자바스크립트 문법을 사용할 수 있게 해주는 도구이다.

## Babel은 왜 필요할까?

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

# Babel이랑 Polyfill은 무슨 차이일까?

필자는 처음에 "뭐야 둘다 브라우저가 지원하지 않는 걸 지원해준다는데 뭐가 다른거지?"라고 생각했다.(너무 똑똑한 질문이다🥲)

`Babel`은 브라우저가 이해하지 못하는 **문법**을 이해할 수 있게 변환해주는 역할을 하고, `polyfill`은 **브라우저가 지원하지 않는 기능**을 지원하는 코드를 제공해주는 역할을 한다.

즉, `Babel`은 주로 최신 자바스크립트 문법을 구형 브라우저에서 실행 가능한 ES5 코드로 변환하는 역할을 수행한다. 그러나 일부 기능은 문법 변환만으로는 완전히 해결할 수 없다. 이러한 경우를 `polyfill`이 처리한다.

### 새로운 문법

새로운 문법은 **Babel에 의해 컴파일될 수 있다.** 새로운 문법에는 다음과 같은 것들이 있다.

- arrow function
- class
- template literal
- const/let

### 새로운 객체, 메소드, 함수 등

이들은 **Babel에 의해 컴파일될 수 없고, polyfill이 필요하다.** 새로운 객체, 메소드, 속성 등은 다음과 같은 것들이 있다.

- 새로운 객체 (`Promise`, `Set`, `Map`, `WeakSet`, `WeakMap`)
- 새로운 메서드 (`Array.prototype.includes`, `Object.assign`,...)
- 새로운 함수 (`fetch`)

정리해보면 ES5의 `global namespace(window)`에 존재하지 않는 것은 Babel로 컴파일 하지 못한다. 즉, ES5 환경의 전역 객체에 존재하지 않는 객체, 메서드, 함수는 Babel이 컴파일해줄 수 가 없고 Polyfill이 필요하다.

> [여기](https://github.com/zloirock/core-js#features)에 polyfill이 필요한 기능들이 정리되어 있다. 이를 제외한 나머지 기능들은 Babel로 컴파일이 가능하다.

# Babel과 Polyfill의 적용 시점

Babel과 Polyfill이 무엇인지와 어떤 것들을 컴파일하는지 알아보았다. 이제 이 둘이 적용되는 시점에 대해서 알아보자.

### Babel

Babel은 주로 **빌드(build) 시점**에 코드를 변환한다. 이는 개발 환경이나 프로덕션 환경이든 상관없이 **코드를 실제로 브라우저에서 실행하기 전**에 트랜스파일링 과정을 거치게 된다는 의미다. 이는 주로 `Webpack`, `Rollup` 등의 모듈 번들러와 함께 사용되며, 빌드 프로세스의 일부로 자바스크립트 코드를 컴파일한다. 결과적으로, 배포된 코드는 Babel을 통해 컴파일된 버전이 되며, 이는 구 버전 브라우저에서도 동작하게 된다.

### Polyfill

polyfill **런타임(run-time) 시점**에 적용된다. 이는 코드가 실제로 브라우저에서 실행되는 시점에 적용된다는 것을 의미한다. polyfill이 브라우저가 이해하지 못하는 코드를 이해할 수 있게 해주는 것이기 때문에, 어찌보면 당연하다고 할 수 있다. 따라서 polyfill 웹사이트를 로드할 때(런타임에) 실행되며, 필요한 JavaScript 기능들을 브라우저에서 사용 가능하게 만든다.

> webpack에서 babel과 polyfill을 적용하는 방법은 [이 포스팅]()에서 다룬다.

<br />

---

# 참고

- [babel 이란 무엇인가?](https://bravenamme.github.io/2020/02/12/what-is-babel/)
- [컴파일과 폴리필의 차이점 분석 (babel, polyfill)
  ](https://happysisyphe.tistory.com/49)
