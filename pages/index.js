import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Map from "../components/Molecules/Map";
import Tab from "../components/Atoms/Tab";
import CheckBox from "../components/Atoms/CheckBox";

export default function Page() {
  const [isChecked, setIsChecked] = useState(true);
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const apiKeys = [
    "9ea168d0f0b3459fa23a833b80739b2e",
    "80ca870510214227aaf746140de01235"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(apiKeys.map(apiKey =>
          fetch(`https://k-lab2.herokuapp.com/getopendata?ApiKey=${apiKey}`)
        ));
        const data = await Promise.all(responses.map(response => response.json()));

        // データを結合し、Lat と Lng を数値型に変換
        const combinedData = data.flat().map((bridge) => ({
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
        setBridgedata(combinedData);
        setFilteredData(combinedData); // 初期値として全データを設定
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const tabs = [
    {
      label: "橋梁健全度調査",
      content: (
        <Map bridgedata={filteredData} trafficLayerVisible={isChecked} />
      ),
    },
    {
      label: "トンネル健全度調査",
      content: (
        <Map bridgedata={filteredData} trafficLayerVisible={isChecked} />
      ),
    },
  ];

  return (
    <div className="container mt-5">
      <h1>健全度調査</h1>
      <Tab tabs={tabs} />
      <CheckBox
        label="トラフィックレイヤーを表示"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}
