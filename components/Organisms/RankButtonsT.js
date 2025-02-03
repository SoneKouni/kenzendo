import React, { useState } from "react";

const RankButtonsT = ({ handleRankButtonClick }) => {
  const ranks = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ"];
  const [selectedRanks, setSelectedRanks] = useState([]);

  const toggleRank = (rank) => {
    const newSelectedRanks = selectedRanks.includes(rank)
      ? selectedRanks.filter((r) => r !== rank)
      : [...selectedRanks, rank];
    setSelectedRanks(newSelectedRanks);
    handleRankButtonClick(newSelectedRanks);
  };

  return (
    <div style={{ display: "flex", justifyContent: "right" }}>
      {ranks.map((rank) => (
        <button
          key={rank}
          onClick={() => toggleRank(rank)}
          style={{
            backgroundColor: selectedRanks.includes(rank) ? "blue" : "white",
            color: selectedRanks.includes(rank) ? "white" : "black",
          }}
        >
          {rank}
        </button>
      ))}
    </div>
  );
};

export default RankButtonsT;