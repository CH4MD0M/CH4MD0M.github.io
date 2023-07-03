---
title: 'React: Virtual DOM이란?'
category: react
date: 2023-04-10
tags:
  - virtualDOM
  - reconciliation
---

# Virtual DOM의 도입 배경

> Virtual DOM을 이해하기 위해 브라우저 렌더링 과정에 대해 알면 좋을 것이다. 자세한 설명은 [여기](https://chamdom.blog/)에서 확인할 수 있다.

Virtual DOM이 도입되기 이전에는, 웹 페이지에서 동적인 UI를 구현하기 위해서는 JavaScript를 이용하여 DOM을 직접 조작해야 했다. 예를 들어, 버튼을 클릭했을 때 특정 요소를 추가하거나 삭제하거나, 값을 변경하는 등의 작업을 수행하기 위해서는 해당 요소의 DOM 노드에 접근하여 변경해야 했다.

DOM을 변경하면, DOM Tree를 다시 렌더링하고, 레이아웃을 다시 계산하고, 화면을 다시 그리는 등의 과정을 거쳐야 한다. 이 과정은 브라우저에서 비용이 큰 연산 중 하나이며, DOM 조작이 많은 웹 애플리케이션에서는 성능 문제가 발생할 수 있다.

현대 웹 애플리케이션은 복잡한 UI를 가지고 있고 대부분 동적으로 데이터가 변경되며, 이에 따라 DOM도 동적으로 변경된다. 위에 언급했듯이 DOM은 웹 브라우저에서 비용이 큰 연산 중 하나이기 때문에, DOM 조작이 많은 웹 애플리케이션에서는 성능 문제가 발생할 수 있다. React는 이러한 문제를 해결하기 위해 **Virtual DOM**을 도입하였다.

# DOM과 Virtual DOM

먼저 DOM과 Virtual DOM에 대한 정의는 다음과 같다.

**(Document Object Model)** <br/>
**DOM**은 HTML 문서를 객체로 표현한 것이다. DOM은 HTML 문서를 트리 구조로 표현하며, 각각의 노드는 객체이다. DOM은 HTML 문서의 구조를 표현하고, CSS를 통해 스타일을 지정하고, JavaScript를 통해 동적으로 문서를 조작할 수 있다.

**Virtual DOM** <br/>
**Virtual DOM**은 DOM의 추상화된 개념으로, 실제 DOM에 접근하지 않고 메모리 상에서 빠르게 업데이트를 처리할 수 있다. Virtual DOM은 DOM의 상태를 가지고 있으며, 이를 통해 DOM의 변경 사항을 추적할 수 있다. 그리고 실제 DOM에 접근하지 않기 때문에 빠르게 업데이트를 처리할 수 있다.

### DOM은 느리기만 할까?

검색하다보니 실제 DOM 조작은 상대적으로 느리고 비효율적인 작업이라는 설명을 자주 볼 수 있었다. 그렇다면 DOM은 Virtual DOM과 비교해서 항상 느리고 비효율적이기만 한 것일까? **결론부터 말하자면 아니다!**

작은 규모의 웹 애플리케이션이나 정적인 웹 페이지의 경우 DOM 조작이 비교적 적게 발생되어 Virtual DOM의 성능 향상 효과가 크지 않을 수 있다. 또한, 개별적인 DOM 요소에 대한 작은 변화가 필요한 경우, 직접 DOM 조작이 더 빠르고 적절할 수 있다. Virtual DOM은 전체 DOM 트리를 비교하고 업데이트하기 때문에, 개별 요소에 대한 작은 변화에 대해서는 더 높은 오버헤드를 가질 수 있다. 즉, **DOM은 Virtual DOM보다 항상 느린 것이 아니라, 상황에 따라 다르다는 것이다.**

**그런데 왜 DOM이 느리다고 하는 걸까?** <br/>
이는 DOM이 현재 웹 트렌드와 맞지 않는 성격을 가지고 있기 때문이다. 초기 웹 애플리케이션은 비교적 단순한 구조를 가지고 있었으나, 웹 기술의 발전과 함께 웹 애플리케이션은 점점 복잡해졌다. 이로 인해 실제 DOM에 대한 조작이 빈번하게 발생하게 되었다. 이러한 DOM에 대한 조작 과정(DOM의 구조를 변경하고, 레이아웃을 다시 계산하고(reflow), 화면을 다시 그리는(repaint) 등의 과정)은 브라우저의 성능을 저하시키는 주요 원인이 되었다.

# Virtual DOM의 동작 과정

Virtual DOM은 실제 DOM에 접근하지 않고 **메모리 상에서 빠르게 업데이트를 처리할 수 있다**고 했다. 이 과정은 크게 3가지 단계로 이루어진다.

1. **Virtual DOM 생성** <br/>
   Virtual DOM은 JavaScript 객체로 구성된 트리 구조다. 컴포넌트의 상태가 변경될 때마다 Virtual DOM 트리가 새로 생성된다. 이 생성 과정은 메모리 상에서 이루어지므로(in-memory) 상대적으로 빠르게 처리된다.

2. **재조정(reconciliation)** <br/>
   새로운 Virtual DOM 트리가 생성되면 이전 트리와 비교하는 과정이 이루어진다. 이 과정에서 이전 Virtual DOM과 새로 생성된 Virtual DOM을 비교하여 변경된 부분을 찾아낼 수 있다.

3. **DOM 업데이트** <br/>
   이전 과정을 통해 찾아낸 변경 사항을 실제 DOM에 반영한다. 이렇게 하면 불필요한 DOM 조작을 줄일 수 있고, 성능을 향상시킬 수 있다.

# Reconciliation

Virtual DOM은 어떻게 변경된 부분을 찾아낼 수 있을까? <br/>
React는 재조정(reconciliation) 과정에서 **비교 알고리즘(Diffing Algorithm)**을 사용하여 Virtual DOM 트리를 순회하며 변경된 부분을 찾아낸다. 기존의 DOM Tree 탐색 알고리즘은 $O(n^3)$의 시간 복잡도를 가지고 있었지만, React는 $O(n)$의 시간 복잡도를 가지는 탐색 알고리즘을 사용한다.

### 비교 알고리즘(Diffing Algorithm)

공식 문서에 나와 있는 비교 알고리즘의 과정을 요약하면 다음과 같다.

**루트 엘리먼트 비교** <br/>
React는 두 개의 트리를 비교할 때 루트 엘리먼트부터 시작한다. 이후의 동작은 루트 엘리먼트의 타입에 따라 달라진다.

**엘리먼트 타입이 다른 경우** <br/>
두 개의 엘리먼트 타입이 다르면 React는 이전 트리의 엘리먼트를 버리고 새로운 트리의 엘리먼트를 생성한다. 이 과정에서 이전 DOM 노드는 파괴되고 새로운 DOM 노드가 생성된다.

**DOM 엘리먼트의 타입이 같은 경우** <br/>
같은 타입의 두 React DOM 엘리먼트를 비교할 때, React는 두 엘리먼트의 속성을 확인하여, 동일한 내역은 유지하고 변경된 속성들만 갱신한다. DOM 노드의 처리가 끝나면, React는 해당 노드의 자식 노드들을 재귀적으로 비교한다.

```jsx
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

위 코드의 두 엘리먼트를 비교하면, `className` 속성만 변경되었기 때문에, React는 `className` 속성만 갱신한다.

```jsx
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

위 코드의 두 엘리먼트를 비교하면, `style` 속성의 `color` 값만 변경되었기 때문에, React는 `color` 속성만 갱신한다.

**자식에 대한 재귀적 처리** <br/>
DOM 노드의 자식들을 재귀적으로 처리할 때, React는 기본적으로 동시에 두 리스트를 순회하고 차이점이 있으면 변경을 생성한다.

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```

위 코드와 같이 자식의 끝에 새로운 엘리먼트를 추가하면 두 트리 사이의 변경은 잘 작동될 것이다.

```jsx
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>zero</li>
  <li>first</li>
  <li>second</li>
</ul>
```

하지만 위 코드와 같이 자식의 시작에 새로운 엘리먼트를 추가하면, React는 두 트리 사이의 변경을 잘 작동시키지 못한다. `<li>first</li>`와 `<li>second</li>` 종속 트리를 그대로 유지하는 대신 모든 자식을 새로 생성한다.

### Keys

위와 같은 문제를 해결하기 위해 React는 `key`라는 특수한 문자열 속성을 제공한다. `key`는 엘리먼트가 배열 내부에서 고유하다는 것을 React에게 알려준다. `key`가 없는 엘리먼트는 인덱스를 기반으로 `key`를 자동으로 생성한다.

```jsx
<ul>
  <li key="A">first</li>
  <li key="B">second</li>
</ul>

<ul>
  <li key='C'>zero</li>
  <li key="A">first</li>
  <li key="B">second</li>
</ul>
```

이제 React는 `'C'` key를 가진 엘리먼트를 추가하고, `'A'`와 `'B'` key를 가진 엘리먼트를 그대로 유지한다.

# 마치며

React의 Virtual DOM과 처리 과정에 대해 살펴보았다. Virtual DOM이 무조건 DOM보다 빠르며 우수한 것이 아니라는 것을 알 수 있었다. [velopert님 블로그](https://velopert.com/3236)에서 언급된 Redux 창시자이자 React 개발팀원인 Dan Abramov 의 트윗에 따르면, "React가 DOM보다 빠른 것은 아니다. React는 수행해야 할 작업이 더 많기 때문이다. 그러나 React가 유지 관리하기 쉬운 애플리케이션을 만드는데 도움이 되고, 실제 사용 사례에서 **충분히 빠르다.**" 라고 한다. React를 사용하더라도 최적화 작업이 중요하다는 것을 알 수 있었다.

# 참고

- [React 공식 문서 - 재조정(Reconciliation)](https://ko.reactjs.org/docs/reconciliation.html)
- [virtual DOM](https://velog.io/@sbinha/React%EC%97%90%EC%84%9C-Virtual-DOM)
- [ReactJS의 Virtual DOM과 Repaint, Reflow](https://blog.drakejin.me/React-VirtualDOM-And-Repaint-Reflow/)
- [Virtual DOM 동작 원리와 이해 (with 브라우저의 렌더링 과정)](https://jeong-pro.tistory.com/210)
