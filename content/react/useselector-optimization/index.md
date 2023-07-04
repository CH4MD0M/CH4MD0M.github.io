---
title: 'Redux의 useSelector 최적화 하기'
category: react
date: 2023-06-28
tags:
  - redux
  - redux-toolkit
  - useSelector
---

# 들어가며

지금까지 Redux toolkit을 사용하면서 `useSelector`를 잘못 사용하고 있다는 것을 알게되었다. 다음과 같이 구조 분해 할당을 사용하여 `useSelector`를 사용하고 있었다.

```js
const { data, loading, error } = useSelector(state => state.user);
```

위 처럼 구조 분해 할당으로 `useSelector`를 사용하면 어떤 문제가 생기는지 그리고 어떻게 최적화할 수 있을지 이번 포스팅에서 다뤄보려고 한다.

# useSelector의 동작 원리

```js
import { useSelector } from 'react-redux';

function ExampleComponent() {
  const count = useSelector(state => state.counter);

  return <div>Count: {count}</div>;
}
```

위 예제 코드를 통해서 `useSelector`가 어떻게 동작하는지 간략하게 알아보자.

**1. 렌더링 될 때 selector 함수를 실행** <br/>
`useSelector`는 컴포넌트가 렌더링 되거나 action이 dispatch 될 때마다 selector 함수를 실행한다.

위 코드에서 selector 함수는 `state => state.counter`이다. 이 함수는 redux store의 state를 매개변수로 받아서 state를 가공한 후 반환한다. `useSelector`는 selector 함수의 반환값을 반환한다.

> **Selector 함수란?**
>
> Selector 함수는 Redux 상태를 입력으로 받아 특정 데이터를 선택하여 반환하는 함수다.

**2. selector 함수의 반환값을 비교** <br/>
action이 dispatch 되면 redux store의 state가 변경된다. 이때 `useSelector`는 이전 selector 함수의 반환값과 현재 selector 함수의 반환값을 비교한다.

**3. 컴포넌트 리렌더링** <br/>
비교 결과 두 값이 다르다면 컴포넌트를 리렌더링한다. 만약 두 값이 같다면 컴포넌트를 리렌더링하지 않는다.

## 참조 동등성 검사와 업데이트

이 과정을 이해하기 위해 먼저 원시 타입과 참조 타입을 자바스크립트가 어떻게 비교하는지를 알아야 한다.

> 원시 타입과 객체에 대한 비교는 [JavaScript: 원시 타입과 객체 타입](https://chamdom.blog/primitive-and-object/)에서 자세히 다루니 꼭 읽어보자!

위에서 `useSelector`는 이전 selector 함수의 반환값과 현재 selector 함수의 반환값을 비교한다고 했다. 그렇다면 Redux는 이를 어떻게 비교할까?

이때, Redux는 **reference equality checks(참조 동등성 검사)**를 사용한다. 즉, `===` 연산자를 사용하여 두 값이 같은지 비교한다.

JavaScript는 **원시 타입**의 값은 값 자체를 비교하기 때문에 이전 값과 다른지 정확하게 비교할 수 있다. 하지만 객체는 비교 대상이 참조 값(메모리 주소)이기 때문에 **객체의 값이 변경되지 않더라도(객체가 새로 생성되기 때문에) 항상 다른 값으로 판단한다.**

# 구조 분해 할당의 문제점

위에서 설명한 동등성 검사 과정 때문에 `useSelector`의 구조 분해 할당이 문제가 된다. 다음 예제 코드를 보자.

```js
const { data, loading, error } = useSelector(state => state.user);
```

위 예제에서 `state.user`는 **객체**다. 위에서 설명한대로 JavaScript의 객체는 참조 값(메모리 주소)을 비교하기 때문에 `state.user`가 변경되지 않더라도 항상 다른 값으로 판단한다. 이로 인해 컴포넌트가 불필요하게 리렌더링된다.

# useSelector 구조 분해 할당 최적화 방법

구조 분해 할당으로 발생하는 문제를 해결하기 위해 적절한 방법으로 최적화를 해야한다. 최적화 하는 방법 몇 가지를 알아보자.

## useSelector를 여러번 사용하기

가장 간단한 해결 방법으로 코드가 길어지긴 하지만, `useSelector`를 여러번 사용하는 방법이 있다. [[공식문서]](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#using-multiple-selectors-in-a-component)에서도 이 방법을 권장한다.

```js
const data = useSelector(state => state.user.data);
const loading = useSelector(state => state.user.loading);
const error = useSelector(state => state.user.error);
```

위 코드에서 `useSelector`를 여러번 사용하면 각각의 원시 타입의 값을 비교하기 때문에 문제가 없다. 여기서 중요한건 useSelector를 여러번 사용하는 것이 아니라, **각각의 selector 함수가 반환하는 값이 원시 타입이어야 한다는 것이다.**

## shallowEqual 사용하기

두 번째 방법은 `shallowEqual`을 `useSelector`의 두 번째 매개변수로 전달하는 방법이다.

```js
import { useSelector, shallowEqual } from 'react-redux';

function ExampleComponent() {
  const { data, loading, error } = useSelector(
    state => state.user,
    shallowEqual,
  );

  return <div>Count: {count}</div>;
}
```

`useSelector`는 두 번째 매개변수로 `equalityFn`를 받는다. 이 함수는 두 값이 같은지 비교하는 함수다. 직접 만들어서 사용할 수도 있고 `react-redux`에서 제공하는 `shallowEqual`을 전달해도 된다.

```ts
export declare const useSelector: <TState = unknown, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined,
) => Selected;
```

`shallowEqual`을 사용할 때, 주의할 점이 있다. **shallowEqual은 객체의 가장 바깥쪽의 값만 비교한다는 것이다.** 만약 다음과 같은 객체가 있다면

```js
const obj = {
  a: { x: 1, y: 2 },
  b: 3,
  c: [4, 5, 6],
};
```

`shallowEqual`이 비교하는 값은 `obj.a`, `obj.b`, `obj.c`이다. `obj.a.x`, `obj.a.y`는 비교 대상이 아니다. 따라서 전역 상태가 복잡한 구조의 객체로 관리된다면 최대한 작은 조각(원시 타입)으로 쪼개서 관리하거나 직접 만든 `equalityFn`을 사용하는 것이 좋다.

# createSelector로 최적화하기

아래 코드는 장바구니에 담긴 상품의 총 가격과 개수를 계산하는 코드다.

```js
import { useSelector } from 'react-redux';

// 장바구니에 담긴 상품의 개수
const itemsCount = useSelector(state =>
  state.cart.cartItems.reduce(
    (quantity, item) => quantity + Number(item.quantity),
    0,
  ),
);
// 장바구니에 담긴 상품의 총 가격
const cartSubtotal = useSelector(state =>
  state.cart.cartItems.reduce(
    (price, item) => price + item.price * item.quantity,
    0,
  ),
);
```

위 코드와 같이 `useSelector`에서 매번 복잡한 계산을 수행하게 되면, 상태가 변경될 때마다 이 계산이 반복된다. 이는 성능에 불필요한 부하를 줄 수 있다.

이를 해결하기 위해 Reselect 라이브러리 또는 Redux Toolkit에서 제공하는 함수인 `createSelector`를 사용할 수 있다.

## createSelector란?

`createSelector`를 사용하면 **메모이제이션(memoization)**을 통해 연산의 결과를 재사용할 수 있다.

`createSelector` 함수는 다음의 두 가지 주요 인자를 받는다.

**입력 선택자들(input selectors):** 이들은 Redux의 전체 상태를 받아서 필요한 부분만을 추출하는 함수들이다. 배열로 감싸면 여러 개의 입력 선택자를 제공할 수 있다. 각 입력 선택자의 결과는 결과 함수의 인자로 순서대로 제공된다. 배열로 감싸지 않으면 하나의 입력 선택자만을 제공할 수 있다. 이 입력 선택자의 결과는 결과 함수의 첫번째 인자로 제공된다.

**결과 함수(result function):** 이 함수는 입력 선택자들이 반환하는 값들을 인자로 받아서, 복잡한 계산을 수행하고 그 결과를 반환한다. 이 함수는 입력 선택자들이 반환하는 값들이 변경되었을 때만 다시 호출된다.

`createSelector`는 각 입력 선택자가 반환하는 값들이 이전과 같으면 이전에 계산한 결과를 재사용하고, 그렇지 않으면 결과 함수를 호출하여 새로운 결과를 계산한다.

## createSelector 사용하기

createSelector를 사용하여 위 코드를 최적화해보자.

```js
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

const storedCartItems = state => state.cart.cartItems;

const storedCartItemsCount = createSelector(storedCartItems, cartItems =>
  cartItems.reduce((quantity, item) => quantity + Number(item.quantity), 0),
);
const storedCartSubtotal = createSelector(storedCartItems, cartItems =>
  cartItems.reduce((price, item) => price + item.price * item.quantity, 0),
);

const itemsCount = useSelector(storedCartItemsCount);
const cartSubtotal = useSelector(storedCartSubtotal);
```

이제 장바구니에 상품을 담아서 `storedCartItems`가 변경될때만 `storedCartItemsCount`와 `storedCartSubtotal`이 다시 계산된다.

# 마치며

redux를 처음 공부할때, 공식문서를 정독하지 않고 예제를 통해서 급하게 배운탓에 `useSelector`를 잘못 사용하고 있었다. 이번 포스팅을 통해서 `useSelector`와 `createSelector`를 사용하여 최적화하는 방법을 알게되었다. 급하게 새로운 기술을 사용해야 한다면 공식문서를 정독할 시간이 없을 수도 있지만, "왜?"라는 질문을 끊임없이 스스로에게 던지면서 공부해야겠다.

당연한 코드는 없다. 습관대로 코드를 작성하지 말고, 질문을 던지면서 생각하면서 코딩하자. 멍청한 나야.🥲🥲

<br/>

---

# 참고

- [React Redux - useselector](https://react-redux.js.org/api/hooks#useselector)
- [Redux toolkit - useselector](https://redux-toolkit.js.org/api/createSelector)
- [Reselect API documentation](https://github.com/reduxjs/reselect)
- [React 에서 useSelector 최적화 하는 3가지 방법.](https://blog.woolta.com/categories/1/posts/200)
- [react.vlpt.us - useSelector 최적화](https://react.vlpt.us/redux/08-optimize-useSelector.html)
