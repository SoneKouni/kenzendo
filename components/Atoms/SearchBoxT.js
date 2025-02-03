import React, { useState } from "react";
import Button from "./Button";

const SearchBoxT = ({ onSearch, disabled }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchT = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchT();
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
      <Button text="検索" onClick={handleSearchT} disabled={disabled} />
    </div>
  );
};

export default SearchBoxT;