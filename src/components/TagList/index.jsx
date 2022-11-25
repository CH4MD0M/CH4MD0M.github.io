import React from "react";
import { Link } from "gatsby";

// CSS
import * as S from "./style";
import { FlexWrapper } from "../CategoryList/style";

const Tag = ({ title, count, selectedTag }) => {
  return selectedTag === title ? (
    <Link to="/tags">
      <S.Active>
        {title}({count})
      </S.Active>
    </Link>
  ) : (
    <Link to={`/tags?q=${title}`}>
      <S.Disabled>
        {title}({count})
      </S.Disabled>
    </Link>
  );
};

const TagList = ({ selectedTag, tags }) => {
  return (
    <FlexWrapper>
      <S.TagListWrapper>
        {tags.map((item, idx) => (
          <Tag
            key={idx}
            title={item.fieldValue}
            count={item.totalCount}
            selectedTag={selectedTag}
          />
        ))}
      </S.TagListWrapper>
    </FlexWrapper>
  );
};

export default TagList;
