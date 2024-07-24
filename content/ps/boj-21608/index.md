---
title: '[BOJ] 21608번: 상어 초등학교 (JavaScript)'
category: ps
date: 2024-07-24
tags:
  - 백준
  - gold5
  - bfs
  - 구현
---

# 문제

[21608번: 상어 초등학교](https://www.acmicpc.net/problem/21608)

### 문제 설명

상어 초등학교에는 교실이 하나 있고, 교실은 $N×N$ 크기의 격자로 나타낼 수 있다. 학교에 다니는 학생의 수는 $N^2$명이다. 오늘은 모든 학생의 자리를 정하는 날이다. 학생은 $1$번부터 $N^2$번까지 번호가 매겨져 있고, (r, c)는 r행 c열을 의미한다. 교실의 가장 왼쪽 윗 칸은 (1, 1)이고, 가장 오른쪽 아랫 칸은 (N, N)이다.

선생님은 학생의 순서를 정했고, 각 학생이 좋아하는 학생 4명도 모두 조사했다. 이제 다음과 같은 규칙을 이용해 정해진 순서대로 학생의 자리를 정하려고 한다. 한 칸에는 학생 한 명의 자리만 있을 수 있고, $|r1 - r2| + |c1 - c2| = 1$을 만족하는 두 칸이 (r1, c1)과 (r2, c2)를 인접하다고 한다.

비어있는 칸 중에서 좋아하는 학생이 인접한 칸에 가장 많은 칸으로 자리를 정한다.
1을 만족하는 칸이 여러 개이면, 인접한 칸 중에서 비어있는 칸이 가장 많은 칸으로 자리를 정한다.
2를 만족하는 칸도 여러 개인 경우에는 행의 번호가 가장 작은 칸으로, 그러한 칸도 여러 개이면 열의 번호가 가장 작은 칸으로 자리를 정한다.

학생의 만족도는 자리 배치가 모두 끝난 후에 구할 수 있다. 학생의 만족도를 구하려면 그 학생과 인접한 칸에 앉은 좋아하는 학생의 수를 구해야 한다. 그 값이 0이면 학생의 만족도는 0, 1이면 1, 2이면 10, 3이면 100, 4이면 1000이다.

학생의 만족도의 총 합을 구해보자.

### 입력

첫째 줄에 N이 주어진다. 둘째 줄부터 $N^2$개의 줄에 학생의 번호와 그 학생이 좋아하는 학생 4명의 번호가 한 줄에 하나씩 선생님이 자리를 정할 순서대로 주어진다.

학생의 번호는 중복되지 않으며, 어떤 학생이 좋아하는 학생 4명은 모두 다른 학생으로 이루어져 있다. 입력으로 주어지는 학생의 번호, 좋아하는 학생의 번호는 $N^2$보다 작거나 같은 자연수이다. 어떤 학생이 자기 자신을 좋아하는 경우는 없다.

### 출력

첫째 줄에 학생의 만족도의 총 합을 출력한다.

### 입출력

<div style={{display:'flex', justifyContent:'space-around', gap:'50px'}}>

<div style={{width:'100%'}}>

#### 예제 입력 1

```text
3
4 2 5 1 7
3 1 9 4 5
9 8 1 2 3
8 1 9 3 4
7 2 3 4 8
1 9 2 5 7
6 5 2 3 4
5 1 9 2 8
2 9 3 1 4
```

</div>

<div style={{width:'100%'}}>

#### 예제 출력 1

```text
54
```

</div>

</div>
<div style={{display:'flex', justifyContent:'space-around', gap:'50px'}}>

<div style={{width:'100%'}}>

#### 예제 입력 2

```text
3
4 2 5 1 7
2 1 9 4 5
5 8 1 4 3
1 2 9 3 4
7 2 3 4 8
9 8 4 5 7
6 5 2 3 4
8 4 9 2 1
3 9 2 1 4
```

</div>

<div style={{width:'100%'}}>

#### 예제 출력 2

```text
1053
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

const N = parseInt(input.shift(), 10);
const students = input.map(line => line.split(' ').map(Number));

const board = Array.from({ length: N }, () => Array(N).fill(null));
const likes = Array.from({ length: N * N + 1 }, () => []);

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const scores = {
  0: 0,
  1: 1,
  2: 10,
  3: 100,
  4: 1000,
};

function isValid(x, y) {
  return x >= 0 && x < N && y >= 0 && y < N;
}

function arrageStudent(student, likeFriends) {
  let maxLikes = -1;
  let maxEmpty = -1;
  let bestPosition = null;

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] !== null) continue;

      let likeCount = 0;
      let emptyCount = 0;

      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;

        if (!isValid(nr, nc)) continue;
        if (board[nr][nc] === null) emptyCount++;
        if (likeFriends.includes(board[nr][nc])) likeCount++;
      }

      if (
        likeCount > maxLikes ||
        (likeCount === maxLikes && emptyCount > maxEmpty)
      ) {
        maxLikes = likeCount;
        maxEmpty = emptyCount;
        bestPosition = [r, c];
      }
    }
  }
  const [bestR, bestC] = bestPosition;
  board[bestR][bestC] = student;
}

for (const [student, ...likeFriends] of students) {
  likes[student] = likeFriends;
  arrageStudent(student, likeFriends);
}

let answer = 0;

for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const student = board[r][c];
    const likeFriends = likes[student];
    let likeCount = 0;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (isValid(nr, nc) && likeFriends.includes(board[nr][nc])) {
        likeCount++;
      }
    }
    answer += scores[likeCount];
  }
}

console.log(answer);
```
