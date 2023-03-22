import { useState, useRef, useEffect } from 'react';

const defaultOptions = {
  rootMargin: '-20px 0px 0% 0px',
};

const useIntersectionObserver = (options = defaultOptions) => {
  const [activeId, setActiveId] = useState(null);
  const headingElementsRef = useRef([]);

  useEffect(() => {
    const handleIntersect = entries => {
      const visibleHeadings = entries
        .filter(entry => entry.isIntersecting)
        .map(entry => entry.target);

      if (visibleHeadings.length > 0) {
        setActiveId(visibleHeadings[0].id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const headings = [
      ...document.querySelectorAll(
        '#post-contents > h1, #post-contents > h2, #post-contents > h3',
      ),
    ];

    headingElementsRef.current = headings;

    headings.forEach(heading => observer.observe(heading));
    return () => observer.disconnect();
  }, [options]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const visibleHeadings = headingElementsRef.current
        .filter(heading => heading.offsetTop <= scrollPosition + 10)
        .sort((a, b) => b.offsetTop - a.offsetTop);

      if (visibleHeadings.length > 0 && activeId !== visibleHeadings[0].id) {
        setActiveId(visibleHeadings[0].id);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [activeId]);

  return activeId;
};

export default useIntersectionObserver;
