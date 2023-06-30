import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

import PrismSetup from '@components/Element/PrismSetup';
import GoogleAds from '@components/GoogleAds';

// CSS
import * as S from './style';

interface PostMarkdownProps {
  body: string;
}

const components = {
  code: PrismSetup,
};

const PostMarkdown = ({ body }: PostMarkdownProps) => {
  return (
    <S.MDWrapper id="post-contents">
      <GoogleAds client="ca-pub-1186874032973944" slot="6532899272" />
      <MDXProvider components={components}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </S.MDWrapper>
  );
};

export default PostMarkdown;
