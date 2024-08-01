---
title: '[BOJ] 1138번: 한 줄로 서기 (JavaScript)'
category: ps
date: 2024-08-01 11:00:00
tags:
  - 백준
  - silver2
  - 정렬
---

# 문제

[1138번: 한 줄로 서기](https://www.acmicpc.net/problem/1138)

### 문제 설명

N명의 사람들은 매일 아침 한 줄로 선다. 이 사람들은 자리를 마음대로 서지 못하고 오민식의 지시대로 선다.

어느 날 사람들은 오민식이 사람들이 줄 서는 위치를 기록해 놓는다는 것을 알았다. 그리고 아침에 자기가 기록해 놓은 것과 사람들이 줄을 선 위치가 맞는지 확인한다.

사람들은 자기보다 큰 사람이 왼쪽에 몇 명 있었는지만을 기억한다. N명의 사람이 있고, 사람들의 키는 1부터 N까지 모두 다르다.

각 사람들이 기억하는 정보가 주어질 때, 줄을 어떻게 서야 하는지 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 사람의 수 N이 주어진다. N은 10보다 작거나 같은 자연수이다. 둘째 줄에는 키가 1인 사람부터 차례대로 자기보다 키가 큰 사람이 왼쪽에 몇 명이 있었는지 주어진다. i번째 수는 0보다 크거나 같고, N-i보다 작거나 같다. i는 0부터 시작한다.

### 출력

첫째 줄에 줄을 선 순서대로 키를 출력한다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력 1

```text
4
2 1 1 0
```

</div>
<div>

#### 예제 출력 1

```text
4 2 1 3
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 2

```text
5
0 0 0 0 0
```

</div>
<div>

#### 예제 출력 2

```text
1 2 3 4 5
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 3

```text
6
5 4 3 2 1 0
```

</div>
<div>

#### 예제 출력 3

```text
6 5 4 3 2 1
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 4

```text
7
6 1 1 1 2 0 0
```

</div>
<div>

#### 예제 출력 4

```text
6 2 3 4 7 5 1
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
const leftCounts = input[0].split(' ').map(Number);

const answer = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  let count = 0;
  for (let j = 0; j < N; j++) {
    if (answer[j] === 0) {
      if (count === leftCounts[i]) {
        answer[j] = i + 1;
        break;
      }
      count++;
    }
  }
}

console.log(answer.join(' '));
```

# 문제 풀이

키가 가장 작은 사람부터 시작하여 키가 가장 큰 사람 순서로 배치한다.

각 사람을 배치할 때,

1. 배열을 순회하면서 빈 자리(0)를 만날 때마다 count를 증가시킨다.
2. `count`가 그 사람의 `leftCounts` 값과 같아지면, 그 자리에 그 사람을 배치한다.

<br/>

키가 작은 순서대로 배치하고 있기 때문에 <u>현재 배치하려는 사람보다 키가 큰 사람은 아직 배치되지 않았다.</u>
따라서, 현재까지 배치된 모든 사람들은 현재 사람보다 키가 작다.

<br/>

그래서 빈 자리를 만날 때마다 `count`를 증가시키는 것은 <u>이 자리에 나보다 키가 큰 사람이 올 수 있는 경우</u>를 세는 것과 같다. 실제로 그 자리에 누가 올지는 아직 모르지만, 그 자리는 <u>나보다 키가 큰 사람이 올 수 있는 자리</u>다.

<br/>

`count`가 `leftCounts[i]`와 같아지는 순간에는 그 사람의 왼쪽에 있어야 할 <u>키가 큰 사람들의 자리</u>를 모두 확보한 것이다. 따라서 그 자리가 바로 그 사람이 서야 할 올바른 위치가 된다.
