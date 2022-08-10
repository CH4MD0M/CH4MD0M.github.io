import styled from "styled-components";

export const Wrapper = styled.article`
  .post-container {
    display: flex;
    padding: 1.3rem 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.primary2};
    transition: 0.2s linear;
    &:hover {
      background-color: ${(props) => props.theme.colors.primary2};
    }
  }
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 9rem);
  padding-left: 2rem;

  header {
    margin-top: 1rem;
    .post-title {
      font-size: 2.8rem;
      line-height: 2.8rem;
      font-weight: 500;
    }
  }
  footer {
    display: flex;
    justify-content: space-between;
    .date {
      margin-right: 1rem;
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.responsive.large}) {
    width: calc(100% - 7rem);
    padding-left: 1.3rem;

    header {
      .post-title {
        font-size: 2.2rem;
        line-height: 2.2rem;
      }
    }
    footer {
      .date {
        font-size: 1.2rem;
      }
    }
  }
`;