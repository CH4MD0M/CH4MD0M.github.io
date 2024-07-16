---
title: '[프로그래머스] 달리기 경주 (JavaScript)'
category: ps
date: 2023-04-06
tags:
  - 프로그래머스
  - lv1
---

# 문제

[연습문제 - 달리기 경주](https://school.programmers.co.kr/learn/courses/30/lessons/178871)

### 문제 설명

얀에서는 매년 달리기 경주가 열립니다. 해설진들은 선수들이 자기 바로 앞의 선수를 추월할 때 추월한 선수의 이름을 부릅니다. 예를 들어 1등부터 3등까지 "mumu", "soe", "poe" 선수들이 순서대로 달리고 있을 때, 해설진이 "soe"선수를 불렀다면 2등인 "soe" 선수가 1등인 "mumu" 선수를 추월했다는 것입니다. 즉 "soe" 선수가 1등, "mumu" 선수가 2등으로 바뀝니다.

선수들의 이름이 1등부터 현재 등수 순서대로 담긴 문자열 배열 `players`와 해설진이 부른 이름을 담은 문자열 배열 `callings`가 매개변수로 주어질 때, 경주가 끝났을 때 선수들의 이름을 1등부터 등수 순서대로 배열에 담아 return 하는 solution 함수를 완성해주세요.

### 제한사항

- 5 ≤ players의 길이 ≤ 50,000
  - players[i]는 i번째 선수의 이름을 의미합니다.
  - players의 원소들은 알파벳 소문자로만 이루어져 있습니다.
  - players에는 중복된 값이 들어가 있지 않습니다.
  - 3 ≤ players[i]의 길이 ≤ 10
- 2 ≤ callings의 길이 ≤ 1,000,000
  - `callings`는 `players`의 원소들로만 이루어져 있습니다.
  - 경주 진행중 1등인 선수의 이름은 불리지 않습니다.

### 입출력 예

| players                               | callings                       | result                                |
| ------------------------------------- | ------------------------------ | ------------------------------------- |
| ["mumu", "soe", "poe", "kai", "mine"] | ["kai", "kai", "mine", "mine"] | ["mumu", "kai", "mine", "soe", "poe"] |

# 코드

```js
function solution(players, callings) {
  const answer = [...players];
  const playerMap = {};

  for (let i = 0; i < players.length; i++) {
    playerMap[players[i]] = i;
  }

  for (let i = 0; i < callings.length; i++) {
    const curPlayer = callings[i];
    const curIdx = playerMap[curPlayer];
    const prevIdx = curIdx - 1;
    const prevPlayer = answer[prevIdx];

    [answer[curIdx], answer[prevIdx]] = [prevPlayer, curPlayer];
    [playerMap[curPlayer], playerMap[prevPlayer]] = [prevIdx, curIdx];
  }

  return answer;
}
```

# 문제 풀이

먼저 `players` 배열을 복사한 `answer` 배열과 `playerMap` 객체를 생성하고 초기화한다. `playerMap` 객체는 각 플레이어의 이름과 인덱스를 연결하는 객체다.

```js
const answer = [...players];
const playerMap = {};

for (let i = 0; i < players.length; i++) {
  playerMap[players[i]] = i;
}
```

`callings`를 순회하면서 현재 선택된 플레이어와 해당 인덱스를 `curPlayer`와 `curIdx` 변수에 저장한다. 그리고 이전 플레이어와 인덱스를 `prevPlayer`와 `prevIdx` 변수에 저장한다.

```js
for (let i = 0; i < callings.length; i++) {
  const curPlayer = callings[i];
  const curIdx = playerMap[curPlayer];
  const prevIdx = curIdx - 1;
  const prevPlayer = answer[prevIdx];
  // ...
}
```

배열 구조 분해 문법을 사용하여 `curPlayer`와 `prevPlayer`의 위치를 서로 바꾼다. 이를 통해 `answer` 배열에 저장된 플레이어의 위치가 업데이트된다. 동시에 `playerMap` 객체도 업데이트되어 현재 플레이어와 이전 플레이어의 인덱스를 서로 바꿔준다.

```js
[answer[curIdx], answer[prevIdx]] = [prevPlayer, curPlayer];
[playerMap[curPlayer], playerMap[prevPlayer]] = [prevIdx, curIdx];
```
