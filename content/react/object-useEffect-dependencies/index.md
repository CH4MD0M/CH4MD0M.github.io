---
title: 'React: useEffect의 의존성 배열(dependency array)에서 객체 처리하기'
category: react
date: 2023-03-19
tags:
  - 의존성배열
  - useEffect
  - object
---

# 들어가며

우리가 React를 사용하다보면 상태로 객체를 관리하는 경우가 많이 있다. 특히 애플리케이션의 복잡성이 증가하면서 한 개의 상태로 여러 값을 관리해야 할 때, 객체를 사용하는 것은 꽤 효율적인 방법일 수 있다. 그러나 이러한 방식이 `useEffect`와 같은 훅에 적용될 때, 약간의 주의가 필요하다.

`useEffect`는 컴포넌트가 렌더링된 후에 의존성 배열을 통해 어떤 값의 변화에 반응할 것인지를 정의할 수 있다. 이 의존성 배열에 객체, 배열 등을 넣게 되면, 우리의 기대와는 조금 다른 동작을 보일 때가 있다.

JavaScript에서 객체는 **참조값(메모리 주소)을 비교**한다. 따라서 객체의 속성이 모두 같더라도, 다른 메모리 주소에 저장되어 있으면 다른 객체로 판단한다.

```js
const prev_obj = { count: 0 };
const new_obj = { count: 0 };

console.log(prev_obj === new_obj); // false
```

반대로 객체의 속성 값이 변화해도 **참조 주소가 변하지 않는 한** 이를 같은 객체로 보고, `useEffect`는 변화를 감지하지 못하게 된다. 이는 코드의 동작을 예측하기 어렵게 만들고, 이로 인해 예상치 못한 버그가 발생할 수 있다.

이렇게 useEffect에서 객체를 처리할 때 다양한 상황을 마주할 수 있는데, 이 글에서는 문제 상황들과 useEffect의 의존성 배열에서 객체를 안전하게 사용하기 위한 몇 가지 방법을 소개하려고 한다. 이를 통해 보다 안정적이고 예측 가능한 React 코드를 작성하는 데 도움이 되었으면 좋겠다.

# 객체를 의존성 배열에 넣을 때

컴포넌트는 런더링 할때마다 새로운 객체를 생성할 것이다. 새로운 객체가 이전 객체와 같은 속성과 값을 가졌더라도 이전 객체와는 다른 참조를 가지게 된다. 즉, 다른 메모리 주소에 저장되므로 같은 객체가 아니라고 판단한다. 따라서 이런 객체(참조타입)를 의존성 배열에 넣으면, 의존성이 바뀐 것으로 간주되어 매 렌더링마다 콜백 함수가 호출되게 된다.

```js
const ChildComponent = ({ obj }) => {
  useEffect(() => {
    console.log('This will be logged on every render');
  }, [obj]);

  return <div>{obj.count}</div>;
};
```

이런 상황을 해결하기 위해서는 의존성 배열에 객체를 넣지 않으면 된다😁

의존성 배열에 객체를 넣지 않고, 객체의 속성 값 중 **원시 타입의 값**을 넣는다면, **원시 타입의 값은 값 자체를 비교하기 때문에** 이 원시 값이 변하지 않는 한 콜백 함수가 호출되지 않는다.

```js
const ChildComponent = ({ obj }) => {
  useEffect(() => {
    console.log('This will only be logged when `obj.count` changes');
  }, [obj.count]);

  return <div>{obj.count}</div>;
};
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
  console.log('This will only be logged when `memoizedObj` changes');
}, [memoizedObj]);
```

위 코드에서 `memoizedObj`는 count와 flag의 변화를 감지할 수 있다. 이들에 변경이 있다면, `memoizedObj`는 새로운 객체를 반환하게 되고, 이는 새로운 메모리 주소를 가지게 된다. 따라서 `useEffect`는 이를 새로운 객체로 인식하고, 콜백 함수를 호출하게 된다.

# 참고

- [Object & array dependencies in the React useEffect Hook](https://www.benmvp.com/blog/object-array-dependencies-react-useEffect-hook/)
- [React useEffect 의 dependency array](https://sgwanlee.medium.com/useeffect%EC%9D%98-dependency-array-ebd15f35403a)
