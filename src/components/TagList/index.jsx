import React from "react";

// CSS
import * as S from "./style";
import { FlexWrapper } from "../CategoryList/style";

const Tag = ({ title, count, selectedTag, handleSelectTag }) => {
  return selectedTag === title ? (
    <S.Active onClick={() => handleSelectTag(title)}>
      {title}({count})
    </S.Active>
  ) : (
    <S.Disabled onClick={() => handleSelectTag(title)}>
      {title}({count})
    </S.Disabled>
  );
};

const TagList = ({ selectedTag, tags, handleSelectTag }) => {
  return (
    <FlexWrapper>
      <S.TagListWrapper>
        {tags.map((item, idx) => (
          <Tag
            key={idx}
            title={item.fieldValue}
            count={item.totalCount}
            selectedTag={selectedTag}
            handleSelectTag={handleSelectTag}
          />
        ))}
      </S.TagListWrapper>
    </FlexWrapper>
  );
};

export default TagList;
