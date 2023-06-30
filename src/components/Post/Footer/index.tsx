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
      <GoogleAds client="ca-pub-1186874032973944" slot="2724364828" />
      <Bio />
      <Divider mt="0" />
      <PostNavigator pageContext={pageContext} />
      <Comments />
    </>
  );
};

export default Footer;
