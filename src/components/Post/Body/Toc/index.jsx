import React, { useState, useCallback, useEffect } from 'react';
import { animateScroll } from 'react-scroll';

import useIntersectionObserver from '../../../../hooks/useIntersectionObserver';
import getElementOffsetY from '../../../../utils/getOffset';

// CSS
import * as S from './style';

const Toc = () => {
  const [headings, setHeadings] = useState([]);

  const activeId = useIntersectionObserver();

  // TOC-Item Click Handler
  const handleClickHeading = useCallback(itemId => {
    const node = document.getElementById(itemId);
    animateScroll.scrollTo(getElementOffsetY(node) - 60);
  }, []);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        '#post-contents > h1, #post-contents > h2, #post-contents > h3',
      ),
    );
    setHeadings(headingElements);
  }, []);

  return (
    <S.TocWrapper>
      {headings.map((item, idx) => (
        <S.TocItem
          key={idx}
          active={item.id === activeId}
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
  );
};

export default Toc;
