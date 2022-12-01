import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";

export const PrismWrapper = ({ children, className }) => {
  const language = className.replace(/language-/, "") || "";

  return (
    <Container>
      <Highlight
        {...defaultProps}
        code={children}
        language={language}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style }}>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index });
              return (
                <div key={index} {...lineProps}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </Container>
  );
};

const Container = styled.article`
  position: relative;
  margin-bottom: 3rem;

  pre {
    padding: 1rem 1.5rem;
    border-radius: 5px;
    overflow-x: auto;
    box-shadow: ${(props) => props.theme.effect.shadow};
  }
  .token-line {
    font-size: 1.4rem;
    line-height: 1.6;
  }
`;

export default PrismWrapper;
