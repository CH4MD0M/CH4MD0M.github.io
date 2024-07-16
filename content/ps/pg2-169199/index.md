---
title: '[프로그래머스] 리코쳇 로봇 (JavaScript)'
category: ps
date: 2023-03-17
tags:
  - 프로그래머스
  - lv2
---

# 문제

[연습문제 - 리코쳇 로봇](https://school.programmers.co.kr/learn/courses/30/lessons/169199)

### 문제 설명

리코쳇 로봇이라는 보드게임이 있습니다.

이 보드게임은 격자모양 게임판 위에서 말을 움직이는 게임으로, 시작 위치에서 목표 위치까지 최소 몇 번만에 도달할 수 있는지 말하는 게임입니다.

이 게임에서 말의 움직임은 상, 하, 좌, 우 4방향 중 하나를 선택해서 게임판 위의 장애물이나 맨 끝에 부딪힐 때까지 미끄러져 이동하는 것을 한 번의 이동으로 칩니다.

다음은 보드게임판을 나타낸 예시입니다.

```text
...D..R
.D.G...
....D.D
D....D.
..D....
```

여기서 "."은 빈 공간을, "R"은 로봇의 처음 위치를, "D"는 장애물의 위치를, "G"는 목표지점을 나타냅니다.
위 예시에서는 "R" 위치에서 아래, 왼쪽, 위, 왼쪽, 아래, 오른쪽, 위 순서로 움직이면 7번 만에 "G" 위치에 멈춰 설 수 있으며, 이것이 최소 움직임 중 하나입니다.

게임판의 상태를 나타내는 문자열 배열 `board`가 주어졌을 때, 말이 목표위치에 도달하는데 최소 몇 번 이동해야 하는지 return 하는 solution함수를 완성하세요. 만약 목표위치에 도달할 수 없다면 -1을 return 해주세요.

### 제한사항

- 3 ≤ `board`의 길이 ≤ 100
  - 3 ≤ `board`의 원소의 길이 ≤ 100
  - `board`의 원소의 길이는 모두 동일합니다.
  - 문자열은 ".", "D", "R", "G"로만 구성되어 있으며 각각 빈 공간, 장애물, 로봇의 처음 위치, 목표 지점을 나타냅니다.
  - "R"과 "G"는 한 번씩 등장합니다.

### 입출력 예

| board                                                   | result |
| ------------------------------------------------------- | ------ |
| ["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."] | 7      |
| [".D.R", "....", ".G..", "...D"]                        | -1     |

# 코드

```js
function canMove(x, y, dx, dy, board) {
  const nx = x + dx;
  const ny = y + dy;

  return (
    0 <= nx &&
    nx < board.length &&
    0 <= ny &&
    ny < board[0].length &&
    board[nx][ny] !== 'D'
  );
}

function solution(board) {
  const N = board.length;
  const M = board[0].length;
  let start;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'R') start = [i, j];
    }
  }

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const visited = Array.from({ length: N }, () => new Array(M).fill(false));
  visited[start[0]][start[1]] = true;

  const queue = [[start[0], start[1], 0]];
  let answer = -1;

  while (queue.length) {
    const [x, y, move] = queue.shift();

    if (board[x][y] === 'G') {
      answer = move;
      break;
    }

    for (const [dx, dy] of directions) {
      let nx = x;
      let ny = y;

      while (canMove(nx, ny, dx, dy, board)) {
        nx += dx;
        ny += dy;
      }

      if (!visited[nx][ny]) {
        queue.push([nx, ny, move + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return answer;
}
```
