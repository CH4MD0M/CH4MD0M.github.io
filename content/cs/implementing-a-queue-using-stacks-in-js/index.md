---
title: '[자료구조] 스택(Stack)으로 큐(Queue) 구현하기'
category: cs
date: 2024-05-27
tags:
  - 자료구조
  - 큐
  - 스택
---

# 들어가며

라이브코딩에서 스택을 사용해서 큐를 구현하는 문제를 낸적이 있다는 걸 보았다. 스택을 사용해서 큐를 구현하는 방법을 알아보자.

# 아이디어

큐는 **선입선출(FIFO: First-In First-Out)** 구조를 가지는 자료구조다. 그리고 스택은 **LIFO(Last-In First-Out)** 구조를 가지는 자료구조다.

<br />

스택을 사용해서 큐를 구현하려면 두 개의 스택이 필요하다. 하나는 데이터를 저장하는 스택이고, 다른 하나는 임시로 데이터를 저장하는 스택이다.

1. 데이터를 삽입(enqueue)할 때는 데이터를 저장하는 스택에 데이터를 삽입한다.
2. 데이터를 삭제(dequeue)할 때는 데이터를 저장하는 스택에서 데이터를 모두 임시로 저장하는 스택으로 옮긴다. 그리고 임시로 저장한 스택에서 데이터를 삭제한다.

# 구현

## 클래스 초기화

먼저 클래스를 선언하고 두 개의 스택을 선언한다.

```js
class Queue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
}
```

## 데이터 삽입(enqueue)

데이터 삽입 메서드를 구현한다. 데이터를 저장하는 스택에 데이터를 삽입한다.

```js
class Queue {
  // ...

  enqueue(data) {
    this.stack1.push(data);
  }
}
```

## 데이터 삭제(dequeue)

데이터를 삭제할 때는 먼저 임시 저장하는 스택(stack2)에 길이가 0인지 판단한다. 길이가 0이라면 데이터를 저장하는 스택(stack1)에서 모든 데이터를 임시 저장하는 스택(stack2)으로 옮긴다. 그리고 임시 저장하는 스택(stack2)에서 데이터를 삭제한고 반환한다.

```js
class Queue {
  // ...
  dequeue() {
    if (this.stack2.length === 0) {
      // stack2가 비어있으면
      while (this.stack1.length > 0) {
        // stack1에서 모든 데이터를 stack2로 옮김
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop(); // stack2에서 데이터를 삭제하고 반환
  }
}
```

# 전체코드

주석을 제거한 전체 코드는 다음과 같다.

```js
class Queue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }

  enqueue(data) {
    this.stack1.push(data);
  }

  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }

  isEmpty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);

console.log(queue.dequeue()); // 1
console.log(queue.dequeue()); // 2

queue.enqueue(4);
console.log(queue.dequeue()); // 3
console.log(queue.dequeue()); // 4
console.log(queue.isEmpty()); // true
```
