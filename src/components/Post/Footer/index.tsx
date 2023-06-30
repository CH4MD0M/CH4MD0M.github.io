import React from 'react';

import Bio from '@components/Bio';
import Divider from '@components/Divider';
import GoogleAds from '@components/GoogleAds';
import PostNavigator from './PostNavigator';
import Comments from './Comments';

interface FooterProps {
  pageContext: PostContextProps;
}

const Footer = ({ pageContext }: FooterProps) => {
  return (
    <>
      <Bio />
      <Divider mt="0" />
      <PostNavigator pageContext={pageContext} />
      <GoogleAds client="ca-pub-1186874032973944" slot="6532899272" />
      <Comments />
    </>
  );
};

export default Footer;
