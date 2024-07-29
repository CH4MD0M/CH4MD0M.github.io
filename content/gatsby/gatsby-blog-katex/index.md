---
title: 'Gatsby 블로그 수식 기능 추가하기 - katex'
category: gatsby
date: 2022-09-03
tags:
  - 블로그
  - katex
---

# 들어가며

대부분의 Gatsby 블로그에서는 마크다운 파일을 파싱하기 위해 `gatsby-transformer-remark`를 사용한다. 하지만 필자는 리액트 컴포넌트를 `Mdx` 내부에서도 사용할 수 있다고 생각해서 `gatsby-plugin-mdx`를 사용 중이다! 이를 언급한 이유는 `gatsby-transformer-remark`과 설정 방법이 다르기 때문이다.

<br/>

> 이 글은 `gatsby-plugin-mdx` 플러그인 사용을 기준으로 작성되었다.

# KaTeX란?

블로그 포스팅을 하다보면 수식을 사용해야 할 때가 있다. 그럴 때 어떻게 처리해야 하는지 알아보다가 수식을 처리해서 렌더링 해주는 라이브러리를 알게되었다. 바로 ${\KaTeX}$다.

<br/>

${\KaTeX}$는 수식을 렌더링 해주는 라이브러리로, ${\KaTeX}$는 `MathJax`와 같은 다른 웹 기반 수학 렌더링 도구와 비교했을 때 빠른 속도와 서버 사이드 렌더링 지원이라는 이점이 있다. 이러한 특성 때문에, ${\KaTeX}$는 수학적 표현이 필요한 웹 사이트나 애플리케이션에서 널리 사용되고 있다.

<br/>

`rehype-katex`와 `remark-math` 라이브러리를 설치하여 ${\KaTeX}$를 사용할 것이다.

**remark-math:** 이 플러그인은 Remark 파서를 위해 만들어졌다. 이 플러그인의 주 목적은 마크다운 파일에 있는 수학식을 파싱하고 이를 특수한 노드 유형으로 변환하는 것이다. 이렇게 변환된 노드는 다른 플러그인(예: rehype-katex)에서 후처리를 수행하는 데 사용될 수 있다.

**rehype-katex:** 이 플러그인은 `remark-math` 또는 유사한 플러그인이 생성한 수학 노드를 처리하는 데 사용된다. 생성된 노드를 가져와서 KaTeX 라이브러리를 사용하여 HTML로 렌더링한다.

<br/>

정리하자면 `remark-math`가 수학식을 파싱하고, `rehype-katex`가 HTML로 렌더링하는 것이다.

# KaTeX 설치

> **remark-math version 3을 설치해야 한다.** `gatsby-plugin-mdx`는 내부적으로 `remark version 10`을 사용하고 있는데 remark-math version 4부터는 `remark version 13`을 필요로 하기 때문이다.

```bash
npm install remark-math@3.0.1 rehype-katex@5.0.0 katex
# or
yarn add remark-math@3.0.1 rehype-katex@5.0.0 katex
```

# KaTeX 설정

설치를 완료했다면 `gatsby-config.js`에 다음과 같이 설정해준다.

```js
// gatsby-config.js
module.exports = {
  ...

  plugins: [
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        ...

        remarkPlugins: [ require('remark-math')],
        rehypePlugins: [require('rehype-katex')],
      },
    },
  ],
};
```

# KaTeX 적용

설정까지 끝났다면 template, 컴포넌트, gatsby-browser.js 등 원하는 위치에 katex css를 import 해준다. 필자는 `post-template`에 import 해주었다.

```js
// post-template.tsx

import 'katex/dist/katex.min.css';
```

이제 마크다운 파일에 수식을 작성해보자.

```md
$$
S_n = \frac{n(2a + (n-1)d)}{2}
$$
```

$$
S_n = \frac{n(2a + (n-1)d)}{2}
$$

<br />

# 참고

- [[Gatsby] MDX 수식 적용](https://woong-jae.com/gatsby/210926-mdx-math-equation)
- [Using KaTeX With Gatsby and MDX](https://trevorblades.com/lab/katex-in-mdx)
- [Adding math support to a Gatsby MDX blog](https://nickymeuleman.netlify.app/blog/math-gatsby-mdx)
