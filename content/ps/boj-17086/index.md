---
title: '[BOJ] 17086번: 아기상어2 (JavaScript)'
category: ps
date: 2024-07-22 08:00:00
tags:
  - 백준
  - silver2
  - 그래프
  - bfs
---

# 문제

[17086번: 아기상어2](https://www.acmicpc.net/problem/17086)

### 문제 설명

N×M 크기의 공간에 아기 상어 여러 마리가 있다. 공간은 1×1 크기의 정사각형 칸으로 나누어져 있다. 한 칸에는 아기 상어가 최대 1마리 존재한다.

어떤 칸의 안전 거리는 그 칸과 가장 거리가 가까운 아기 상어와의 거리이다. 두 칸의 거리는 하나의 칸에서 다른 칸으로 가기 위해서 지나야 하는 칸의 수이고, 이동은 인접한 8방향(대각선 포함)이 가능하다.

안전 거리가 가장 큰 칸을 구해보자.

### 입력

첫째 줄에 공간의 크기 `N`과 `M`(2 ≤ `N`, `M` ≤ 50)이 주어진다. 둘째 줄부터 `N`개의 줄에 공간의 상태가 주어지며, 0은 빈 칸, 1은 아기 상어가 있는 칸이다. 빈 칸과 상어의 수가 각각 한 개 이상인 입력만 주어진다.

### 출력

첫째 줄에 안전 거리의 최댓값을 출력한다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 입력

```text
5 4
0 0 1 0
0 0 0 0
1 0 0 0
0 0 0 0
0 0 0 1
```

</div>
<div>

#### 출력

```text
2
```

</div>
</div>

# 코드

```js
const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const [N, M] = input.shift().split(' ').map(Number);

const graph = input.map(v => v.split(' ').map(Number));
const dx = [0, 1, 1, 1, 0, -1, -1, -1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

const queue = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (graph[i][j]) queue.push([i, j]);
  }
}

while (queue.length) {
  const [x, y] = queue.shift();

  for (let i = 0; i < 8; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];

    if (nx < 0 || nx >= N || ny < 0 || ny >= M || graph[nx][ny]) continue;

    graph[nx][ny] = graph[x][y] + 1;
    queue.push([nx, ny]);
  }
}

console.log(Math.max(...graph.flat()) - 1);
```
