import React from "react";
import FilterButton from "../Molecules/FilterButton";

const RankButtons = ({ handleRankButtonClick }) => {
  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      <FilterButton
        column="Rank"
        value="Ⅰ"
        onFilter={handleRankButtonClick}
        text="Ⅰ"
      />
      <FilterButton
        column="Rank"
        value="Ⅱ"
        onFilter={handleRankButtonClick}
        text="Ⅱ"
      />
      <FilterButton
        column="Rank"
        value="Ⅲ"
        onFilter={handleRankButtonClick}
        text="Ⅲ"
      />
      <FilterButton
        column="Rank"
        value="Ⅳ"
        onFilter={handleRankButtonClick}
        text="Ⅳ"
      />
    </div>
  );
};

export default RankButtons;
