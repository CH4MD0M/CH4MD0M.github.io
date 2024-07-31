---
title: 'React에 Code splitting 적용하기'
category: react
date: 2023-12-20
tags:
  - dynamic import
  - lazy
  - suspense
  - code splitting
---

최근 웹 애플리케이션의 복잡도가 증가하면서, 개발자들은 더 큰 규모의 리액트 프로젝트를 다루게 되었다. 이에 따라 번들 크기도 함께 커지면서, 초기 로딩 시간이 길어지는 문제가 발생하고 있다.

사용자들은 빠른 로딩과 부드러운 사용자 경험을 기대하는데, 이러한 기대를 충족시키기 위해 우리는 어떻게 해야 할까? 바로 여기서 **코드 스플리팅(Code Splitting)**이 중요한 역할을 한다.

# Code Splitting이란?

**코드 스플리팅(Code Splitting)**은 웹 애플리케이션의 코드를 여러 작은 조각(청크)으로 나누는 기술이다. 이를 통해 필요한 시점에 필요한 코드만 로드할 수 있어 초기 로딩 시간을 단축하고 전체적인 성능을 개선한다.

코드 스플리팅의 장점은 다음과 같다.

1. 초기 로딩 시간 감소
2. 리소스의 효율적 사용
3. 사용자 경험 개선
4. 캐싱 효율성 증가

리액트에서는 `React.lazy()`와 `Suspense`를 이용해 쉽게 구현할 수 있다.

# Code Splitting 적용하기

## dynamic import란?

**동적 import(dynamic import)**는 ECMAScript의 제안 기능으로, 필요한 시점에 모듈을 비동기적으로 로드할 수 있게 한다. 일반적인 **정적 import(Static import)**와 달리, 동적 import는 Promise를 반환하며, 이를 통해 모듈을 필요한 시점에 로드할 수 있다.

```js
// 정적 import (항상 로드됨)
import MyComponent from './MyComponent';

// 동적 import (필요할 때 로드됨)
import('./MyComponent').then(module => {
  const MyComponent = module.default;
});
```

## React.lazy()와 Suspense 사용하기

`React.lazy()`와 `Suspense는` 리액트 16.6 버전부터 도입된 기능으로, 컴포넌트 레벨에서 쉽게 코드 스플리팅을 구현할 수 있게 해준다.

**React.lazy()**는 dynamic import를 래핑하여 리액트 컴포넌트를 비동기적으로 로드할 수 있게 한다. `Suspense`와 함께 사용하면 컴포넌트가 로드되는 동안 대체 콘텐츠를 보여줄 수 있다.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

## react-router-dom과 같이 사용하기

```js
// PublicRoutes.tsx

const HomePage = lazy(() => import('@pages/HomePage'));
const ProductListPage = lazy(() => import('@pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('@pages/ProductDetailPage'));
// ...
```

```js
// App.tsx

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          {/* public routes */}
          <Route element={<ProtectedRoutes />}>
            {generateRoutes(PublicRoutes)}
          </Route>

          {/* other routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
```

위 이미지처럼 번들링 된 파일명이 해쉬값으로 생성되면서 어떤 파일이 로드되는지 식별하기 어렵다. 따라서 `webpackChunkName` 주석을 사용해서 filename을 생성하도록 해줘야 한다.

```js
module.exports = {
  // ...
  output: {
    // ...
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
};
```

```jsx
const EditProfilePage = lazy(() =>
  import(
    /* webpackChunkName: "userEditProfile" */ '@pages/user/EditProfilePage'
  ),
);

// ...
```

webpack에서 설정한 `chunkFilename`에는 `webpackChunkName` 주석에 작성된 **filename**을 사용한다. 위 예제에서는 userEditProfile을 파일명으로 사용한다.
