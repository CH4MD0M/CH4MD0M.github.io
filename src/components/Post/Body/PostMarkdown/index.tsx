import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';

// Components
import PrismSetup from '@components/Element/PrismSetup';
import Blockquote from '@components/Element/Blockquote';

// CSS
import * as S from './style';

interface PostMarkdownProps {
  body: string;
}

const components = {
  code: PrismSetup,
  blockquote: Blockquote,
};

const PostMarkdown = ({ body }: PostMarkdownProps) => {
  return (
    <S.MDWrapper id="post-contents">
      <MDXProvider components={components}>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXProvider>
    </S.MDWrapper>
  );
};

export default PostMarkdown;
