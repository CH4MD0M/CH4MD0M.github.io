---
title: '[NextJS14] Route Groups'
category: nextjs
date: 2024-07-03
tags:
  - routing
---

> [NextJs14 - Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups) 의 내용을 번역한 글입니다.

`app` 디렉토리에서 중첩된 폴더는 일반적으로 URL 경로에 매핑됩니다. 그러나 폴더가 경로의 URL 경로에 포함되지 않도록 폴더를 경로 그룹으로 표시할 수 있습니다.

이를 통해 URL 경로 구조에 영향을 주지 않고 경로 세그먼트와 프로젝트 파일을 논리 그룹으로 구성할 수 있습니다.

<br/>

루트 그룹은 다음과 같은 경우에 유용합니다:

- 사이트 섹션, 목적 또는 팀별로 라우트를 그룹화하는 경우
- 동일한 라우트 세그먼트 레벨에서 중첩된 레이아웃을 가능하게 하는 경우:
  - 동일한 세그먼트 내에서 여러 중첩된 레이아웃을 생성하는 경우
  - 공통 세그먼트 내의 일부 라우트에 레이아웃을 추가하는 경우

# Convention

폴더 이름을 괄호로 묶어 경로 그룹을 만들 수 있습니다: `(folderName)`.

# Examples

## Organize routes without affecting the URL path

URL에 영향을 주지 않고 경로를 정리하려면 그룹을 만들어 관련 경로를 함께 보관하세요. 괄호 안의 폴더는 URL에서 생략됩니다(예: `(marketing)` 또는 `(shop)` ).

![organisation](./image/organisation.png)

`(marketing)` 및 `(shop)` 내의 경로가 동일한 URL 계층 구조를 공유하더라도 폴더 안에 `layout.js` 파일을 추가하여 각 그룹에 대해 다른 레이아웃을 만들 수 있습니다.

![multiple-layouts](./image/multiple-layouts.png)

## Opting specific segments into a layout

특정 경로를 레이아웃으로 선택하려면 새 경로 그룹(`(shop)`)을 만들고 동일한 레이아웃을 공유하는 경로를 그룹으로 이동합니다(`account`, `cart`). 그룹 외부의 경로는 레이아웃을 공유하지 않습니다(`checkout`).

![opt-in-layouts](./image/opt-in-layouts.png)

## Creating multiple root layouts

여러 루트 레이아웃을 만들려면 최상위 `layout.js` 파일을 제거하고 각 경로 그룹 안에 `layout.js` 파일을 추가합니다. 이는 애플리케이션을 완전히 다른 UI 또는 경험을 가진 섹션으로 분할하는 데 유용합니다. 각 루트 레이아웃에 `<html>` 및 `<body>` 태그를 추가해야 합니다.

![multiple-root-layouts](./image/multiple-root-layouts.png)

위의 예에서 `(shop)`, `(marketing)` 둘 다 자체 루트 레이아웃이 있습니다.
