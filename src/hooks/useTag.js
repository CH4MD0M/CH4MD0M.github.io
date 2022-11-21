import { useCallback, useEffect, useState } from "react";
import qs from "query-string";

const useTag = () => {
  const [selectedTag, setSelectedTag] = useState();

  const handleSelectTag = useCallback((tag) => {
    setSelectedTag(tag);
    window.history.pushState(
      { tag },
      "",
      `${window.location.pathname}?${qs.stringify({ tag })}`
    );
  }, []);

  const changeTag = useCallback(() => {
    const { tag } = qs.parse(window.location.search);
    setSelectedTag(tag);
  }, []);

  useEffect(() => {
    window.addEventListener("popstate", changeTag);
    return () => {
      window.addEventListener("popstate", changeTag);
    };
  }, []);

  useEffect(() => {
    changeTag();
  }, []);

  return [selectedTag, handleSelectTag];
};

export default useTag;
