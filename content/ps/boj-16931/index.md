---
title: '[BOJ] 16931번: 겉넓이 구하기(JavaScript)'
category: ps
date: 2024-08-02 12:00:00
tags:
  - 백준
  - silver2
  - 구현
  - 기하학
---

# 문제

[16931번: 겉넓이 구하기](https://www.acmicpc.net/problem/16931)

### 문제 설명

크기가 $N \times M$인 종이가 있고, 종이는 $1\times1$ 크기의 칸으로 나누어져 있다. 이 종이의 각 칸 위에 $1\times1\times1$ 크기의 정육면체를 놓아 3차원 도형을 만들었다.

<div class='resize-wrapper'>

![boj-16931-example](./image/boj-16931.png)

</div>

종이의 각 칸에 놓인 정육면체의 개수가 주어졌을 때, 이 도형의 겉넓이를 구하는 프로그램을 작성하시오.

### 입력

첫째 줄에 종이의 크기 `N`, `M`이 주어진다. 둘째 줄부터 `N`개의 줄에는 종이의 각 칸에 놓인 정육면체의 수가 주어진다.

### 출력

첫째 줄에 도형의 겉넓이를 출력한다.

### 제한

- 1 ≤ `N`, `M` ≤ 100
- 1 ≤ 종이의 한 칸에 놓인 정육면체의 수 ≤ 100

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력

```text
1 1
1
```

</div>
<div>

#### 예제 출력

```text
6
```

</div>
</div>

<div class='flex-wrapper'>
<div>

#### 예제 입력 2

```text
3 3
1 3 4
2 2 3
1 2 4
```

</div>
<div>

#### 예제 출력 2

```text
60
```

</div>
</div>

# 코드

```js
const [N, ...wordList] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n');

const target = wordList.shift();
let answer = 0;

for (let word of wordList) {
  if (
    Math.abs(target.length - word.length) > 1 ||
    Math.abs(new Set(target).size - new Set(word).size) > 1
  )
    continue;

  for (const char of target) word = word.replace(char, '');
  if (word.length < 2) answer++;
}

console.log(answer);
```
