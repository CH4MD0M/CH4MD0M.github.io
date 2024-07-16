---
title: '[프로그래머스] 대충 만든 자판 (JavaScript)'
category: ps
date: 2023-02-23
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 대충 만든 자판](https://school.programmers.co.kr/learn/courses/30/lessons/160586)

### 문제 설명

휴대폰의 자판은 컴퓨터 키보드 자판과는 다르게 하나의 키에 여러 개의 문자가 할당될 수 있습니다. 키 하나에 여러 문자가 할당된 경우, 동일한 키를 연속해서 빠르게 누르면 할당된 순서대로 문자가 바뀝니다.

예를 들어, 1번 키에 "A", "B", "C" 순서대로 문자가 할당되어 있다면 1번 키를 한 번 누르면 "A", 두 번 누르면 "B", 세 번 누르면 "C"가 되는 식입니다.

같은 규칙을 적용해 아무렇게나 만든 휴대폰 자판이 있습니다. 이 휴대폰 자판은 키의 개수가 1개부터 최대 100개까지 있을 수 있으며, 특정 키를 눌렀을 때 입력되는 문자들도 무작위로 배열되어 있습니다. 또, 같은 문자가 자판 전체에 여러 번 할당된 경우도 있고, 키 하나에 같은 문자가 여러 번 할당된 경우도 있습니다. 심지어 아예 할당되지 않은 경우도 있습니다. 따라서 몇몇 문자열은 작성할 수 없을 수도 있습니다.

이 휴대폰 자판을 이용해 특정 문자열을 작성할 때, 키를 최소 몇 번 눌러야 그 문자열을 작성할 수 있는지 알아보고자 합니다.

1번 키부터 차례대로 할당된 문자들이 순서대로 담긴 문자열배열 `keymap`과 입력하려는 문자열들이 담긴 문자열 배열 `targets`가 주어질 때, 각 문자열을 작성하기 위해 키를 최소 몇 번씩 눌러야 하는지 순서대로 배열에 담아 return 하는 solution 함수를 완성해 주세요.

단, 목표 문자열을 작성할 수 없을 때는 -1을 저장합니다.

### 제한사항

- 1 ≤ `keymap`의 길이 ≤ 100
  - 1 ≤ `keymap`의 원소의 길이 ≤ 100
  - `keymap[i]`는 i + 1번 키를 눌렀을 때 순서대로 바뀌는 문자를 의미합니다.
    - 예를 들어 `keymap[0]` = "ABACD" 인 경우 1번 키를 한 번 누르면 A, 두 번 누르면 B, 세 번 누르면 A 가 됩니다.
  - `keymap`의 원소의 길이는 서로 다를 수 있습니다.
  - `keymap`의 원소는 알파벳 대문자로만 이루어져 있습니다.
- 1 ≤ targets의 길이 ≤ 100
  - 1 ≤ targets의 원소의 길이 ≤ 100
  - targets의 원소는 알파벳 대문자로만 이루어져 있습니다.

### 입출력 예

| keymap             | targets         | result |
| ------------------ | --------------- | ------ |
| ["ABACD", "BCEFD"] | ["ABCD","AABB"] | [9, 4] |
| ["AA"]             | ["B"]           | [-1]   |
| ["AGZ", "BSSS"]    | ["ASA","BGZ"]   | [4, 6] |

# 코드

```js
function solution(keymap, targets) {
  const answer = [];
  const map = new Map();

  for (const key of keymap) {
    for (let i = 0; i < key.length; i++) {
      if (!map.has(key[i]) || i + 1 < map.get(key[i])) map.set(key[i], i + 1);
    }
  }

  for (const target of targets) {
    let count = 0;
    for (let i = 0; i < target.length; i++) {
      count += map.get(target[i]);
    }
    answer.push(count || -1);
  }

  return answer;
}
```

# 문제 풀이

문제를 잘못 읽어서 오래걸렸다..🤬🤬🤬 문자열을 저장할 수 없을 때 -1을 `저장`하는건데 -1을 `return` 해버려서 1시간 동안 맞왜틀을 시전했다🥲

먼저 문자를 출력하기 위한 최소 횟수를 체크하면 되기 때문에 `Map` 객체를 사용했다. 그리고 keymap을 순회하면서 **1. map 객체에 key가 없거나**, **2. 문자를 누른 횟수 기존에 저장되어 있는 문자의 누른 횟수보다 작다면** 문자를 key 값으로 `i+1`을 value로 저장한다.

```js
for (const key of keymap) {
  for (let i = 0; i < key.length; i++) {
    if (!map.has(key[i]) || i + 1 < map.get(key[i])) map.set(key[i], i + 1);
  }
}
```

target 배열을 순회하면서 map 객체에서 값을 가져와 count를 증가시킨다. 이때 map객체에 값이 없다면 `undefined`가 저장되고 count값에 더하게 되면 `NaN`이 된다.

`NaN`은 falsy 값으로 평가되기 때문에 `count || -1`을 answer에 push한다.

```js
for (const target of targets) {
  let count = 0;
  for (let i = 0; i < target.length; i++) {
    count += map.get(target[i]);
  }
  answer.push(count || -1);
}
```
