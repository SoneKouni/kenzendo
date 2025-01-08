import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import SearchBox from "../components/Atoms/SearchBox";
import CheckBox from "../components/Atoms/CheckBox";
import Map from "../components/Molecules/Map";
import RankButtons from "../components/Organisms/RankButtons";

export default function Page() {
  const [isChecked, setIsChecked] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://k-lab2.herokuapp.com/getopendata?ApiKey=9ea168d0f0b3459fa23a833b80739b2e"
        );
        const data = await response.json();

        // Lat と Lng を数値型に変換
        const convertedData = data.map((bridge) => ({
          ...bridge,
          Lat:
            typeof bridge.Lat === "string"
              ? parseFloat(bridge.Lat)
              : bridge.Lat,
          Lng:
            typeof bridge.Lng === "string"
              ? parseFloat(bridge.Lng)
              : bridge.Lng,
        }));

        setBridgedata(convertedData);
        setFilteredData(convertedData); // 初期データをフィルタリングデータとして設定
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSearch = (query) => {
    // 検索ワードに一致するデータを絞り込む
    const filtered = bridgedata.filter((item) => item.Name.includes(query));
    setFilteredData(filtered);
    if (filtered.length === 0) {
      alert("該当するデータがありません");
    }
  };

  const handleRankButtonClick = (column, value) => {
    const filtered = bridgedata.filter((item) => item[column].includes(value));
    setFilteredData(filtered);
  };

  return (
    <div className="container mt-5">
      <h1>健全度調査!</h1>
      <SearchBox onSearch={handleSearch} />
      <RankButtons handleRankButtonClick={handleRankButtonClick} />
      <CheckBox
        label="トラフィックレイヤーを表示"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Map bridgedata={filteredData} trafficLayerVisible={isChecked} />
    </div>
  );
}
