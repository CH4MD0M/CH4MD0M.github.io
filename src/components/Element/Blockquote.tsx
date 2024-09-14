import styled from 'styled-components';

// Icons
import { IconType } from 'react-icons';
import { FaPencilAlt } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import { TiWarningOutline } from 'react-icons/ti';
import { GoQuote } from 'react-icons/go';

type BlockquoteVariant = 'word' | 'info' | 'warn' | 'quote';

interface BlockquoteProps {
  children: React.ReactNode;
  variant: BlockquoteVariant;
  title?: string;
}

interface BlockquoteStyle {
  defaultTitle: string;
  backgroundColor: string;
  borderColor: string;
  icon: IconType;
}

const blockquoteStyles: Record<BlockquoteVariant, BlockquoteStyle> = {
  word: {
    defaultTitle: 'Word',
    backgroundColor: 'hsla(174, 60%, 50%, 0.1)',
    borderColor: 'hsl(174, 60%, 35%)',
    icon: FaPencilAlt,
  },
  info: {
    defaultTitle: 'Info',
    backgroundColor: 'hsla(188, 100%, 42%, 0.1)',
    borderColor: 'hsl(208, 77%, 47%)',
    icon: FiInfo,
  },
  warn: {
    defaultTitle: 'Warning',
    backgroundColor: 'hsla(24, 100%, 50%, 0.1)',
    borderColor: 'hsl(35, 100%, 59%)',
    icon: TiWarningOutline,
  },
  quote: {
    defaultTitle: 'Quote',
    backgroundColor: 'hsla(210, 10%, 40%, 0.1)',
    borderColor: 'hsl(210, 11%, 71%)',
    icon: GoQuote,
  },
};

const Blockquote = ({
  children,
  variant = 'quote',
  title,
}: BlockquoteProps) => {
  const { icon: BlockquoteIcon, defaultTitle } = blockquoteStyles[variant];

  return (
    <BlockquoteWrapper variant={variant}>
      <Header variant={variant}>
        <BlockquoteIcon size={24} />
        <span>{title || defaultTitle}</span>
      </Header>
      <Content>{children}</Content>
    </BlockquoteWrapper>
  );
};

export default Blockquote;

const BlockquoteWrapper = styled.div<{ variant: BlockquoteVariant }>`
  display: flex;
  flex-direction: column;
  margin: 5rem 0;
  background-color: var(--blockQuoteBgColor);
  border-radius: 0 3px 3px 0;
  border-left: 5px solid
    ${({ variant }) => blockquoteStyles[variant].borderColor};
  box-shadow: 3px 3px 7px 0 rgba(0, 0, 0, 0.37);
`;

const Header = styled.div<{ variant: BlockquoteVariant }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.4rem 2rem;
  border-bottom: 0.2rem solid rgba(145, 149, 156, 0.1);
  background-color: ${({ variant }) =>
    blockquoteStyles[variant].backgroundColor};
  color: ${({ variant }) => blockquoteStyles[variant].borderColor};

  span {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
`;
