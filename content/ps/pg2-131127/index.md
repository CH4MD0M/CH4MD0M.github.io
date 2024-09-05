---
title: '[프로그래머스] 할인 행사 (JavaScript)'
category: ps
date: 2024-09-05
tags:
  - 프로그래머스
  - lv2
  - 슬라이딩 윈도우
---

# 문제

[연습문제 - 할인 행사](https://school.programmers.co.kr/learn/courses/30/lessons/131127)

### 문제 설명

XYZ 마트는 일정한 금액을 지불하면 10일 동안 회원 자격을 부여합니다. XYZ 마트에서는 회원을 대상으로 매일 한 가지 제품을 할인하는 행사를 합니다. 할인하는 제품은 하루에 하나씩만 구매할 수 있습니다. 알뜰한 정현이는 자신이 원하는 제품과 수량이 할인하는 날짜와 10일 연속으로 일치할 경우에 맞춰서 회원가입을 하려 합니다.

예를 들어, 정현이가 원하는 제품이 바나나 3개, 사과 2개, 쌀 2개, 돼지고기 2개, 냄비 1개이며, XYZ 마트에서 14일간 회원을 대상으로 할인하는 제품이 날짜 순서대로 치킨, 사과, 사과, 바나나, 쌀, 사과, 돼지고기, 바나나, 돼지고기, 쌀, 냄비, 바나나, 사과, 바나나인 경우에 대해 알아봅시다. 첫째 날부터 열흘 간에는 냄비가 할인하지 않기 때문에 첫째 날에는 회원가입을 하지 않습니다. 둘째 날부터 열흘 간에는 바나나를 원하는 만큼 할인구매할 수 없기 때문에 둘째 날에도 회원가입을 하지 않습니다. 셋째 날, 넷째 날, 다섯째 날부터 각각 열흘은 원하는 제품과 수량이 일치하기 때문에 셋 중 하루에 회원가입을 하려 합니다.

정현이가 원하는 제품을 나타내는 문자열 배열 `want`와 정현이가 원하는 제품의 수량을 나타내는 정수 배열 `number`, XYZ 마트에서 할인하는 제품을 나타내는 문자열 배열 `discount`가 주어졌을 때, 회원등록시 정현이가 원하는 제품을 모두 할인 받을 수 있는 회원등록 날짜의 총 일수를 return 하는 solution 함수를 완성하시오. 가능한 날이 없으면 0을 return 합니다.

### 제한사항

- 1 ≤ `want`의 길이 = `number`의 길이 ≤ 10
  - 1 ≤ `number`의 원소 ≤ 10
  - `number[i]`는 `want[i]`의 수량을 의미하며, `number`의 원소의 합은 10입니다.
- 10 ≤ `discount`의 길이 ≤ 100,000
- `want`와 `discount`의 원소들은 알파벳 소문자로 이루어진 문자열입니다.
  - 1 ≤ `want`의 원소의 길이, `discount`의 원소의 길이 ≤ 12

### 입출력 예

| want                                       | number          | discount                                                                                                                       | result |
| ------------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------ |
| ["banana", "apple", "rice", "pork", "pot"] | [3, 2, 2, 2, 1] | ["chicken", "apple", "apple", "banana", "rice", "apple", "pork", "banana", "pork", "rice", "pot", "banana", "apple", "banana"] | 3      |
| ["apple"]                                  | [10]            | ["banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana", "banana"]                           | 0      |

# 코드

```js
function solution(want, number, discount) {
  let answer = 0;
  const wantList = new Map();

  want.forEach((item, index) => {
    wantList.set(item, number[index]);
  });

  const isValid = currentItems => {
    return want.every(item => currentItems.get(item) === wantList.get(item));
  };

  for (let i = 0; i < discount.length - 10; i++) {
    const currentMap = new Map();

    sliceArr.forEach(item => {
      currentMap.set(item, (currentMap.get(item) || 0) + 1);
    });

    want.forEach(item => {
      if (currentMap.get(item) === wantList.get(item)) count++;
    });
    if (count === want.length) answer++;
  }

  return answer;
}
```

위 풀이 방법은 할인하는 제품을 10일 간격의 부분 배열을 만들어 정현이가 원하는 제품과 수량을 충족하는지 확인하는 방법으로 접근했다.

`want[i]`, `number[i]`로 호출하지 않기 위해(직관성을 위해) `Map`객체로 정현이가 원하는 제품과 수량을 초기화했다.

```js
const wantList = new Map();

want.forEach((item, index) => {
  wantList.set(item, number[index]);
});
```

그리고 `discount` 배열을 순회하면서 10일 단위로 부분 배열을 생성하고, 부분 배열을 순회하면서 `currentMap`에 업데이트 했다.

```js
for (let i = 0; i < discount.length - 9; i++) {
  const sliceArr = discount.slice(i, i + 10);
  const currentMap = new Map();

  sliceArr.forEach(item => {
    currentMap.set(item, (currentMap.get(item) || 0) + 1);
  });
}
```

`currentMap`과 `wantMap`의 개수가 같으면 `count`를 증가시키고, <br/>
`count`가 `want.length`와 일치하면(원하는 품목과 수량이 모두 맞으면) `answer`을 증가시켰다.

```js
let count = 0;
want.forEach(item => {
  if (currentMap.get(item) === wantMap.get(item)) count++;
});
if (count === want.length) answer++;
```

# 슬라이딩 윈도우 풀이

위 풀이 방법은 시간복잡도가 좋지 못한 코드였다. 매번 부분 배열을 생성하고, 이 배열을 순회하면서 `Map`객체를 업데이트하고 비교하기 때문이다.

따라서 **슬라이딩 윈도우** 풀이로 접근해 보았다.

```js
function solution(want, number, discount) {
  let answer = 0;
  const wantList = new Map();

  want.forEach((item, index) => {
    wantList.set(item, number[index]);
  });

  for (let i = 0; i < 10; i++) {
    const item = discount[i];
    if (wantList.has(item)) {
      wantList.set(item, wantList.get(item) - 1);
    }
  }

  const isValid = () => [...wantList.values()].every(count => count <= 0);

  if (isValid()) answer++;

  for (let i = 10; i < discount.length; i++) {
    const left = discount[i - 10];
    const right = discount[i];

    if (wantList.has(left)) wantList.set(left, wantList.get(left) + 1);
    if (wantList.has(right)) wantList.set(right, wantList.get(right) - 1);

    if (isValid()) answer++;
  }

  return answer;
}
```

`wantList`를 초기화해주는 것은 이전 풀이와 같다.

```js
const wantList = new Map();

want.forEach((item, index) => {
  wantList.set(item, number[index]);
});
```

처음 10일 동안의 할인 제품을 먼저 처리한다. 이는 초기 **윈도우의 상태**를 설정하는 것이다. 이렇게 하면 11일째부터는 단순히 윈도우의 첫 날과 마지막 날만 고려하면 되어 계산이 간단해진다.

```js
for (let i = 0; i < 10; i++) {
  const item = discount[i];
  if (wantList.has(item)) {
    wantList.set(item, wantList.get(item) - 1);
  }
}
```

모든 제품의 필요 수량이 충족되었는지 체크하는 `isValid`함수를 구현한다. 그리고 첫 10일 동안 모든 원하는 제품을 살 수 있는지 체크한다.

`0` 이하를 허용함으로써, 원하는 수량보다 더 많은 제품을 구매할 수 있는 경우도 유효하다고 판단한다. 문제에서는 정확히 원하는 수량만 구매해야 한다는 제한이 없기 때문이다.

```js
const isValid = () => [...wantList.values()].every(count => count <= 0);

if (isValid()) answer++;
```

이제 슬라이딩 윈도우 기법을 사용해서 전체를 순회한다.

```js
for (let i = 10; i < discount.length; i++) {
  const left = discount[i - 10];
  const right = discount[i];

  if (wantList.has(left)) wantList.set(left, wantList.get(left) + 1);
  if (wantList.has(right)) wantList.set(right, wantList.get(right) - 1);

  if (isValid()) answer++;
}
```

#### left에 대한 연산

먼저 `left`는 10일의 첫날이 아니라 이전 순회의 `right` 값이다. 즉, 현재 **10일 윈도우에서 빠져나가는 제품**이다.

`wantList`에 해당 제품이 있다는 것은 정현이가 원하는 제품 목록에 포함된다는 의미다. 이 제품이 윈도우에서 빠져나가면, 해당 제품을 다시 구매해야 할 필요성이 생긴다. 따라서 `wantList`에서 해당 제품의 필요 수량을 1 증가시켜 주는 것이다. 만약 이 제품이 `wantList`에 없다면, 정현이가 원하지 않는 제품이므로 무시해도 된다.

#### right에 대한 연산

`right`는 이제 새로 **10일 윈도우에 들어오는 제품**이다. 따라서 새로운 할인 날짜에 이 제품을 구매할 수 있게 되었으므로 `wantList`에서 해당 제품의 필요 수량을 1 감소시킨다. 이 제품이 `wantList`에 없다면, 정현이가 원하지 않는 제품이므로 역시 무시한다.
