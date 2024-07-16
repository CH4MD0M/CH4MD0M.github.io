---
title: '[프로그래머스] 연속된 부분 수열의 합 (JavaScript)'
category: ps
date: 2023-04-06
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 연속된 부분 수열의 합](https://school.programmers.co.kr/learn/courses/30/lessons/178870)

### 문제 설명

비내림차순으로 정렬된 수열이 주어질 때, 다음 조건을 만족하는 부분 수열을 찾으려고 합니다.

- 기존 수열에서 임의의 두 인덱스의 원소와 그 사이의 원소를 모두 포함하는 부분 수열이어야 합니다.
- 부분 수열의 합은 `k`입니다.
- 합이 `k`인 부분 수열이 여러 개인 경우 길이가 짧은 수열을 찾습니다.
- 길이가 짧은 수열이 여러 개인 경우 앞쪽(시작 인덱스가 작은)에 나오는 수열을 찾습니다.

수열을 나타내는 정수 배열 `sequence`와 부분 수열의 합을 나타내는 정수 `k`가 매개변수로 주어질 때, 위 조건을 만족하는 부분 수열의 시작 인덱스와 마지막 인덱스를 배열에 담아 return 하는 solution 함수를 완성해주세요. 이때 수열의 인덱스는 0부터 시작합니다.

### 제한사항

- 5 ≤ sequence의 길이 ≤ 1,000,000
  - 1 ≤ sequence의 원소 ≤ 1,000
  - sequence는 비내림차순으로 정렬되어 있습니다.
- 5 ≤ k ≤ 1,000,000,000
  - k는 항상 sequence의 부분 수열로 만들 수 있는 값입니다.

### 입출력 예

| sequence              | k   | result |
| --------------------- | --- | ------ |
| [1, 2, 3, 4, 5]       | 7   | [2, 3] |
| [1, 1, 1, 2, 3, 4, 5] | 5   | [6, 6] |
| [2, 2, 2, 2, 2]       | 6   | [0, 2] |

# 코드

```js
function solution(sequence, k) {
  let minLength = Infinity;
  let startIdx = 0;
  let endIdx = 0;
  let sum = sequence[0];

  for (let i = 0, j = 1; i < sequence.length; ) {
    if (sum === k) {
      const length = j - i;
      if (length < minLength) {
        minLength = length;
        startIdx = i;
        endIdx = j - 1;
      }
      sum -= sequence[i++];
    } else if (sum < k) {
      if (j === sequence.length) break;
      sum += sequence[j++];
    } else if (sum > k) {
      sum -= sequence[i++];
    }
  }

  return [startIdx, endIdx];
}
```

# 문제 풀이

이 문제는 `sequence` 배열에서 부분 배열의 합이 `k`와 같은 부분 배열을 찾는 문제다. 단, 부분 배열의 길이가 가장 짧은 것을 찾아야 한다. 부분 배열을 찾는 것은 누적 합을 이용하여 찾는다.

부분 배열의 길이가 가장 짧은 것을 찾아야 하므로 `minLength`라는 변수를 만들어서 부분 배열의 길이를 저장한다. `minLength`의 초기값은 `Infinity`로 설정한다. <br/>
`startIdx`와 `endIdx`는 부분 배열의 시작 인덱스와 끝 인덱스를 나타내며, `sum`은 부분 배열의 누적 합을 저장할 변수다.

```js
let minLength = Infinity;
let startIdx = 0;
let endIdx = 0;
let sum = sequence[0];
```

`sequence` 배열을 순회하면서 부분 배열의 합이 `k`와 같은 부분 배열을 찾는다. `i`와 `j`는 각각 부분 배열의 시작과 끝을 가리키는 인덱스다.

```js
for (let i = 0, j = 1; i < sequence.length; ) {
  // ...
}
```

부분 배열의 합이 `k`와 같은 경우, 부분 배열의 길이를 구한다. 부분 배열의 길이가 `minLength`보다 작은 경우, `minLength`를 부분 배열의 길이로 갱신하고, `startIdx`와 `endIdx`를 갱신한다.

```js
if (sum === k) {
  const length = j - i;
  if (length < minLength) {
    minLength = length;
    startIdx = i;
    endIdx = j - 1;
  }
  sum -= sequence[i++];
}
```

부분 배열의 합이 `k`보다 작은 경우, `j`를 증가시키면서 부분 배열의 합을 늘린다.

```js
else if (sum < k) {
  if (j === sequence.length) break;
  sum += sequence[j++];
}
```

부분 배열의 합이 `k`보다 큰 경우, `i`를 증가시키면서 부분 배열의 합을 줄인다.

```js
else if (sum > k) {
  sum -= sequence[i++];
}
```

반복문이 끝나면 `startIdx`와 `endIdx`를 반환한다.

```js
return [startIdx, endIdx];
```
