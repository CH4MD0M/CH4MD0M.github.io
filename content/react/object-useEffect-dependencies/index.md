---
title: 'React: useEffect의 의존성 배열(dependency array)에서 객체 처리하기'
category: react
date: 2023-06-21
tags:
  - 의존성배열
  - useEffect
  - object
---

# 들어가며

우리가 React를 사용하다보면 상태로 객체를 관리하는 경우가 많이 있다. 특히 애플리케이션의 복잡성이 증가하면서 한 개의 상태로 여러 값을 관리해야 할 때, 객체를 사용하는 것은 꽤 효율적인 방법일 수 있다. 그러나 이러한 방식이 `useEffect`와 같은 훅에 적용될 때, 약간의 주의가 필요하다.

# JavaScript의 객체 비교

`useEffect`는 컴포넌트가 렌더링된 후에 의존성 배열을 통해 어떤 값의 변화에 반응할 것인지를 정의할 수 있다. 이 의존성 배열에 객체, 배열 등을 넣게 되면, 우리의 기대와는 조금 다른 동작을 보일 때가 있다.

JavaScript에서 객체는 **참조값(메모리 주소)을 비교**한다. 따라서 객체의 속성이 모두 같더라도, 다른 메모리 주소에 저장되어 있으면 다른 객체로 판단한다.

```js
const prev_obj = { count: 0 };
const new_obj = { count: 0 };

console.log(prev_obj === new_obj); // false
```

# 문제가 되는 상황

이렇게 의존성 배열(dependency array)에서 객체를 처리할 때 다양한 상황을 마주할 수 있는데, 각각의 상황으로부터 어떻게 해결할 수 있는지 알아보자.

## 객체의 속성이 변하지 않는 경우

커스텀 훅을 만들어서 사용할 때, 이런 상황이 발생할 수 있다. 아래 코드를 살펴보자.

```tsx
import React, { useEffect, useState } from 'react';

function useCustomHook({ obj }: { obj: Object }) {
  useEffect(() => {
    console.log('obj가 바뀌지 않아도 매번 console.log가 실행됩니다.');
  }, [obj]);
}

function ExampleComponent() {
  const [state, setState] = useState(0);

  // 커스텀 훅 호출
  useCustomHook({ obj: { a: 1 } });

  const handleClick = () => {
    setState(prev => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}

export default ExampleComponent;
```

버튼을 클릭하게 되면 `state`가 변하게 되고, `ExampleComponent`가 리렌더링 된다. 그리고 `useCustomHook`이 호출되면서 `obj`가 새로운 객체로 생성되고, 이는 `useEffect`의 의존성 배열에 의해 콜백 함수가 호출되는 원인이 된다.

### 해결 방법

```tsx
import { isEqual } from 'lodash';

function useCustomHook({ obj }: { obj: Object }) {
  const prevObjRef = useRef();

  useEffect(() => {
    if (!isEqual(prevObjRef.current, obj)) {
      console.log('obj가 바뀌었을 때만 이 console.log가 실행됩니다.');
      prevObjRef.current = obj;
    }
  }, [obj]);
}

function ExampleComponent() {
  const [state, setState] = useState(0);

  // 커스텀 훅 호출
  useCustomHook({ obj: { a: 1 } });

  const handleClick = () => {
    setState(prev => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>클릭</button>
    </div>
  );
}
```

`isEqual`은 lodash 라이브러리에서 제공하는 함수로, 두 객체의 값을 비교하는데 사용된다. 이 함수는 객체의 모든 키-값 쌍을 재귀적으로 비교하므로, 이를 **"깊은 비교(deep comparison)"**라고 한다.

여기서 useRef를 사용하는 이유는 `useEffect`의 콜백 함수가 호출될 때마다 `prevObjRef.current`에 새로운 객체를 할당하기 위함이다. `useEffect`의 콜백 함수는 렌더링이 끝난 후에 호출되므로, `prevObjRef.current`에는 이전 렌더링에서 사용된 객체가 저장되어 있을 것이다. 따라서 `isEqual`을 통해 이전 객체와 현재 객체를 비교할 수 있다. 그리고 `useState`와는 달리 `useRef`는 새로운 객체를 할당해도 컴포넌트가 리렌더링되지 않는다.

## 객체의 속성이 일부 변하는 경우

객체의 속성이 일부만 변화하는 경우에도, 객체는 새로 생성된다. 이렇게 사용하지 않는 것이 너무 당연해서 이렇게 쓸 일이 없을 것 같다.😅 그냥 객체의 특성을 알아보기 위함이니 간단하게 살펴보자.

```js
function ExampleComponent() {
  const [state, setState] = useState({ a: 1, b: 1 });

  useEffect(() => {
    console.log('state가 변경되었을 때마다 이 console.log가 실행됩니다.');
  }, [state]); // state 객체의 참조가 바뀔 때마다 useEffect가 호출된다.

  const handleClick = () => {
    setState(prevState => ({ ...prevState, a: prevState.a + 1 }));
    // a 값만 바뀌어도 새로운 객체가 생성되어 state 참조가 바뀐다.
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
```

따라서 의존성 배열에는 객체의 속성이 변하는지를 감지할 수 있는 값(원시 타입의 값)을 넣어주는 것이 좋다.

```js
useEffect(() => {
  console.log('state가 변경되었을 때마다 이 console.log가 실행됩니다.');
}, [state.b]);
```

# 객체 생성 연산이 복잡한 경우

객체나 배열을 만드는데 드는 비용이 큰 경우가 있다면, 매 렌더링마다 객체를 새로 생성하는 것은 성능에 좋지 않다.

이때 해결 방법은 객체를 `Memoization` 하는 것이다. **Memoization**이란, 함수의 반환값을 캐시하여 동일한 인자가 입력되었을 때, 이전에 계산된 결과를 반환하는 것을 말한다. 이를 통해 불필요한 계산을 줄일 수 있다. 이는 `useMemo`나 `useCallback`과 같은 훅을 사용하여 구현할 수 있다.

```js
const [obj, setObj] = useState({ count: 0, flag: false });

const memoizedObj = useMemo(
  () => generateObject({ count: 0, flag: false }),
  [count, flag],
);

useEffect(() => {
  console.log('memoizedObj가 변경되었을 때마다 이 console.log가 실행됩니다.');
}, [memoizedObj]);
```

위 코드에서 `memoizedObj`는 count와 flag의 변화를 감지할 수 있다. 이들에 변경이 있다면, `memoizedObj`는 새로운 객체를 반환하게 되고, 이는 새로운 메모리 주소를 가지게 된다. 따라서 `useEffect`는 이를 새로운 객체로 인식하고, 콜백 함수를 호출하게 된다.

# 참고

- [Object & array dependencies in the React useEffect Hook](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/)
- [React useEffect 의 dependency array](https://sgwanlee.medium.com/useeffect%EC%9D%98-dependency-array-ebd15f35403a)
