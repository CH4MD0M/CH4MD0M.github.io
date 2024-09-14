---
title: 'JavaScript: 이터러블(iterable)과 이터레이터(iterator)'
category: javascript
date: 2024-07-25
tags:
  - 이터러블
  - 이터레이터
  - 제너레이터
---

# 이터레이션 프로토콜

ES6에서 도입된 이터레이션 프로토콜은 순회할 수 있는 데이터 구조를 만들기 위해 ECMAScript 사양에서 정의한 규칙이다.

ES6 이전에는 배열, 문자열, 유사 배열 객체, DOM 컬렉션 등 다양한 데이터 구조가 서로 다른 방식으로 순회할 수 있었다. 그러나 ES6에서는 이터레이션 프로토콜을 준수하는 이터러블로 이러한 데이터 구조를 통일하여 `for...of` 문, 스프레드 문법, 배열 디스트럭처링 할당 등에 사용할 수 있도록 일관된 방식을 제공한다.

이터레이션 프로토콜에는 이터러블 프로토콜(iterable protocol)과 이터레이터 프로토콜(iterator protocol)이 있다.

# 이터러블

<blockquote variant="word" title="이터러블 프로토콜(iterable protocol)">

`Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속 받은 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이러한 규약을 이터러블 프로토콜이라 한다.

</blockquote>

이터러블 프로토콜을 준수한 객체를 **이터러블(iterable)**이라 한다. 즉, 이터러블은 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체를 말한다.

```js
const isIterable = v => v !== null && typeof v[Symbol.iterator] === 'function';

// 배열, 문자열, Map, Set 등은 이터러블이다.
isIterable([]); // -> true
isIterable(''); // -> true
isIterable(new Map()); // -> true
isIterable(new Set()); // -> true
isIterable({}); // -> false
```

이터러블은 `for…of` 문으로 순회할 수 있고, 스프레드 문법의 대상으로 사용할 수 있다.

```js
const array = [1, 2, 3];

// 배열은 Array.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in array); // true

// 이터러블인 배열은 for...of 문으로 순회 가능하다.
for (const item of array) {
  console.log(item);
}

// 이터러블인 배열은 스프레드 문법의 대상으로 사용할 수 있다.
console.log([...array]); // [1, 2, 3]

// 이터러블인 배열은 배열 디스트럭처링 할당의 대상으로 사용할 수 있다.
const [a, ...rest] = array;
console.log(a, rest); // 1, [2, 3]
```

`Symbol.iterator` 메서드를 직접 구현하지 않거나 상속받지 않은 **일반 객체**는 이터러블이 아니다. 따라서, `for…of` 문으로 순회할 수 없고, 스프레드 문법과 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.

```js
const obj = { a: 1, b: 2 };
const [a, b] = obj;

// 일반 객체는 이터러블 프로토콜을 준수하지 않기 때문에 이터러블이 아니다.
console.log(Symbol.iterator in obj); // false

// 이터러블이 아닌 일반 객체는 for...of 문으로 순회할 수 없다.
// TypeError: obj is not iterable
for (const item of obj) {
  console.log(item);
}

// 배열 디스트럭처링 할당의 대상으로 사용할 수 없다.
const [a, b] = obj;
// TypeError: obj is not iterable
```

TC39 프로세스의 stage 4(Finished) 단계에 제안되어 있는 **스프레드 프로퍼티 제안**은 일반 객체에 스프레드 문법의 사용을 허용한다.

```js
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };

console.log(obj2); // { a: 1, b: 2, c: 3 }
```

<blockquote variant="word" title="TC39 프로세스">

TC39 프로세스는 ECMAScript(자바스크립트) 표준에 새로운 기능을 추가하기 위해 제안을 검토하고 승인하는 프로세스다. 이 프로세스는 0단계부터 4단계까지로 나누어져 있으며, 4단계(Finished)는 해당 제안이 최종적으로 승인을 받아 표준에 포함된다는 것을 의미한다.

</blockquote>

# 이터레이터

<blockquote variant="word" title="이터레이터 프로토콜(iterator protocol)">

이터레이터는 `next`메서드를 소유하며 `next`메서드를 호출하면 이터러블을 순회하며 `value`, `done`프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이러한 규약을 이터레이터 프로토콜이라 한다.

</blockquote>

이터레이터 프로토콜을 준수한 객체를 **이터레이터(iterator)**라 한다. 이터러블의 `Symbol.iterator` 메서드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
const iterator = array[Symbol.iterator]();

// Symbol.iterator 메서드가 반환한 이터레이터는 next 메서드를 갖는다.
console.log('next' in iterator); // true
```

이터레이터는 `next` 메서드를 소유하며 `next` 메서드는 이터러블의 각 요소를 순회하기 위한 포인터의 역할을 한다. 이터레이터의 `next` 메서드가 반환하는 **이터레이터 리절트 객체**의 `value` 프로퍼티는 현재 순회 중인 이터러블의 값을 나타내며 `done` 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.

```js
// 배열은 이터러블 프로토콜을 준수한 이터러블이다.
const array = [1, 2, 3];

// Symbol.iterator 메서드는 이터레이터를 반환한다.
// 이터레이터는 next 메서드를 갖는다.
const iterator = array[Symbol.iterator]();

// next 메서드를 호출하면 이터러블을 순회하며 순회 결과를 나타내는 이터레이터 리절트 객체를 반환한다.
// 이터레이터 리절트 객체는 value와 done 프로퍼티를 갖는 객체다.
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

# for…of 문

`for…of` 문은 내부적으로 이터레이터의 `next` 메서드를 호출하여 이터러블을 순회하며 `next` 메서드가 반환한 이터레이터 리절트 객체의 `value` 프로퍼티 값을 `for…of` 문의 변수에 할당한다.

이터레이터 리절트 객체의 `done` 프로퍼티 값이 **false**이면 순회를 계속하고, **true**이면 이터러블의 순회를 중단한다.

```js
for (const item of [1, 2, 3]) {
  console.log(item); // 1 2 3
}
```

# 이터러블과 유사 배열 객체

### 유사 배열 객체

**유사 배열 객체**는 배열처럼 인덱스를 사용해 프로퍼티 값에 접근할 수 있으며, `length` 프로퍼티를 갖고 있는 객체를 의미한다. 이러한 객체는 `for` 문을 사용해 순회할 수 있고, 숫자 형식의 문자열을 키로 사용해 값에 접근할 수 있다. 하지만 유사 배열 객체는 일반 객체로, 이터러블이 아니다. 따라서 `Symbol.iterator` 메서드가 없어 `for...of` 문을 사용해 순회할 수 없다.

```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

for (const item of arrayLike) {
  console.log(item);
}
// TypeError: arrayLike is not iterable
```

단, arguments, NodeList, HTMLCollection은 유사 배열 객체이면서도 이터러블이다. 정확히 말하면, ES6에서 이터러블이 도입되면서 이들 유사 배열 객체에 `Symbol.iterator` 메서드를 구현하여 이터러블이 되었다. 마찬가지로 배열도 ES6 이후 `Symbol.iterator` 메서드를 구현하여 이터러블로 취급된다.

모든 유사 배열 객체가 이터러블인 것은 아니므로, 유사 배열 객체를 이터러블처럼 사용하기 위해서는 ES6에서 도입된 `Array.from` 메서드를 사용할 수 있다. `Array.from` 메서드는 유사 배열 객체나 이터러블을 인수로 받아 배열로 변환하여 반환한다.

```js
const arrayLike = {
  0: 1,
  1: 2,
  2: 3,
  length: 3,
};

const arr = Array.from(arrayLike);

// Array.from은 유사 배열 객체 또는 이터러블을 배열로 변환한다.
for (const item of arr) {
  console.log(item); // 1 2 3
}
```

<br/><br/>

---

<br/>

# 이터러블이면서 이터레이터인 객체

<blockquote variant="info">

이터러블이면서 이터레이터인 객체는 대표적으로 제너레이터 객체가 있다.

제너레이터 객체에 대해서는 [JavaScript: 제너레이터(generator)와 async/await](https://chamdom.blog/js-generator/)에서 더 자세히 다룬다.

</blockquote>

## 이터러블을 생성하는 함수

위에서 `Symbol.iterator`를 프로퍼티 키로 사용한 메서드를 직접 구현하면 사용자 정의 이터러블이 될 수 있다고 했다. 이를 구현해 보자.

```js
const squareSequence = function (max) {
  let n = 0;

  return {
    [Symbol.iterator]() {
      return {
        next() {
          n++;
          const square = n * n;
          return { value: square, done: square >= max };
        },
      };
    },
  };
};

const squares = squareSequence(10);
for (let num of squares) {
  console.log(num); // 1, 4, 9
}
```

squareSequence 함수는 `Symbol.iterator` 메서드를 가진 객체를 반환하여 이터러블로 만든다. `Symbol.iterator` 메서드는 이터레이터 객체를 반환하며, 이 객체는 `next` 메서드를 통해 `done`과 `value` 프로퍼티를 가지는 이터레이터 리절트 객체를 반환한다.

이터레이터를 생성하려면 이터러블의 `Symbol.iterator` 메서드를 호출해야 한다. 이터러블 자체는 반복 가능한 객체이지만, 직접적으로 값을 생성하지는 않기 때문이다.

```js
const iterable = squareSequence(10);
const iterator = iterable[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 4, done: false }
console.log(iterator.next()); // { value: 9, done: false }
console.log(iterator.next()); // { value: 9, done: false }
```

## 이터러블이면서 이터레인터인 객체를 생성하는 함수

이터러블이면서 이터레인터인 객체를 생성하면 `Symbol.iterator` 메서드를 호출할 필요가 없다. 즉, 반복 가능한 동시에 값을 생성하는 기능도 직접 수행할 수 있는 것이다.

이제 위 예제를 이터러블이면서 이터레인터인 객체를 반환하는 함수로 만들어 보자.

```js
const squareSequence = function (max) {
  let n = 0;

  return {
    [Symbol.iterator]() {
      return this; // 이터러블이면서 이터레이터인 객체는 자기 자신을 반환
    },

    next() {
      n++;
      const square = n * n;
      return { value: square, done: square >= max };
    },
  };
};
```

여기서 squareSequence 함수는 `Symbol.iterator` 메서드에서 `this`를 반환하도록 변경했다. 이는 이 객체가 이터러블이면서 동시에 이터레이터임을 의미한다. 따라서 이 객체는 `for...of` 루프에서 직접 사용할 수 있으며, `next` 메서드를 호출하여 값을 하나씩 생성할 수 있다.

```js
let iter = squareSequence(10);
for (let num of iter) {
  console.log(num); // 1, 4, 9
}

iter = squareSequence(10);
console.log(iter.next()); // { value: 1, done: false }
console.log(iter.next()); // { value: 4, done: false }
console.log(iter.next()); // { value: 9, done: false }
console.log(iter.next()); // { value: 16, done: true }
```

<br />

---

# 참고

- https://poiemaweb.com/
- 모던 자바스크립트 Deep Dive
