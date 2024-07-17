---
title: '[프로그래머스] 롤케이크 자르기 (JavaScript)'
category: ps
date: 2024-07-17
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 롤케이크 자르기](https://school.programmers.co.kr/learn/courses/30/lessons/132265)

### 문제 설명

철수는 롤케이크를 두 조각으로 잘라서 동생과 한 조각씩 나눠 먹으려고 합니다. 이 롤케이크에는 여러가지 토핑들이 일렬로 올려져 있습니다. 철수와 동생은 롤케이크를 공평하게 나눠먹으려 하는데, 그들은 롤케이크의 크기보다 롤케이크 위에 올려진 토핑들의 종류에 더 관심이 많습니다. 그래서 잘린 조각들의 크기와 올려진 토핑의 개수에 상관없이 각 조각에 동일한 가짓수의 토핑이 올라가면 공평하게 롤케이크가 나누어진 것으로 생각합니다.

예를 들어, 롤케이크에 4가지 종류의 토핑이 올려져 있다고 합시다. 토핑들을 1, 2, 3, 4와 같이 번호로 표시했을 때, 케이크 위에 토핑들이 [1, 2, 1, 3, 1, 4, 1, 2] 순서로 올려져 있습니다. 만약 세 번째 토핑(1)과 네 번째 토핑(3) 사이를 자르면 롤케이크의 토핑은 [1, 2, 1], [3, 1, 4, 1, 2]로 나뉘게 됩니다. 철수가 [1, 2, 1]이 놓인 조각을, 동생이 [3, 1, 4, 1, 2]가 놓인 조각을 먹게 되면 철수는 두 가지 토핑(1, 2)을 맛볼 수 있지만, 동생은 네 가지 토핑(1, 2, 3, 4)을 맛볼 수 있으므로, 이는 공평하게 나누어진 것이 아닙니다. 만약 롤케이크의 네 번째 토핑(3)과 다섯 번째 토핑(1) 사이를 자르면 [1, 2, 1, 3], [1, 4, 1, 2]로 나뉘게 됩니다. 이 경우 철수는 세 가지 토핑(1, 2, 3)을, 동생도 세 가지 토핑(1, 2, 4)을 맛볼 수 있으므로, 이는 공평하게 나누어진 것입니다. 공평하게 롤케이크를 자르는 방법은 여러가지 일 수 있습니다. 위의 롤케이크를 [1, 2, 1, 3, 1], [4, 1, 2]으로 잘라도 공평하게 나뉩니다. 어떤 경우에는 롤케이크를 공평하게 나누지 못할 수도 있습니다.

롤케이크에 올려진 토핑들의 번호를 저장한 정수 배열 `topping`이 매개변수로 주어질 때, 롤케이크를 공평하게 자르는 방법의 수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 1 ≤ `topping`의 길이 ≤ 1,000,000
  - 1 ≤ `topping`의 원소 ≤ 10,000

### 입출력 예

| topping                  | result |
| ------------------------ | ------ |
| [1, 2, 1, 3, 1, 4, 1, 2] | 2      |
| [1, 2, 3, 1, 4]          | 0      |

# 코드

```js
function solution(topping) {
  let answer = 0;
  const N = topping.length;
  const toppingMap = new Map();
  const brotherMap = new Map();

  for (let i = 0; i < N; i++) {
    toppingMap.set(topping[i], (toppingMap.get(topping[i]) || 0) + 1);
  }

  for (let i = 0; i < N; i++) {
    toppingMap.set(topping[i], toppingMap.get(topping[i]) - 1);
    if (toppingMap.get(topping[i]) === 0) toppingMap.delete(topping[i]);
    brotherMap.set(topping[i], (brotherMap.get(topping[i]) || 0) + 1);

    if (toppingMap.size === brotherMap.size) answer++;
  }

  return answer;
}
```

# 문제 풀이

`'뭐여 그냥 Set으로 감싸고 slice해서 비교하면 되겠네ㅋ'` 라고 생각한 멍청이.🤪

```js
function solution(topping) {
  let answer = 0;
  for (let i = 1; i < topping.length; i++) {
    const set1 = new Set(topping.slice(0, i));
    const set2 = new Set(topping.slice(i));
    if (set1.size === set2.size) answer++;
  }
  return answer;
}
```

<br/>

![test-error](./image/132265-error.png)

첫 번째 테스트케이스부터 실행시간이 심상치 않음을 느끼고 바로 실행 중단을 눌렀다.🫢

<br/>

### 시간복잡도 분석

위 코드를 보면 `for` 루프 내에서 `slice`와 `Set`을 사용했다. 따라서 시간복잡도는 다음과 같을 것이다.

$O(n)×O(n)×2=O(n^2)$

주어진 문제의 제한사항에서도 볼 수 있듯이 `topping` 배열의 길이가 최대 1,000,000일 수 있다. 이 경우, 시간복잡도가 $O(n^2)$인 **훌륭한** 위에 코드를 사용하면 다음과 같은 연산 횟수를 가지게 된다.🙃

$1,000,000×1,000,000=1,000,000,000,000$

이를 해결하기 위해 효율적인 시간복잡도를 가지는 접근법이 필요하다. 먼저 `Map`을 사용하여 토핑의 모든 갯수를 기록한다.

```js
function solution(topping) {
  const toppingMap = new Map();

  for (let i = 0; i < N; i++) {
    toppingMap.set(topping[i], (toppingMap.get(topping[i]) || 0) + 1);
  }
}
```

그리고 `topping` 배열을 순회하면서 형제 간의 분배를 확인한다. 자세한 설명은 주석으로 작성했다!

```js
for (let i = 0; i < N; i++) {
  // 현재 토핑
  const currentTopping = topping[i];

  // 현재 토핑을 toppingMap에서 하나 제거
  toppingMap.set(currentTopping, toppingMap.get(currentTopping) - 1);

  // 값이 0이어도 존재하는 것이기 때문에 값이 -1이 되는 것을 막기위해 삭제
  if (toppingMap.get(currentTopping) === 0) toppingMap.delete(currentTopping);

  // 현재 토핑을 brotherMap에 추가
  brotherMap.set(currentTopping, (brotherMap.get(currentTopping) || 0) + 1);

  // 두 Map의 크기가 같으면 answer 증가
  if (toppingMap.size === brotherMap.size) answer++;
}
```
