---
title: '[BOJ] 2477번: 참외밭 (JavaScript)'
category: ps
date: 2024-08-01 12:00:00
tags:
  - 백준
  - silver2
  - 구현
  - 배열순환
---

# 문제

[2477번: 참외밭](https://www.acmicpc.net/problem/2477)

### 문제 설명

시골에 있는 태양이의 삼촌 댁에는 커다란 참외밭이 있다. 문득 태양이는 이 밭에서 자라는 참외가 도대체 몇 개나 되는지 궁금해졌다. 어떻게 알아낼 수 있는지 골똘히 생각하다가 드디어 좋은 아이디어가 떠올랐다. 유레카! 1$m^2$의 넓이에 자라는 참외 개수를 헤아린 다음, 참외밭의 넓이를 구하면 비례식을 이용하여 참외의 총개수를 구할 수 있다.

<br/>

1$m^2$의 넓이에 자라는 참외의 개수는 헤아렸고, 이제 참외밭의 넓이만 구하면 된다. 참외밭은 ㄱ-자 모양이거나 ㄱ-자를 90도, 180도, 270도 회전한 모양(┏, ┗, ┛ 모양)의 육각형이다. 다행히도 밭의 경계(육각형의 변)는 모두 동서 방향이거나 남북 방향이었다. 밭의 한 모퉁이에서 출발하여 밭의 둘레를 돌면서 밭경계 길이를 모두 측정하였다.

<br/>

예를 들어 참외밭이 위 그림과 같은 모양이라고 하자. 그림에서 오른쪽은 동쪽, 왼쪽은 서쪽, 아래쪽은 남쪽, 위쪽은 북쪽이다. 이 그림의 왼쪽위 꼭짓점에서 출발하여, 반시계방향으로 남쪽으로 30m, 동쪽으로 60m, 남쪽으로 20m, 동쪽으로 100m, 북쪽으로 50m, 서쪽으로 160m 이동하면 다시 출발점으로 되돌아가게 된다.

<br/>

위 그림의 참외밭 면적은 6800$m^2$이다. 만약 1$m^2$의 넓이에 자라는 참외의 개수가 7이라면, 이 밭에서 자라는 참외의 개수는 47600으로 계산된다.

<br/>

1$m^2$의 넓이에 자라는 참외의 개수와, 참외밭을 이루는 육각형의 임의의 한 꼭짓점에서 출발하여 반시계방향으로 둘레를 돌면서 지나는 변의 방향과 길이가 순서대로 주어진다. 이 참외밭에서 자라는 참외의 수를 구하는 프로그램을 작성하시오.

### 입력

첫 번째 줄에 1$m^2$의 넓이에 자라는 참외의 개수를 나타내는 양의 정수 K (1 ≤ K ≤ 20)가 주어진다. 참외밭을 나타내는 육각형의 임의의 한 꼭짓점에서 출발하여 반시계방향으로 둘레를 돌면서 지나는 변의 방향과 길이 (1 이상 500 이하의 정수) 가 둘째 줄부터 일곱 번째 줄까지 한 줄에 하나씩 순서대로 주어진다. 변의 방향에서 동쪽은 1, 서쪽은 2, 남쪽은 3, 북쪽은 4로 나타낸다.

### 출력

첫째 줄에 입력으로 주어진 밭에서 자라는 참외의 수를 출력한다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력 1

```text
7
4 50
2 160
3 30
1 60
3 20
1 100
```

</div>
<div>

#### 예제 출력

```text
47600
```

</div>
</div>

# 코드

```js
const [K, ...input] = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : './input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(val => val.split(' ').map(Number));

const { bigRecWidth, bigRecHeight } = input.reduce(
  (acc, item, idx) => {
    if ([1, 2].includes(item[0])) {
      if (item[1] > acc.bigRecWidth.val)
        acc.bigRecWidth = { val: item[1], idx };
    } else {
      if (item[1] > acc.bigRecHeight.val) {
        acc.bigRecHeight = { val: item[1], idx };
      }
    }
    return acc;
  },
  {
    bigRecWidth: { val: 0, idx: 0 },
    bigRecHeight: { val: 0, idx: 0 },
  },
);

const samllRecWidth = Math.abs(
  input[(bigRecWidth.idx + 5) % 6][1] - input[(bigRecWidth.idx + 1) % 6][1],
);
const samllRecHeight = Math.abs(
  input[(bigRecHeight.idx + 5) % 6][1] - input[(bigRecHeight.idx + 1) % 6][1],
);

console.log(
  K * (bigRecWidth.val * bigRecHeight.val - samllRecWidth * samllRecHeight),
);
```
