import React from 'react';

import Bio from '../../Bio';
import Divider from '../../Divider';
import PostNavigator from './PostNavigator';
import Comments from './Comments';

const Footer = ({ pageContext }) => {
  return (
    <>
      <Bio />
      <Divider mt="0" />
      <PostNavigator pageContext={pageContext} />
      <Comments />
    </>
  );
};

export default Footer;
