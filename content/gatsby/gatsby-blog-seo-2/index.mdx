---
title: 'Gatsby 블로그 SEO 설정하기 2 - react helmet'
category: gatsby
date: 2023-02-04 00:00:00
tags:
  - 블로그
  - SEO
  - reactHelmet
---

> (추가) Gatsby [4.19](https://www.gatsbyjs.com/docs/reference/release-notes/v4.19/) 버전부터는 [Gatsby Head API](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/)가 추가되었다.
>
> 2020년 이후로 `react-helmet`이 업데이트가 되지 않고 있는 상황이니 이를 참고하여 작업하면 좋을 것 같다.
>
> 필자는 Gatsby `4.17` 버전이라서 아직 사용해보지는 못했지만😢, 이를 사용하면 `gatsby-plugin-react-helmet`을 사용하지 않고도 SEO를 설정할 수 있을 것이다.

이전 게시글에서는 sitemap을 생성하고 robots.txt를 설정했다. 이번에는 react helmet을 이용하여 SEO를 설정해보자. SEO 작업 중에 메타데이터를 설정하는 부분이 있다. 이 부분을 `react helmet`과 `gatsby-plugin-react-helmet`을 이용하여 설정해볼 것이다.

먼저 이 둘의 개념을 간단하게 알아보자.

# react-helmet이란?

`react-helmet`은 HTML 헤드 태그를 컴포넌트 기반의 접근으로 관리할 수 있게 도와주는 라이브러리다. 즉, 웹페이지의 메타데이터를 변경하거나 추가하는 데 사용한다.

`react-helmet`은 서버 사이드 렌더링과 클라이언트 사이드 렌더링 모두에서 작동한다. 이는 SEO를 향상시키는 데 중요한데, 그 이유는 많은 검색 엔진이 페이지를 크롤링할 때 클라이언트 사이드 자바스크립트를 실행하지 않기 때문이다.

웹 페이지의 메타데이터에는 페이지 제목, 설명, 키워드, OG(Open Graph) 태그, 트위터 카드 등이 포함될 수 있다. 이들 메타데이터는 사용자가 특정 검색어를 입력했을 때 검색 결과 페이지에 어떻게 웹사이트가 표시될지 결정하는데 큰 역할을 한다.

`react-helmet`은 이러한 메타데이터를 페이지별로 독립적으로 관리할 수 있어, 각 페이지가 검색 결과에서 다르게 표시되게 할 수 있다.

# gatsby-plugin-react-helmet이란?

`gatsby-plugin-react-helmet`은 `react-helmet` 라이브러리와 `Gatsby` 프레임워크를 연동하기 위한 플러그인이다. 이 플러그인은 Gatsby의 서버 사이드 렌더링(SSR) 과정에서 HTML 헤드 태그에 메타데이터를 삽입할 수 있게 해준다.

### 왜 gatsby-plugin-react-helmet을 추가로 설치하는가?

`Gatsby`는 사이트를 미리 생성하는 정적 사이트 제너레이터이며, `react-helmet`은 각 페이지의 메타데이터를 관리하는 데 사용되는 라이브러리다. 이 두 기술을 연결해주는 것이 바로 `gatsby-plugin-react-helmet`의 역할이다.

이 플러그인은 Gatsby의 빌드 시스템과 `react-helmet`을 연동하여, **서버 사이드 렌더링 과정에서 각 페이지의 HTML 헤드에 메타데이터를 적절하게 삽입해준다.** 이로 인해, Gatsby로 개발된 사이트도 각 페이지마다 고유한 title, description 등을 가질 수 있게 된다.

이 플러그인이 없다면, `Gatsby`는 `react-helmet`이 관리하는 메타 태그를 인식하지 못하게 된다. 따라서 `Gatsby`와 `react-helmet`을 함께 사용하려는 경우 이 플러그인의 설치는 필수적이다.

간단하게 정리하자면 다음과 같다.

- **react-helmet:** 동적으로 헤드 태그를 관리하는 라이브러리
- **gatsby-plugin-react-helmet:** 정적파일 빌드시 react-helmet을 사용할 수 있게 해주는 플러그인

# 블로그에 react-helmet 적용하기

이제 블로그에 react-helmet을 적용해보자.

### 1. react-helmet 설치

```bash
npm install --save react-helmet
npm install --save gatsby-plugin-react-helmet
# or
yarn add react-helmet
yarn add gatsby-plugin-react-helmet
```

### 2. gatsby-config.js에 플러그인 추가

```js
// gatsby-config.js
module.exports = {
  ...

  plugins: [
    `gatsby-plugin-react-helmet`,
  ],
};
```

### 3. SEO 컴포넌트 생성

이 부분은 각자의 상황에 맞게 작성하면 되는데, 참고를 위해 코드를 첨부한다. 자세한 코드는 [깃허브](https://github.com/CH4MD0M/ch4md0m.blog)에서 확인할 수 있다.

```tsx
import React from 'react';
import { Helmet } from 'react-helmet';

import { useSiteMetaData } from '@hooks/useSiteMetaData';

interface SeoProps {
  title: string;
  description?: string;
  url?: string;
}

interface SeoMetaData extends SeoProps {
  image: string;
}

const Seo = ({ title, description, url }: SeoProps) => {
  const data = useSiteMetaData();
  const { siteMetadata } = data.site;

  const seo: SeoMetaData = {
    title: title || siteMetadata.title,
    description: description || siteMetadata.description,
    image: `${siteMetadata.siteUrl}/og-image.png`,
    url: url || siteMetadata.siteUrl,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={seo.title} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:description" content={seo.description} />
      <meta name="description" content={seo.description} />
    </Helmet>
  );
};

export default Seo;
```

이후에 SEO 컴포넌트를 페이지나 `post-template`에 추가하여서 사용하면 된다.

```tsx
const PostTemplate = ({ data, pageContext }: PostTemplateProps) => {
  const { body, excerpt, fields } = data.mdx;
  const { category, date, title, tags } = data.mdx?.frontmatter;
  const { siteUrl } = data.site?.siteMetadata;

  return (
    <Layout>
      <Seo
        title={title}
        description={excerpt}
        url={`${siteUrl}${fields.slug}`}
      />
      ...
    </Layout>
  );
};
```

# 마치며

이번에는 react-helmet을 이용하여 SEO를 설정해보았다. 이제 블로그에 필요한 SEO 설정은 모두 끝났다. 다음에는 블로그에 Google Search Console에 등록해보도록 하자.

<br />

---

# 참고

[react-helmet의 동작 방식](https://jeonghwan-kim.github.io/dev/2020/08/15/react-helmet.html)
