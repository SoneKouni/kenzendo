import React, { useState } from "react";
import Button from "./Button";
// 検索ボックスコンポーネント
const SearchBox = ({ onSearch, disabled }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="input-group mt-3" style={{ maxWidth: "300px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="検索ワードを入力"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button text="検索" onClick={handleSearch} disabled={disabled} />
    </div>
  );
};

export default SearchBox;
