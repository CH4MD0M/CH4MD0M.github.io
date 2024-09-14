import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';

interface PrismWrapperProps {
  children: string;
  className: string;
}

export const PrismWrapper = ({ children, className }: PrismWrapperProps) => {
  const language = (className.replace(/language-/, '') || '') as Language;

  return (
    <Container>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <CodeHeader>
              <div className="circle-wrapper">
                <div className="circle" />
              </div>
            </CodeHeader>
            <pre className={className} style={{ ...style }}>
              {tokens.map((line, index) => (
                <div {...getLineProps({ line, key: index })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          </>
        )}
      </Highlight>
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  margin: 3rem 0;
  box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.37);

  pre {
    padding: 1rem 1.5rem;
    overflow-x: auto;
  }

  .token-line {
    font-size: 1.4rem;
    line-height: 1.6;
  }
`;

const CodeHeader = styled.div`
  width: 100%;
  height: 4rem;
  background-color: var(--codeBlockBgColor);
  border-radius: 0.3em 0.3em 0 0;
  padding: 0 1.5rem;

  .circle-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .circle,
  .circle::before,
  .circle::after {
    width: 1.3rem;
    height: 1.3rem;
    border-radius: 50%;
  }

  .circle {
    background-color: #ffbe2e;
    position: relative;
    margin-left: 2rem;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 0;
    }

    &::before {
      background-color: #ff5f57;
      left: -2rem;
    }

    &::after {
      background-color: #28ca3f;
      left: 2rem;
    }
  }
`;

export default PrismWrapper;
