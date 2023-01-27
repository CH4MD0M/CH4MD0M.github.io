import React, { useEffect, useRef } from "react";

// CSS
import * as S from "./style";

const SearchBar = ({ onChangeHandler }) => {
  const searchInput = useRef(null);

  const handleKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === 191) {
      event.preventDefault();
      searchInput.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.addEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <S.SearchContainer>
      <S.Input
        ref={searchInput}
        onChange={onChangeHandler}
        placeholder="Search..."
      />
    </S.SearchContainer>
  );
};

export default SearchBar;
