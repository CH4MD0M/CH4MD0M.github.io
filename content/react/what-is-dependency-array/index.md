---
title: 'React: 의존성 배열(Dependency Array)이란?'
category: react
date: 2023-06-17
tags:
  - 의존성배열
  - ShallowCopy
---

# 의존성 배열(Dependency Array)이란?

**의존성 배열(Dependency Array)**은 `useEffect`, `useCallback`, `useMemo` 등의 Hook에서 사용되는 배열로, Hook이 불필요하게 반복해서 실행되는 것을 방지하여 성능을 최적화하기 위해서 사용한다.

의존성 배열의 주요 목적은 다음과 같다.

- **Hook의 재실행 조건 설정:** 의존성 배열에 포함된 값들이 변경될 때만 훅이 재실행되도록 조건을 설정한다. 이를 통해 불필요한 실행을 방지할 수 있다.
- **최신 상태 유지:** 의존성 배열을 사용하면 Hook이 항상 최신 상태의 값을 참조할 수 있다. 이를 통해 불필요한 연산을 방지할 수 있다.
- **의존성 관리의 명확성:** 의존성 배열을 사용하면 훅이 어떤 값에 의존하고 있는지 명확하게 파악할 수 있다. 이는 코드의 가독성을 높이고, 의도하지 않은 의존성 관계를 방지할 수 있다.

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

## useCallback

위 코드에서 [count]는 useEffect가 실행될 조건으로, count가 변경될 때만 useEffect가 실행된다. 따라서, count가 변경되지 않으면 불필요한 실행을 방지할 수 있다.

또 다른 예로 useCallback이 있는데, useCallback을 사용할 때도 의존성 배열을 지정하여 콜백 함수가 변경될 때만 함수를 다시 생성하도록 해서 불필요한 연산을 방지할 수 있다.

```js
import { useState, useCallback } from 'react';

function MyComponent({ onClick }) {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
    onClick(count + 1);
  }, [count, onClick]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

위 코드에서 [count, onClick]은 handleClick 함수가 실행될 조건으로, count와 onClick이 변경될 때만 함수를 다시 생성하도록 지정한다. 이렇게 하면, count와 onClick이 변경되지 않는 한 불필요한 함수 생성을 방지할 수 있다.

## useMemo

# 의존성 배열의 올바른 관리 방법

## 원시 타입의 의존성 관리

## 객체와 함수의 의존성 관리

의존성 배열에 객체 또는 배열을 선언했을 때, 객체나 배열의 값이 변경되어도 이를 감지하지 못하여 불필요한 연산이 발생할 수 있다. 이는 shallow copy의 개념과 관련이 있다.

> 객체의 참조에 대해서는 [JavaScript: 원시 타입과 객체 타입](https://chamdom.blog/primitive-and-object/)에서 자세히 다룬다.

자바스크립트에서 원시값을 제외한 대부분이 객체다(배열도 객체다). 객체의 메모리 주소에는 객체 자체를 저장하지 않고 객체가 실제로 저장되어 있는 주소를 가리키기 때문에, 해당 객체가 변경되면 그 객체를 참조하는 모든 변수와 함수에서 해당 변경사항을 반영할 수 있다. 그러나 의존성 배열에서 객체나 배열을 감지할 때는 **해당 객체나 배열이 바뀌었는지를 확인하는 것이 아니라, 그 객체나 배열의 주소 또는 참조가 변경되었는지를 확인한다.** 이때, 객체나 배열의 주소 또는 참조가 변경되었더라도 그 안의 값이 변경되지 않았다면, 의존성 배열에서 해당 값을 감지하지 못할 수 있다.

## 불변성 유지와 의존성 배열
