---
title: 'React: useEffect의 실행 과정 알아보기'
category: react
date: 2023-03-17
tags:
  - hooks
  - useEffect
  - fiber
---

# 들어가며

React를 사용하면서 `useEffect`를 쉽게 활용해 왔다. 그러나, 'React는 useEffect를 어떻게 실행하는 걸까?'라는 질문이 생겼다. useEffect의 사용법은 알고 있지만, 이 훅이 어떻게 작동하는지에 대해서는 이해하지 못했다. 이 포스팅을 통해 useEffect의 작동 원리를 알아보고자 한다.

# useEffect의 실행 흐름

먼저, useEffect의 실행 흐름을 간단하게 정리해보자.

1. 컴포넌트가 렌더링되면 `useEffect` 훅이 실행된다.
2. `useEffect` 훅은 의존성 배열에 지정된 값들을 이전 렌더링과 비교한다.
3. 의존성 배열에 지정된 값 중 하나라도 이전 렌더링과 다르다면, `useEffect`의 콜백 함수가 실행된다.
4. `useEffect`의 콜백 함수는 부수 효과 작업을 수행한다. 예를 들어 API 호출, 이벤트 등록, 구독 등의 작업을 수행할 수 있다.
5. 컴포넌트가 다음으로 렌더링될 때까지 `useEffect`의 콜백 함수는 실행되지 않는다.
6. 컴포넌트가 다음으로 렌더링될 때, 다시 의존성 배열을 비교하고 변경 여부에 따라 `useEffect`의 콜백 함수를 실행할지 결정한다.

의존성 배열이 비어있는 경우 `([])`, useEffect의 콜백 함수는 컴포넌트가 처음 렌더링될 때에만 실행되며, 컴포넌트가 언마운트될 때에만 **정리(clean-up) 함수**가 실행된다.

의존성 배열에 아무 값도 지정하지 않는 경우, 콜백 함수는 매 렌더링마다 실행되므로 주의해야 한다.

# React의 useEffect 처리 과정

위에서 useEffect의 실행 흐름을 간단하게 정리해보았다. 렌더링 과정에서 useEffect가 어떻게 처리되는지 알아보자.

React의 렌더링 과정은 크게 두 단계로 나눌 수 있다.

- **Render phase(렌더링 단계)**: React는 컴포넌트의 JSX를 해석하고, 각 함수와 훅의 호출을 추적한다.
- **Commit phase(커밋 단계)**: 이 단계에서 React는 렌더링 단계에서 계산된 변경 사항을 실제 DOM에 반영한다.

### Render phase(렌더링 단계)

React 컴포넌트는 **상태(state)**나 **속성(props)**이 변경될 때마다 렌더링 된다. 이 렌더링 과정에서 React는 컴포넌트의 JSX를 해석하고, 각 함수와 훅의 호출을 추적한다. **React는 useEffect가 있는지 확인하고, 그 호출을 '기억'한다.** `useEffect`의 첫 번째 인자로 전달된 **콜백 함수**와 두 번째 인자인 **의존성 배열**이 저장된다.

### Commit phase(커밋 단계)

이 단계에서 React는 렌더링 단계에서 계산된 변경 사항을 실제 DOM에 반영한다. 실제 DOM이 업데이트 된 직후, **React는 렌더링 단계에서 기억된 useEffect의 호출을 처리한다.**

그리고 이 때, React는 의존성 배열을 검사하여 이 배열이 변경되었는지 확인한다. 이 배열에 있는 값 중 하나라도 변경되었다면, React는 콜백 함수를 실행한다.

### 기억한다는 것은 어떤 의미일까?

위에서 조금 난해한 표현이 있긴하다. 바로 'React는 useEffect가 있는지 확인하고, 그 호출을 '기억'한다.' 라는 표현이다.🤔 이 표현을 이해하기 위해서는 많은 구글링을 했지만 명확한 답을 얻기는 조금 힘들었다.

[공식 문서](https://ko.legacy.reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components)에는 다음과 같이 설명되어 있다.

> 각 컴포넌트와 관련된 “메모리 셀”의 내부 목록이 있습니다. 이것은 단지 데이터를 넣을 수 있는 JavaScript 객체입니다. useState()와 같은 Hook을 호출하면 현재 셀을 읽거나 첫 번째 렌더링 중에 초기화한 다음 포인터를 다음 셀로 이동합니다. 이것이 여러 useState() 호출이 각각 독립적인 로컬 state를 얻는 방법입니다.

**⚠️ 이 부분은 보완이 좀 필요하다! 정확하지는 않을 수 있다. 나중에 다시 공부하고 수정할 예정이다!**

~~공식문서에서 말하는 '메모리 셀'은 React가 렌더링 될때 `Reconciliation` 과정에서 사용되는 자료구조인 **Fiber 노드**의 일부분을 말하는 것 같다.~~

~~'메모리 셀'은 각각의 useState나 useEffect와 같은 Hooks 호출에 대한 정보를 저장하며, 이들은 연결 리스트로 관리된다. 각 메모리 셀은 자신의 상태값(state, 또는 effect)과 다음 메모리 셀을 가리키는 링크(next)를 포함한다. 이러한 구조로 인해 Hooks 호출 순서에 따라 메모리 셀들이 구성되어 [호출 순서가 항상 보장된다.](https://legacy.reactjs.org/docs/hooks-rules.html#explanation)~~

# useEffect의 의존성 배열을 어떻게 감지할까?

useEffect가 의존성 배열을 어떻게 감지하는지는 [이 포스팅](https://chamdom.blog/detect-dependencies-array-changes)에서 확인할 수 있다.

# 마치며

단순하게 정리하려고 했는데 생각보다 많은 시간을 쏟게 되었다. 평소에 당연하게 `useEffect`의 사용법만 알고 사용했는데 이 훅스가 어떻게 동작하는지 생각도 못한것이 조금 부끄러웠다. 좀 더 공부해서 리액트에 코어한 부분을 이해하고 싶다.

이 포스팅에는 `render/commit phase`, `react fiber`, `diffing 알고리즘` 등에 대한 내용의 추가적인 설명이 필요하다. 설명이 많이 부족하지만 이 포스팅을 통해 조금이나마 도움이 되었으면 좋겠다.🥲

<br/>

---

# 참고

- [How does React implement hooks so that they rely on call order](https://stackoverflow.com/questions/54673188/how-does-react-implement-hooks-so-that-they-rely-on-call-order)
- [React는 Hook 호출을 컴포넌트와 어떻게 연관시키는가?](https://ko.legacy.reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components)
