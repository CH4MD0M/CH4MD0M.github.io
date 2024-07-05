---
title: '[NextJS14] Dynamic Routes'
category: nextjs
date: 2024-07-03
tags:
  - routing
---

> [NextJs14 - Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) 의 내용을 번역한 글입니다.

정확한 세그먼트 이름을 미리 알 수 없고 동적 데이터를 사용하여 라우트를 생성하려는 경우, 요청 시 또는 빌드 시 사전 렌더링된 동적 세그먼트를 사용할 수 있습니다.

# Convention

동적 세그먼트(Dynamic Segments)는 폴더 이름을 대괄호로 묶어 만들 수 있습니다: `[folderName]`.

ex) `[id]` 또는 `[slug]`

동적 세그먼트는 params 속성으로 `layout`, `page`, `route`, 그리고 `generateMetadata` 함수에 전달됩니다.

# Example

예를 들어, 블로그는 다음과 같은 라우트를 포함할 수 있습니다: `app/blog/[slug]/page.js`. 여기서 `[slug]`는 블로그 게시물에 대한 동적 세그먼트입니다.

```tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
```

| Route                   | Example URL | params        |
| ----------------------- | ----------- | ------------- |
| app/blog/[slug]/page.js | /blog/a     | { slug: 'a' } |
| app/blog/[slug]/page.js | /blog/b     | { slug: 'b' } |
| app/blog/[slug]/page.js | /blog/c     | { slug: 'c' } |

# Generating Static Params

`generateStaticParams` 함수는 동적 경로 세그먼트와 결합하여 특정 경로들을 빌드 타임에 미리 생성함으로써, 요청 시점에 실시간으로 페이지를 생성하는 것이 아닌, 빌드 타임에 미리 생성해둔 정적 페이지를 제공할 수 있게 합니다.

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then(res => res.json());

  return posts.map(post => ({
    slug: post.slug,
  }));
}
```

`generateStaticParams` 함수의 주요 이점은 데이터를 스마트하게 검색할 수 있다는 것입니다.

fetch 요청을 사용하여 generateStaticParams 함수 내에서 콘텐츠를 가져오면 요청이 자동으로 메모이제이션됩니다. 즉, 여러 generateStaticParams , Layouts 및 Pages에서 동일한 인수를 사용하는 fetch 요청은 한 번만 수행되게 하여 빌드 시간이 단축됩니다.

자세한 정보와 고급 사용 사례에 대해서는 [`generateStaticParams` server function documentation](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)를 참조하세요.

<br/>

---

# Catch-all Segments

동적 세그먼트는 괄호 안에 줄임표를 추가하여 catch-all 후속 세그먼트로 확장할 수 있습니다: `[...folderName]`.

예를 들어, `app/shop/[...slug]/page.js` 는 `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts` 와 일치합니다.

| Route                      | Example URL | params                    |
| -------------------------- | ----------- | ------------------------- |
| app/shop/[...slug]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[...slug]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[...slug]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |

<br/>

---

# Optional Catch-all Segments

Catch-all 세그먼트는 이중 괄호로 묶어 선택적(optional)으로 만들 수 있습니다: `[[...folderName]]`.

예를 들어, `app/shop/[[...slug]]/page.js` 은 `/shop/clothes`, `/shop/clothes/tops`, `/shop/clothes/tops/t-shirts` 외에도 `/shop`과도 일치합니다.

catch-all 세그먼트와 optional catch-all 세그먼트의 차이점은 optional의 경우, 매개변수가 없는 라우트도 일치한다는 점입니다(위의 예에서는 `/shop`).

| Route                        | Example URL | params                    |
| ---------------------------- | ----------- | ------------------------- |
| app/shop/[[...slug]]/page.js | /shop       | {}                        |
| app/shop/[[...slug]]/page.js | /shop/a     | { slug: ['a'] }           |
| app/shop/[[...slug]]/page.js | /shop/a/b   | { slug: ['a', 'b'] }      |
| app/shop/[[...slug]]/page.js | /shop/a/b/c | { slug: ['a', 'b', 'c'] } |

<br/>

---

# TypeScript

TypeScript를 사용할 때 구성된 경로 세그먼트에 따라 `params`에 대한 유형을 추가할 수 있습니다.

```tsx
export default function Page({ params }: { params: { slug: string } }) {
  return <h1>My Page</h1>;
}
```

| Route                             | params Type Definition                 |
| --------------------------------- | -------------------------------------- |
| app/blog/[slug]/page.js           | { slug: string }                       |
| app/shop/[...slug]/page.js        | { slug: string[] }                     |
| app/shop/[[...slug]]/page.js      | { slug?: string[] }                    |
| app/[categoryId]/[itemId]/page.js | { categoryId: string, itemId: string } |
