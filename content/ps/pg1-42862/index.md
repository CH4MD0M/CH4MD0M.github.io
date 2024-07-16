---
title: '[프로그래머스] 체육복 (JavaScript)'
category: ps
date: 2022-07-04
tags:
  - 프로그래머스
  - lv1
---

# 문제

[탐욕법(Greedy) - 체육복](https://school.programmers.co.kr/learn/courses/30/lessons/42862)

### 문제 설명

점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다.

전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

### 제한사항

- 전체 학생의 수는 2명 이상 30명 이하입니다.
- 체육복을 도난당한 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌의 체육복을 가져온 학생의 수는 1명 이상 n명 이하이고 중복되는 번호는 없습니다.
- 여벌 체육복이 있는 학생만 다른 학생에게 체육복을 빌려줄 수 있습니다.
- 여벌 체육복을 가져온 학생이 체육복을 도난당했을 수 있습니다. 이때 이 학생은 체육복을 하나만 도난당했다고 가정하며, 남은 체육복이 하나이기에 다른 학생에게는 체육복을 빌려줄 수 없습니다.

### 입출력 예

| n   | lost   | reserve   | return |
| --- | ------ | --------- | ------ |
| 5   | [2, 4] | [1, 3, 5] | 5      |
| 5   | [2, 4] | [3]       | 4      |
| 3   | [3]    | [1]       | 2      |

# 코드

```js
function solution(n, lost, reserve) {
  let lost_student = lost.filter(v => !reserve.includes(v)).sort();
  let reserve_student = reserve.filter(v => !lost.includes(v)).sort();

  for (let i = 0; i < reserve_student.length; i++) {
    if (lost_student.includes(reserve_student[i] - 1)) {
      lost_student = lost_student.filter(v => v !== reserve_student[i] - 1);
    } else if (lost_student.includes(reserve_student[i] + 1)) {
      lost_student = lost_student.filter(v => v !== reserve_student[i] + 1);
    }
  }

  return n - lost_student.length;
}
```

## 문제 풀이

여벌옷이 있어도 도난 당한 학생은 여벌옷이 없는 것과 마찬가지이다. 따라서, 이 경우를 먼저 처리해주고 배열이 정렬되어 있지 않는 경우도 있기 때문에 이를 위해 여벌 옷이 있는 학생의 배열(reserve_student)과 도난 당한 학생의 배열(lost_student)을 정렬해 주었다.
