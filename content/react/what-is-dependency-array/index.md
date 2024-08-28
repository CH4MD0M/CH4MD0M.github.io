---
title: 'React: 의존성 배열(Dependency Array)이란?'
category: react
date: 2023-06-17
tags:
  - 의존성배열
  - ShallowCopy
---

# 들어가며

리액트 훅(Hooks)은 함수형 컴포넌트에서 상태와 생명 주기 기능을 사용할 수 있게 해주는 기능으로, `useEffect`, `useCallback` 그리고 `useMemo` 등이 있다. 이 훅들은 모두 의존성 배열(dependency array)을 사용하여 특정 값이 변경될 때에만 특정 로직이 실행되도록 제어할 수 있다. 이번 포스트에서는 의존성 배열의 정의와 목적에 대해 알아보도록 하자.

# 의존성 배열(Dependency Array)이란?

**의존성 배열(dependency array)**은 특정 값들의 변화를 감지하여 Hook의 동작을 제어하는 역할을 한다. 주로 `useEffect`, `useMemo`, `useCallback` 등의 Hook에서 사용된다.

의존성 배열은 React에게 "이 값들이 변경될 때만 이 효과나 계산을 다시 실행해야 해"라고 알려주는 일종의 지시자 역할을 한다. 이는 단순히 최적화를 위한 도구를 넘어서, React 애플리케이션의 동작 방식을 정의하는 중요한 개념이다.

## 동작 방식

#### 값이 포함된 배열 [a, b]

배열 내의 값(a 또는 b)이 변경될 때마다 Hook이 실행된다. React는 이전 렌더링의 값과 현재 값을 비교 검사하여 변화를 감지합니다.

#### 빈 배열 []

컴포넌트의 마운트와 언마운트 시에만 Hook이 실행된다. 이는 컴포넌트의 생명주기 동안 단 한 번만 실행되어야 하는 로직에 사용된다.

# React Hook에서 의존성 배열

## useEffect

useEffect는 컴포넌트가 렌더링될 때마다 실행된다. 따라서, useEffect를 사용할 때 불필요한 실행을 방지하려면, useEffect가 실행될 조건을 지정해주어야 한다. 이때 사용되는 것이 바로 의존성 배열이다. 예를 들어, 다음과 같은 코드에서 useEffect는 count가 변경될 때만 실행되도록 의존성 배열을 지정하고 있다.

```js
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count is ${count}`);
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

위 코드에서 [count]는 useEffect가 실행될 조건으로, count가 변경될 때만 useEffect가 실행된다. 따라서, count가 변경되지 않으면 불필요한 실행을 방지할 수 있다.

## useCallback

`useCallback`은 메모이제이션된 콜백 함수를 반환하여, 특정 값이 변경될 때에만 콜백 함수가 재생성되도록 하는 hook이다. useCallback을 사용할 때도 의존성 배열을 사용하여 함수가 실행될 조건을 지정할 수 있다. 예를 들어, 다음과 같은 코드에서 handleClick 함수는 count가 변경될 때만 재생성되도록 의존성 배열을 지정하고 있다.

```js
import { useState, useCallback } from 'react';

function MyComponent({ onClick }) {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count, onClick]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

## useMemo

`useMemo`는 계산량이 많은 함수의 **반환값**을 캐싱하여 성능을 최적화할 수 있는 hook이다. useMemo를 사용할 때도 의존성 배열을 사용하여 함수가 실행될 조건을 지정할 수 있다. 예를 들어, 다음과 같은 코드에서 result는 count가 변경될 때만 다시 계산되도록 의존성 배열을 지정하고 있다.

```js
import { useState, useMemo } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  const result = useMemo(() => {
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Result: {result}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

# 의존성 배열의 올바른 관리 방법

## 원시 타입의 의존성 관리

## 객체와 함수의 의존성 관리

의존성 배열에 객체 또는 배열을 선언했을 때, 객체나 배열의 값이 변경되어도 이를 감지하지 못하여 불필요한 연산이 발생할 수 있다. 이는 객체나 배열이 원시값과 다르게 **참조에 의한 비교**를 하기 때문이다.

> 객체의 참조에 대해서는 [JavaScript: 원시 타입과 객체 타입](https://chamdom.blog/primitive-and-object/)에서 자세히 다룬다.

자바스크립트에서 원시값을 제외한 대부분이 객체다(배열도 객체다). <br/>
객체의 메모리 주소에는 객체 자체를 저장하지 않고 객체가 실제로 저장되어 있는 주소를 가리키기 때문에, 해당 객체가 변경되면 그 객체를 참조하는 모든 변수와 함수에서 해당 변경사항을 반영할 수 있다. 그러나 의존성 배열에서 객체나 배열을 감지할 때는 **해당 객체나 배열이 바뀌었는지를 확인하는 것이 아니라, 그 객체나 배열의 주소 또는 참조가 변경되었는지를 확인한다.** 이때, 객체나 배열의 주소 또는 참조가 변경되었더라도 그 안의 값이 변경되지 않았다면, 의존성 배열에서 해당 값을 감지하지 못할 수 있다.

## 불변성 유지와 의존성 배열
