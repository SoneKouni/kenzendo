import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import SearchBox from "../components/Atoms/SearchBox";
import CheckBox from "../components/Atoms/CheckBox";
import Map from "../components/Molecules/Map";

export default function Page() {
  const [isChecked, setIsChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [bridgedata, setBridgedata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://k-lab2.herokuapp.com/getopendata?ApiKey=9ea168d0f0b3459fa23a833b80739b2e"
        );
        const data = await response.json();
        setBridgedata(data);
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
    setSearchQuery(query);
    console.log("検索ワード:", query);
  };

  return (
    <div className="container mt-5">
      <h1>健全度調査!</h1>
      <SearchBox onSearch={handleSearch} />
      <CheckBox
        label="トラフィックレイヤーを表示"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <Map bridgedata={bridgedata} trafficLayerVisible={isChecked} />
    </div>
  );
}
