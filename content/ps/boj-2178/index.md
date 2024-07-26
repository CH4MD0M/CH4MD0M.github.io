---
title: '[BOJ] 2178번: 미로 탐색 (JavaScript)'
category: ps
date: 2024-07-26 11:00:00
tags:
  - 백준
  - silver1
  - 그래프
  - bfs
---

# 문제

[2178번: 미로 탐색](https://www.acmicpc.net/problem/2178)

### 문제 설명

$N×M$크기의 배열로 표현되는 미로가 있다.

<div class='no-header'>

|     |     |     |     |     |     |
| --- | --- | --- | --- | --- | --- |
| 1   | 0   | 1   | 1   | 1   | 1   |
| 1   | 0   | 1   | 0   | 1   | 0   |
| 1   | 0   | 1   | 0   | 1   | 1   |
| 1   | 1   | 1   | 0   | 1   | 1   |

</div>

미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

### 입력

첫째 줄에 두 정수 `N`, `M`(2 ≤ `N`, `M` ≤ 100)이 주어진다. 다음 `N`개의 줄에는 `M`개의 정수로 미로가 주어진다. 각각의 수들은 붙어서 입력으로 주어진다.

### 출력

첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력 1

```text
4 6
101111
101010
101011
111011
```

</div>
<div>

#### 예제 출력 1

```text
15
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 2

```text
4 6
110110
110110
111111
111101
```

</div>
<div>

#### 예제 출력 2

```text
9
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 3

```text
2 25
1011101110111011101110111
1110111011101110111011101
```

</div>
<div>

#### 예제 출력 3

```text
38
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 4

```text
7 7
1011111
1110001
1000001
1000001
1000001
1000001
1111111
```

</div>
<div>

#### 예제 출력 4

```text
13
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
const graph = input.map(line => line.split('').map(Number));
const visited = Array.from({ length: N }, () => Array(M).fill(0));
const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function isValid(x, y) {
  return x >= 0 && x < N && y >= 0 && y < M;
}

const queue = [[0, 0]];
visited[0][0] = 1;

while (queue.length) {
  const [x, y] = queue.shift();

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;

    if (!isValid(nx, ny)) continue;
    if (!graph[nx][ny] || visited[nx][ny]) continue;
    visited[nx][ny] = visited[x][y] + 1;
    queue.push([nx, ny]);
  }
}

console.log(visited[N - 1][M - 1]);
```
