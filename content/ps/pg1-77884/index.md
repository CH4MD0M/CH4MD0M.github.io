---
title: '[프로그래머스] 약수의 개수와 덧셈 (JavaScript)'
category: ps
date: 2022-09-06
tags:
  - 프로그래머스
  - 월간 코드 챌린지 시즌2
  - lv1
---

# 문제

[월간 코드 챌린지 시즌2 - 약수의 개수와 덧셈](https://school.programmers.co.kr/learn/courses/30/lessons/77884)

### 문제 설명

두 정수 `left`와 `right`가 매개변수로 주어집니다. `left`부터 `right`까지의 모든 수들 중에서, 약수의 개수가 짝수인 수는 더하고, 약수의 개수가 홀수인 수는 뺀 수를 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 1 ≤ `left` ≤ `right` ≤ 1,000

### 입출력 예

| left | right | result |
| ---- | ----- | ------ |
| 13   | 17    | 43     |
| 24   | 27    | 2      |

# 코드

```js
function solution(left, right) {
  let answer = 0;

  for (let num = left; num <= right; num++) {
    let count = 0;
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) count++;
    }
    answer = count % 2 === 0 ? answer + num : answer - num;
  }

  return answer;
}
```

# 다른 풀이

약수의 개수가 짝수인지 홀수인지를 판별하기 위해 주어진 수의 제곱근이 정수인지 확인하면된다. 주어진 수의 제곱근이 정수일 경우, 약수의 개수가 홀수가 되며, 그렇지 않으면 약수의 개수가 짝수가 된다.

```js
function solution(left, right) {
  let answer = 0;

  for (let num = left; num <= right; num++)
    answer += Math.sqrt(num) % 1 ? num : -num;

  return answer;
}
```
