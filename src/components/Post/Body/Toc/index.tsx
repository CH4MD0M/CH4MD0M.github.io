import React, { useCallback } from 'react';
import { animateScroll } from 'react-scroll';

import { useHeadObserver } from '@hooks/useHeadObserver';
import getElementOffsetY from '@utils/getOffset';

import GoogleAds from '@components/GoogleAds';

// CSS
import * as S from './style';

const Toc = () => {
  const { headings, activeHeadingId } = useHeadObserver();

  // TOC-Item Click Handler
  const handleClickHeading = useCallback((itemId: string) => {
    const node = document.getElementById(itemId);
    animateScroll.scrollTo(getElementOffsetY(node) - 60);
  }, []);

  return (
    <S.StickyWrapper>
      <S.TocWrapper>
        {headings.map(item => (
          <S.TocItem
            key={item.id}
            active={item.id === activeHeadingId}
            ml={
              item.tagName === 'H1'
                ? '0.5rem'
                : item.tagName === 'H2'
                ? '1.2rem'
                : '2.2rem'
            }
            onClick={() => handleClickHeading(item.id)}
          >
            {item.innerText}
          </S.TocItem>
        ))}
      </S.TocWrapper>
      <GoogleAds client="ca-pub-1186874032973944" slot="7840960133" />
    </S.StickyWrapper>
  );
};

export default Toc;
