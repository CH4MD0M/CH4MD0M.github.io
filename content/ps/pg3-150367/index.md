---
title: '[프로그래머스] 표현 가능한 이진트리 (JavaScript)'
category: ps
date: 2023-03-02
tags:
  - 프로그래머스
  - 2023 KAKAO TECH INTERNSHIP
  - lv3
---

# 문제

[2023 KAKAO TECH INTERNSHIP - 표현 가능한 이진트리](https://school.programmers.co.kr/learn/courses/30/lessons/150367)

### 문제 설명

당신은 이진트리를 수로 표현하는 것을 좋아합니다.

이진트리를 수로 표현하는 방법은 다음과 같습니다.

1. 이진수를 저장할 빈 문자열을 생성합니다.
2. 주어진 이진트리에 더미 노드를 추가하여 포화 이진트리로 만듭니다. 루트 노드는 그대로 유지합니다.
3. 만들어진 포화 이진트리의 노드들을 가장 왼쪽 노드부터 가장 오른쪽 노드까지, 왼쪽에 있는 순서대로 살펴봅니다. 노드의 높이는 살펴보는 순서에 영향을 끼치지 않습니다.
4. 살펴본 노드가 더미 노드라면, 문자열 뒤에 0을 추가합니다. 살펴본 노드가 더미 노드가 아니라면, 문자열 뒤에 1을 추가합니다.
5. 문자열에 저장된 이진수를 십진수로 변환합니다.

이진트리에서 리프 노드가 아닌 노드는 자신의 왼쪽 자식이 루트인 서브트리의 노드들보다 오른쪽에 있으며, 자신의 오른쪽 자식이 루트인 서브트리의 노드들보다 왼쪽에 있다고 가정합니다.

당신은 수가 주어졌을때, 하나의 이진트리로 해당 수를 표현할 수 있는지 알고 싶습니다.

이진트리로 만들고 싶은 수를 담은 1차원 정수 배열 `numbers`가 주어집니다. `numbers`에 주어진 순서대로 하나의 이진트리로 해당 수를 표현할 수 있다면 1을, 표현할 수 없다면 0을 1차원 정수 배열에 담아 return 하도록 solution 함수를 완성해주세요.

### 제한사항

- 1 ≤ numbers의 길이 ≤ 10,000
  - 1 ≤ numbers의 원소 ≤ 1015

### 입출력 예

| numbers       | result    |
| ------------- | --------- |
| [7, 42, 5]    | [1, 1, 0] |
| [63, 111, 95] | [1, 1, 0] |

# 코드

```js
function checkTree(tree, parent) {
  if (parent === '0' && tree.indexOf('1') !== -1) return false;
  if (tree.length === 0) return true;

  const prevParent = parseInt(tree.length / 2);
  return (
    checkTree(tree.slice(0, prevParent), tree[prevParent]) &&
    checkTree(tree.slice(prevParent + 1), tree[prevParent])
  );
}

function makeCompleteBinaryTree(num) {
  const binNum = num.toString(2);
  const lengthOfbinNum = binNum.length;
  const treeHeight = Math.ceil(Math.log2(lengthOfbinNum + 1));
  const numberOfNodes = 2 ** treeHeight - 1;

  return '0'.repeat(numberOfNodes - lengthOfbinNum) + binNum;
}

function solution(numbers) {
  const answer = numbers.map(num => {
    const completeBinaryTree = makeCompleteBinaryTree(num);
    const root = completeBinaryTree[parseInt(completeBinaryTree.length / 2)];

    return checkTree(completeBinaryTree, root) ? 1 : 0;
  });

  return answer;
}
```

# 문제 풀이

이진 트리로 표현할 수 있는지 판별하는 것이 메인이 되는 문제였다. 개인적으로 문제의 설명이 불친절 하다고 느껴졌다.🥲

문제를 해결하는 과정은 크게 다음과 같다.

1. 숫자를 입력받아 이진수로 만든다.
2. 변환된 이진수를 포화 이진트리를 생성한다.
3. 생성한 포화 이진트리가 구현 가능한지 체크한다.

먼저 포화 이진트리로 만들기 위해서 **이진수로 변환된 문자열로 만들게 될 트리의 원소 개수**를 알아야한다(설명이 길지만 아무튼 맞다..ㅎ).

> - 높이가 h인 이진 트리의 노드 개수($n$): **$2^h - 1$**
> - n개의 노드를 가진 이진 트리의 높이($h$): **$\log_{2}(n + 1)$**
>   - $n = 2^h - 1$ 에서 1을 좌항으로 넘기고 양변에 $\log$ 를 취하면 **$h = \log_{2}(n + 1)$** 임을 알 수 있다.

이진트리의 성질을 이용해 값을 구하고 이진트리의 원소 개수와 현재 이진수로 변환된 문자열의 길이의 차이 만큼 앞에서부터 0을 채워준다. 코드는 다음과 같다.

```js
function makeCompleteBinaryTree(num) {
  const binNum = num.toString(2);
  const lengthOfbinNum = binNum.length;
  const treeHeight = Math.ceil(Math.log2(lengthOfbinNum + 1));
  const numberOfNodes = 2 ** treeHeight - 1;

  return '0'.repeat(numberOfNodes - lengthOfbinNum) + binNum;
}
```

다음은 이 문제의 핵심 부분인 이진트리로 만들 수 있는지 판별하는 부분이다. 이 부분에서 멘붕이 왔고 시간을 가장 많이 소비했다.

문제에서 말하는 '**주어진 이진트리**에 더미 노드라면, 문자열 뒤에 0을 추가한다'라는 말을 이해할 수 없었다. 처음에 문제를 읽었을 때, 이진트리에 더미 노드를 추가하고 이것을 2진수로 생각하고 10진수로 변환하는 문제라고 생각했다.

❗️**결과적으로 이 문제는 10진수가 주어지고 이 수를 이진트리로 변환해서 1은 노드로 0은 더미노드라고 생각하는 것이다.**

따라서, 이진트리로 만들 수 있는지 판별하는 것은 '(10진수로 이진트리를 만들긴 했지만)10진수를 이진트리로 변환할 수 있는가?'가 아니라 '이진트리로 숫자를 만들어 나갈 때, 이 이진트리로 10진수를 표현할 수 있는가?'를 구하는 문제이다. 내가 생각한 접근 방법은 위와 같았는데 만약에 아니라면 무조건 여러분 말이 맞다.(틀렸으면 댓글로 알려주세요...모르겠어요...😭)

위의 접근 방법을 따라서 판별하는 함수를 작성해보자면, **부모 노드가 더미노드(값이 0)인데 자식 노드 중에 1이 있다면 만들 수 없는 수라고 판별하면 된다.** 그리고 트리를 왼쪽 서브트리와 오른쪽 서브트리로 나눠서 재귀적으로 판별하면 된다.

```js
function checkTree(tree, parent) {
  // 부모가 더미 노드인데 자식 노드가 일반 노드일 수 없다.
  if (parent === '0' && tree.indexOf('1') !== -1) return false;
  // 문제 없이 노드의 끝까지 반복했다면 true를 반환해준다.
  if (tree.length === 0) return true;

  // 루트 노드는 트리(배열)의 중앙 값이다.
  const prevParent = parseInt(tree.length / 2);

  // 루트 노드를 기준으로 왼쪽 서브트리와 오른쪽 서브트리로 나눠서 재귀적으로 판별한다.
  return (
    checkTree(tree.slice(0, prevParent), tree[prevParent]) &&
    checkTree(tree.slice(prevParent + 1), tree[prevParent])
  );
}
```

> 문제를 풀긴 했지만, 문제가 아닌 입출력 예제에서 풀이 방법을 유추해 낸 것이라서 찜찜했다..
