---
title: 'JavaScript: Rest 파라미터, Spread 문법'
category: javascript
date: 2022-06-06
tags:
  - rest parameters
  - spread
---

# Rest 파라미터

**Rest 파라미터**는 매개변수 이름 앞에 세개의 점(`…`)을 붙여서 정의한 매개변수를 말한다. **Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받는다.**

```js
function foo(...rest) {
  console.log(rest); // [1, 2, 3, 4, 5];
}

foo(1, 2, 3, 4, 5);
```

Rest 파라미터는 일반 매개변수와 함께 사용할 수 있다. 이때 **Rest 파라미터는 반드시 마지막 파라미터이어야 한다.**

```js
function foo(param1, param2, ...rest) {
  console.log(param1); // 1
  console.log(param2); // 2
  console.log(rest); // [3, 4, 5]
}

foo(1, 2, 3, 4, 5);
```

Rest 파라미터는 단 하나만 선언할 수 있다.

```js
function foo(...rest1, ...rest2) {}

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

Rest 파라미터는 함수 정의 시 선언한 매개변수의 개수를 나타내는 length 프로퍼티에 영향을 주지 않는다.

```js
function foo(x, y, ...rest) {}
console.log(foo.length); // 2
```

### Rest 파라미터와 arguments 객체

arguments 객체는 유사 배열 객치므로 배열 메서드를 사용하려면 `Function.prototype.call`이나 `Function.prototype.apply` 메서드를 사용해 배열로 변환해야 하는 번거로움이 있었다.

```js
function sum() {
  // 유사 배열 객체인 arguments 객체를 배열로 변환한다.
  var array = Array.prototype.slice.call(arguments);

  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

Rest 파라미터는 인수 목록을 배열로 직접 전달받기 때문에 arguments객체를 배열로 변환하는 번거로움을 피할 수 있다.

```js
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
```

함수와 ES6 메서드는 Rest 파라미터와 arguments 객체를 모두 사용할 수 있다. 하지만 화살표 함수는 함수 자체의 arguments 객체를 갖지 않는다. 따라서 화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 Rest 파라미터를 사용해야 한다.

<br />

---

<br />

# Spread 문법

ES6에서 도입된 **스프레드 문법(Spread syntax)**은 하나로 문쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다. 스프레드 문법을 사용할수 있는 대상은 `Array`, `String`, `Map`, `Set`, `DOM 컬렉션(NodeList, HTMLCollection)`, `arguments`와 같이 `for…of` 문으로 순회할 수 있는 이터러블에 한정된다.

```js
console.log(...[1, 2, 3]); // 1 2 3

console.log(...'Hello'); // H e l l o

console.log(
  ...new Map([
    ['a', '1'],
    ['b', '2'],
  ]),
); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });
// TypeError: Found non-callable @@iterator
```

스프레드 문법의 결과는 값이 아니라 값들의 목록이다. 이는 스프레드 문법이 피연사자를 연산하여 값을 생성하는 연산자가 아님을 의미한다. 따라서 스프레드 문법의 결과는 변수에 할당할 수 없다.

```js
// 스프레드 문법의 결과는 값이 아니다.
const list = ...[1, 2, 3]; // SyntaxError: Unexpected token ...
```

## 함수의 인수로 사용하는 경우

스프레드 문법이 제공되기 이전에는 배열을 펼쳐서 요소들의 목록을 함수의 인수로 전달하고 싶은 경우 `Function.prototype.apply` 를 사용했다.

```js
var arr = [1, 2, 3];
var max = Math.max.apply(null, arr); // -> 3
```

스프레드 문법을 사용하면 간결하고 가독성이 좋다.

```js
const arr = [1, 2, 3];
const max = Math.max(...arr); // -> 3
```

### Rest 파라미터와 스프레드 문법의 차이점

**Rest 파라미터**는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름 앞에 `…`을 붙이는 것이다. **스프레드 문법**은 여러 개의 값이 하나로 뭉쳐 있는 배열과 같은 이터러블을 펼쳐서 개별적이 값들의 목록을 만드는 것이다. 따라서 _Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다._

```js
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(...rest) {
  console.log(rest); // 1, 2, 3 -> [ 1, 2, 3 ]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3]);
```

## 배열에서 사용하는 경우

### concat

ES5에서 2개의 배열을 1개의 배열로 결합하고 싶은 경우 배열 리터럴만으로 해결할 수 없고 `concat` 메서드 를 사용해야 한다.

```js
var arr = [1, 2].concat([3, 4]);
console.log(arr); // [1, 2, 3, 4]
```

스프레드 문법을 사용하면 배열 리터럴만으로 2개의 배열을 1개의 배열로 결합할 수 있다.

```js
const arr = [...[1, 2], ...[3, 4]];
console.log(arr); // [1, 2, 3, 4]
```

### splice

ES5에서 어떤 배열의 중간에 다른 배열의 요소들을 추가하거나 제거하려면 `splice` 메서드를 사용한다.

```js
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];

Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
console.log(arr1); // [1, 2, 3, 4]
```

스프레드 문법을 시용하면 다음과 같이 더욱 간결하고 가독성 좋게 표현할 수 있다.

```js
// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1); // [1, 2, 3, 4]
```

### 배열 복사

ES5에서 배열을 복사하려면 `slice` 메서드를 사용한다.

```js
// ES5
var origin = [1, 2];
var copy = origin.slice();

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

스프레드 문법을 시용하면 다음과 같이 더욱 간결하고 가독성 좋게 표현할 수 있다.

```js
// ES6
const origin = [1, 2];
const copy = [...origin];

console.log(copy); // [1, 2]
console.log(copy === origin); // false
```

<br />

---

# 참고

- https://poiemaweb.com/es6-extended-parameter-handling
- 모던 자바스크립트 Deep Dive
