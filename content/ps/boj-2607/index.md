---
title: '[BOJ] 2607번: 비슷한 단어 (JavaScript)'
category: ps
date: 2024-08-02 11:00:00
tags:
  - 백준
  - silver2
  - 구현
  - 문자열
---

# 문제

[2607번: 비슷한 단어](https://www.acmicpc.net/problem/2607)

### 문제 설명

영문 알파벳 대문자로 이루어진 두 단어가 다음의 두 가지 조건을 만족하면 같은 구성을 갖는다고 말한다.

1. 두 개의 단어가 같은 종류의 문자로 이루어져 있다.
2. 같은 문자는 같은 개수 만큼 있다.

<br/>

예를 들어 "DOG"와 "GOD"은 둘 다 'D', 'G', 'O' 세 종류의 문자로 이루어져 있으며 양쪽 모두 'D', 'G', 'O' 가 하나씩 있으므로 이 둘은 같은 구성을 갖는다. 하지만 "GOD"과 "GOOD"의 경우 "GOD"에는 'O'가 하나, "GOOD"에는 'O'가 두 개 있으므로 이 둘은 다른 구성을 갖는다.

<br/>

두 단어가 같은 구성을 갖는 경우, 또는 한 단어에서 한 문자를 더하거나, 빼거나, 하나의 문자를 다른 문자로 바꾸어 나머지 한 단어와 같은 구성을 갖게 되는 경우에 이들 두 단어를 서로 비슷한 단어라고 한다.

<br/>

예를 들어 "DOG"와 "GOD"은 같은 구성을 가지므로 이 둘은 비슷한 단어이다. 또한 "GOD"에서 'O'를 하나 추가하면 "GOOD" 과 같은 구성을 갖게 되므로 이 둘 또한 비슷한 단어이다. 하지만 "DOG"에서 하나의 문자를 더하거나, 빼거나, 바꾸어도 "DOLL"과 같은 구성이 되지는 않으므로 "DOG"과 "DOLL"은 비슷한 단어가 아니다.

<br/>

입력으로 여러 개의 서로 다른 단어가 주어질 때, 첫 번째 단어와 비슷한 단어가 모두 몇 개인지 찾아 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에는 단어의 개수가 주어지고 둘째 줄부터는 한 줄에 하나씩 단어가 주어진다. 모든 단어는 영문 알파벳 대문자로 이루어져 있다. 단어의 개수는 100개 이하이며, 각 단어의 길이는 10 이하이다.

### 출력

입력으로 주어진 첫 번째 단어와 비슷한 단어가 몇 개인지 첫째 줄에 출력한다.

### 입출력

<div class='flex-wrapper'>
<div>

#### 예제 입력

```text
4
DOG
GOD
GOOD
DOLL
```

</div>
<div>

#### 예제 출력

```text
2
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