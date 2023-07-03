---
title: '[알고리즘] 다익스트라 알고리즘(Dijkstra Algorithm)'
category: algorithm
date: 2023-03-20
tags:
  - 그래프
  - 최단경로
  - 다익스트라
---

# 다익스트라 알고리즘이란?

다익스트라 알고리즘은 하나의 시작 지점으로부터 모든 다른 지점까지의 최단 경로를 찾는 알고리즘이다. 다익스트라 알고리즘은 기본적으로 **그리디 알고리즘**으로 분류된다. '매번 경로의 길이가 짧은 노드를 선택하는 과정'을 반복하기 때문이다.

### 다익스트라 알고리즘의 과정

1. 시작 정점을 설정하고, 시작 정점의 거리 값을 0으로 설정한다. 시작 정점을 제외한 모든 정점의 거리 값을 무한대로 설정한다.
2. 현재까지 방문하지 않은 정점 중에서 출발점에서 가장 가까운 정점을 선택한다.
3. 해당 정점의 이웃 정점에 대해서, 출발점에서 해당 이웃 정점까지의 거리를 계산한다.
4. 계산된 거리가 해당 이웃 정점의 현재 거리 값보다 작다면, 해당 이웃 정점의 거리 값을 갱신한다.
5. 모든 정점을 방문할 때까지 위 과정을 반복한다.

# 다익스트라 알고리즘 구현

여기서 구현할 다익스트라 알고리즘은 최소힙(우선순위 큐)를 사용하여 구현할 것이다.**우선순위 큐(Priority queue)**를 사용하면 구현이 더욱 빠르고 간단해진다. 큐에서 뽑힌 정점은 해당 정점에서부터 가장 짧은 거리로 도달할 수 있는 정점 중 가장 가까운 정점이기 때문에 이후의 경로는 해당 정점을 거쳐갈 필요가 없다.

> 우선순위 큐(최소 힙)의 구현 코드는 [[자료구조] JavaScript로 힙(Heap) 구현하기](https://chamdom.blog/heap-using-js/)에서 확인할 수 있다.

```js
function dijkstra(n, start, paths) {
  // 인접 리스트로 그래프 생성
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let [a, b, c] of paths) {
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  }

  // 우선순위 큐와 거리 값을 저장할 배열 초기화
  const pq = new MinHeap();
  const distance = new Array(n + 1).fill(Infinity);

  // 시작 정점의 거리 값을 0으로 초기화하고 우선순위 큐에 추가
  pq.add([start, 0]);
  distance[start] = 0;

  // 우선순위 큐가 빌 때까지 반복
  while (pq.size()) {
    // 우선순위 큐에서 현재까지 가장 가까운 정점을 가져옴
    let [node, dist] = pq.poll();

    // 현재까지 저장된 최단 거리보다 큰 거리인 경우 건너뜀
    if (distance[node] < dist) continue;

    // 현재 정점과 연결된 정점을 순회하며 거리 값을 갱신함
    for (const [nextNode, weight] of graph[node]) {
      // 현재 정점에서 연결된 정점까지의 거리 계산
      const cost = dist + weight;

      // 현재까지 저장된 거리보다 더 짧은 거리인 경우 거리 값을 갱신하고 우선순위 큐에 추가
      if (cost < distance[nextNode]) {
        distance[nextNode] = cost;
        pq.add([nextNode, cost]);
      }
    }
  }

  return distance;
}

const road = [
  [1, 2, 2],
  [1, 3, 5],
  [1, 4, 1],
  [2, 3, 3],
  [2, 4, 2],
  [3, 2, 3],
  [3, 6, 5],
  [4, 3, 3],
  [4, 5, 1],
  [5, 3, 1],
  [5, 6, 2],
];

const result = dijkstra(6, 1, road);
console.log(result); // [Infinity, 0, 2, 3, 1, 2, 4]
```

<br />

---

# 참고

- [이것이 취업을 위한 코딩테스트다](http://www.yes24.com/Product/Goods/91433923)
