---
title: 'JavaScript: 프로미스(Promise)란?'
category: javascript
date: 2022-07-09
tags:
  - 프로미스
  - 비동기
---

# 프로미스

프로미스가 등장하기 전에는 콜백 함수를 사용해 비동기 작업을 처리했다. 예를 들어 `setTimeout()` 함수가 있다. 콜백 함수는 비동기 데이터를 다루는 좋은 방법이다. 하지만 전통적인 콜백 패턴은 비동기 함수 호출이 중첩되는 **콜백 헬**로 인해 가독성이 떨어지고 에러 처리가 어려우며, 여러 개의 비동기 작업을 한 번에 처리하는 데도 한계가 있다.

ES6에서는 비동기 처리를 위한 새로운 패턴으로 **프로미스(Promise)**를 도입했다. 프로미스는 콜백 패턴의 단점을 보완하며, 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다. 이제 비동기 처리 시에 발생하는 콜백 패턴의 단점에 대해 알아보자.

# 비동기 처리를 위한 콜백 패턴의 단점

## 콜백 헬(Callback Hell)

```js
// GET 요청을 위한 비동기 함수
const get = (url, successCallback, failureCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콜백 함수에 인수로 전달하면서 호출하여 응답에 대한 후속 처리를 한다.
      successCallback(JSON.parse(xhr.response));
    } else {
      // 에러 정보를 콜백 함수에 인수로 전달하면서 호출하여 에러 처리를 한다.
      failureCallback(xhr.status);
    }
  };
};

// 서버의 응답에 대한 후속 처리를 위한 콜백 함수를 비동기 함수인 get에 전달해야 한다.
get('https://jsonplaceholder.typicode.com/posts/1', console.log, console.error);
```

비동기 함수는 비동기 처리 결과를 외부로 반환할 수 없고, 상위 스코프의 변수에 할당할 수도 없다. 따라서 비동기 함수의 처리 결과(예: 서버 응답)에 대한 <u>후속 처리는 비동기 함수 내부에서 수행해야 한다.</u>이때 비동기 함수를 범용적으로 사용하기 위해, 비동기 함수에 비동기 처리 결과를 처리하는 콜백 함수를 전달하는 것이 일반적이다.

<br/>

콜백 함수를 통해 비동기 처리 결과에 대한 후속 처리를 수행하는 비동기 함수가 또 다른 비동기 함수를 호출해야 할 경우, 콜백 함수가 중첩되어 복잡도가 높아지는 현상이 발생한다. 이를 **콜백 헬(Callback Hell)**이라 한다.

```js
get('/step1', a => {
  get(`/step2/${a}`, b => {
    get(`/step3/${b}`, c => {
      get(`/step4/${c}`, d => {
        console.log(d);
      });
    });
  });
});
```

## 에러 처리의 어려움

```js
try {
  setTimeout(() => {
    throw new Error('Error!');
  }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error('캐치한 에러', e);
}
```

비동기 처리에서 콜백 패턴의 가장 큰 문제점은 <u>에러 처리가 곤란하다는 것</u>이다.
`setTimeout`은 비동기 함수이므로 콜백 함수가 호출되는 것을 기다리지 않고 즉시 종료되어 콜 스택에서 제거된다. 이후 타이머가 만료되면 setTimeout 함수의 콜백 함수는 태스크 큐로 푸시되고 콜 스택이 비어졌을 때 이벤트 루프에 의해 콜 스택으로 푸시되어 실행된다. <u>에러는 호출자 방향으로 전파된다(콜 스택의 아래 방향으로 전파된다).</u>

<br/>

`setTimeout` 함수의 콜백 함수를 호출하는 것은 `setTimeout` 함수 자체가 아니라 타이머 이벤트에 의해 실행된다. 따라서 `setTimeout` 함수의 콜백 함수에서 발생한 에러는 `try-catch` 블록에서 발생한 오류로 간주되지 않아 캐치되지 않는다. 이러한 비동기 처리에서 콜백 패턴의 문제점을 해결하기 위해 ES6에서 **프로미스(Promise)**가 도입되었다.

# 프로미스 생성 방법

Promise 생성자 함수를 `new` 연산자와 함께 호출하면 프로미스(Promise 객체)가 생성된다.

Promise 생성자 함수는 <u>비동기 처리를 수행할 콜백 함수를 인수로 전달받으며</u>, 이 콜백 함수는 `resolve`와 `reject` 함수를 인수로 받는다.

```js
const promise = new Promise((resolve, reject) => {
    // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
    if (/* 비동기 처리 성공 */) {
        resolve("result");
    } else {
        /* 비동기 처리 실패 */
        reject("failure reason");
    }
});
```

Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다. 이때 비동기 처리가 성공하면 콜 백함 수의 인수로 전달받은 `resolve` 함수를 호출하고, 비동기 처리가 실패하면 `reject` 함수를 호출한다.

## 프로미스의 3가지 상태

| 프로미스의 상태 정보 |                 의미                  |          상태 변경 조건          |
| :------------------: | :-----------------------------------: | :------------------------------: |
|     **pending**      | 비동기 처리가 아직 수행되지 않은 상태 | 프로미스가 생성된 직후 기본 상태 |
|    **fulfilled**     |    비동기 처리가 수행된 상태(성공)    |        resolve 함수 호출         |
|     **rejected**     |    비동기 처리가 수행된 상태(실패)    |         reject 함수 호출         |

<br/>

프로미스가 생성되면 기본적으로 `pending` 상태다. 이후 비동기 처리가 완료되면, 처리 결과에 따라 프로미스의 상태가 변경된다.

비동기 처리가 성공하면 resolve 함수를 호출하여 프로미스를 `fulfilled` 상태로 변경하고, 비동기 처리가 실패하면 reject 함수를 호출하여 프로미스를 `rejected` 상태로 변경한다.

<br/>

fulfilled 또는 rejected 상태를 `settled` 상태라고 한다. settled 상태는 pending 상태가 아닌, 비동기 처리가 완료된 상태를 의미한다. 프로미스는 `settled` 상태가 되면 더 이상 다른 상태로 변경되지 않는다. <u>프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.</u>

# 프로미스의 후속 처리 메서드

프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달된 콜백 함수가 선택적으로 호출된다.

## Promise.prototype.then

`then` 메서드는 두 개의 콜백 함수를 인수로 받는다.

첫 번째 콜백 함수는 프로미스가 `fulfilled` 상태가 되면 호출되며, 이때 프로미스의 비동기 처리 결과를 인수로 전달받는다. 두 번째 콜백 함수는 프로미스가 `rejected` 상태가 되면 호출되며, 이때 프로미스의 에러를 인수로 전달받는다.

<br/>

정리하자면, 첫 번째 콜백 함수는 비동기 처리가 성공했을 때 호출되는 함수이고, 두 번째 콜백 함수는 비동기 처리가 실패했을 때 호출되는 함수이다.

```js
// fulfilled
new Promise(resolve => resolve('fulfilled')).then(
  v => console.log(v),
  e => console.error(e),
); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected'))).then(
  v => console.log(v),
  e => console.error(e),
); // Error: rejected
```

`then` 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 `resolve` 또는 `reject` 하여 새로운 프로미스를 생성해 반환한다.

<u>then 메서드는 언제나 프로미스를 반환한다.</u>

## Promise.prototype.catch

`catch` 메서드는 한 개의 콜백 함수를 인수로 전달받는다. `catch` 메서드의 콜백 함수는 프로미스가 `rejected` 상태인 경우만 호출된다. <u>catch 메서드는 then 과 동일하게 언제나 프로미스를 반환한다.</u>

```js
// rejected
new Promise((_, reject) => reject(new Error('rejected'))).catch(e =>
  console.log(e),
); // Error: rejected
```

## Promise.prototype.finally

`finally` 메서드는 한 개의 콜백 함수를 인수로 전달받는다. `finally` 메서드의 콜백 함수는 프로미스의 성공 또는 실패와 상관없이 무조건 한 번 호출된다. `finally` 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용하다. <u>finally 메서드도 then / catch 메서드와 마찬가지로 언제나 프로미스를 반환한다.</u>

```js
new Promise(() => {}).finally(() => console.log('finally')); // finally
```

# 프로미스의 에러 처리

비동기 처리에서 발생한 에러는 `then` 메서드의 두 번째 콜백 함수로 처리할 수 있다. 단, `then` 메서드의 첫 번째 콜백 함수에서 발생한 에러를 캐치하지 못하고 코드의 가독성이 좋지 않다.

```js
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseGet(wrongUrl).then(
  res => console.log(res),
  err => console.error(err),
); // Error: 404
```

비동기 처리에서 발생한 에러는 프로미스의 `catch` 메서드를 사용해 처리할 수 있다. `catch` 메서드를 호출하면 내부적으로 `then(undefined, onRejected)`을 호출한다.

```js
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

promiseGet(wrongUrl)
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Error: 404
```

<br/>

`catch` 메서드를 모든 `then` 메서드 호출 후에 호출하면, <u>비동기 처리에서 발생한 에러뿐만 아니라 then 메서드 내부에서 발생한 에러도 모두 잡아낼 수 있다.</u>

```js
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res))
  .catch(err => console.error(err));
// TypeError: console.xxx is not a function
```

이 예제에서 `console.xxx(res)`는 존재하지 않는 메서드이기 때문에 에러를 발생시킨다. 이 에러는 `catch` 메서드에서 잡혀 처리된다.

# 프로미스 체이닝

```js
const url = 'https://jsonplaceholder.typicode.com';

promiseGet(`${url}/posts/1`)
  .then(({ userId }) => promiseGet(`${url}/users/${userId}`))
  .then(userInfo => console.log(userInfo))
  .catch(err => console.error(err));
```

`then`, `catch`, `finall` 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있다. 이를 **프로미스 체이닝(promise chaining)**이라 한다.

프로미스는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 비동기 처리를 위한 콜백 패턴에서 발생하던 콜백 헬이 발생하지 않는다. 다만 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아니다.

대신 ES8에서 도입된 `aysnc/await`을 사용하면 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스의 처리 결과를 반환받는 코드를 작성할 수 있다.

# 프로미스의 정적 메서드

프로미스는 주로 생성자 함수로 사용되지만 함수도 객체이므로 `메서드`를 가질 수 있다.

## Promise.resolve

`Promise.resolve`와 `Promise.reject` 메서드는 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.

`Promise.resolve` 메서드는 인수로 전달받은 값을 resolve 하는 프로미스를 생성한다.

```js
const resolvedPromise = Promise.resolve([1, 2, 3]);

// 아래 코드는 위와 동일하게 동작한다.
// const resolvedPromise = new Promise((resolve) => resolve([1, 2, 3]));

resolvedPromise.then(console.log); // [1, 2, 3]
```

## Promise.reject

`Promise.reject` 메서드는 인수로 전달받은 값을 reject 하는 프로미스를 생성한다.

```js
// 에러 객체를 reject하는 프로미스를 생성
const rejectedPromise = Promise.reject(new Error('Error!'));

// 아래 코드는 위와 동일하게 동작한다.
// const rejectedPromise = new Promise((_, reject) => reject(new Error("Error!")));

rejectedPromise.catch(console.log); // Error: Error!
```

## Promise.all

`Promise.all` 메서드는 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.

```js
const fetchData1 = () =>
  new Promise(resolve => setTimeout(() => resolve('Data 1'), 2000));
const fetchData2 = () =>
  new Promise(resolve => setTimeout(() => resolve('Data 2'), 1500));
const fetchData3 = () =>
  new Promise(resolve => setTimeout(() => resolve('Data 3'), 1000));

Promise.all([fetchData1(), fetchData2(), fetchData3()])
  .then(results => console.log(results)) // ['Data 1', 'Data 2', 'Data 3']
  .catch(error => console.error(error));
```

`Promise.all` 메서드는 전달받은 배열의 모든 프로미스가 `fulfilled` 상태가 되면, 그 결과들을 배열에 모아 새로운 프로미스를 반환한다. 이때, 모든 프로미스가 완료되기 전에는 종료되지 않으며 결과는 입력된 순서대로 배열에 저장된다(첫 번째 프로미스가 가장 나중에 `fulfilled` 상태가 되어도 첫 번째 프로미스가 `resolve`한 처리 결과부터 차례대로 저장한다). 즉, <u>처리 순서가 보장된다.</u>

`Promise.all` 메서드는 인수로 전달된 프로미스 중 하나라도 `rejected` 상태가 되면 즉시 종료하고 `rejected` 상태의 이유를 반환한다. 즉, 나머지 프로미스가 `fulfilled` 상태가 되는 것을 기다리지 않고 즉시 종료한다.

```js
Promise.all([
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error A')), 2000),
  ),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error B')), 1000),
  ),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error C')), 500),
  ),
])
  .then(results => console.log(results))
  .catch(error => console.error(error)); // Error: Error C
```

프로미스가 아닌 값도 `Promise.all`에 전달될 수 있으며, 이 경우 `Promise.resolve`를 통해 프로미스로 래핑된다. 이로 인해 모든 값이 프로미스 형태로 처리된다.

```js
Promise.all([
  Promise.resolve('A'),
  'B', // => Promise.resolve('B')
  Promise.resolve('C'),
])
  .then(results => console.log(results)) // ['A', 'B', 'C']
  .catch(error => console.error(error));
```

## Promise.race

`Promise.race` 메서드는 `Promise.all` 메서드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다.

`Promise.race`는 모든 프로미스가 `fulfilled` 상태가 되는 것을 기다리지 않고, 가장 먼저 `fulfilled` 상태가 된 프로미스의 결과를 `resolve` 하는 새로운 프로미스를 반환한다.

```js
const fetchFastData1 = () =>
  new Promise(resolve => setTimeout(() => resolve('Fast Data 1'), 3000));
const fetchFastData2 = () =>
  new Promise(resolve => setTimeout(() => resolve('Fast Data 2'), 2000));
const fetchFastData3 = () =>
  new Promise(resolve => setTimeout(() => resolve('Fast Data 3'), 1000));

Promise.race([fetchFastData1(), fetchFastData2(), fetchFastData3()])
  .then(result => console.log(result)) // 'Fast Data 3'
  .catch(error => console.error(error));
```

프로미스가 하나라도 `rejected` 상태가 되면 `Promise.all` 메서드와 동일하게 에러를 `reject` 하는 새로운 프로미스를 즉시 반환한다.

```js
Promise.race([
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error A')), 3000),
  ),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error B')), 2000),
  ),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error C')), 1000),
  ),
])
  .then(result => console.log(result))
  .catch(error => console.error(error)); // Error: Error C
```

`Promise.race`는 첫 번째로 `fulfilled` 또는 `rejected` 상태가 된 프로미스의 결과에 따라 동작하기 때문에, <u>전체 결과를 기다릴 필요가 없을 때 유용하다.</u>

## Promise.allSettled

`Promise.allSettled` 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 받으며, 전달받은 모든 프로미스가 `settled` 상태가 되면 그 결과를 배열로 반환한다.

이 메서드는 프로미스의 <u>상태(fulfilled 또는 rejected)와 상관없이 모든 프로미스의 결과를 포함한다.</u>

```js
Promise.allSettled([
  new Promise(resolve => setTimeout(() => resolve('Result 1'), 2000)),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error 1')), 1000),
  ),
  new Promise(resolve => setTimeout(() => resolve('Result 2'), 1500)),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Error 2')), 500),
  ),
]).then(results => console.log(results));
/*
[
  {status: "fulfilled", value: "Result 1"},
  {status: "rejected", reason: Error: Error 1 at <anonymous>:4:29},
  {status: "fulfilled", value: "Result 2"},
  {status: "rejected", reason: Error: Error 2 at <anonymous>:4:29}
]
*/
```

이 예제에서는 네 개의 프로미스가 `Promise.allSettled` 메서드에 전달되며, 각 프로미스가 완료된 후의 상태와 결과가 배열로 반환된다. `fulfilled` 상태인 경우, 결과는 `value` 프로퍼티로 나타내고, `rejected` 상태인 경우, 에러는 `reason` 프로퍼티로 나타난다.

`Promise.allSettled` 메서드는 모든 프로미스의 완료 여부에 관심이 있는 경우에 유용하다. 예를 들어, 모든 작업의 상태를 한 번에 확인하거나, 일부 실패에도 불구하고 모든 작업의 결과를 처리하고자 할 때 사용될 수 있다.

<br/>

# 참고

- 모던 자바스크립트 Deep Dive
- [poiemaweb](https://poiemaweb.com/)
- [자바스크립트 Promise 쉽게 이해하기](https://joshua1988.github.io/web-development/javascript/promise-for-beginners/)
- [MDN - Promise](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [javascript.info - 프라미스](https://ko.javascript.info/promise-basics)
