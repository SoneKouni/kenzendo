import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Map from "../components/Molecules/Map";
import Tab from "../components/Atoms/Tab";
import CheckBox from "../components/Atoms/CheckBox";

export default function Page() {
  const [isChecked, setIsChecked] = useState(true);
  const [bridgedata, setBridgedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [tunneldata, setTunneldata] = useState([]);
  const [filteredTunnelData, setFilteredTunnelData] = useState([]);

  const bridgeApiKeys = [
    "9ea168d0f0b3459fa23a833b80739b2e",
  ];

  const tunnelApiKeys = [
    "80ca870510214227aaf746140de01235",
  ];

  useEffect(() => {
    const fetchBridgeData = async () => {
      try {
        const responses = await Promise.all(bridgeApiKeys.map(apiKey =>
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
        console.error("橋梁データの取得に失敗しました", error);
      }
    };

    const fetchTunnelData = async () => {
      try {
        const responses = await Promise.all(tunnelApiKeys.map(apiKey =>
          fetch(`https://k-lab2.herokuapp.com/getopendata?ApiKey=${apiKey}`)
        ));
        const data = await Promise.all(responses.map(response => response.json()));

        // データを結合し、Lat と Lng を数値型に変換
        const combinedData = data.flat().map((tunnel) => ({
          ...tunnel,
          Lat:
            typeof tunnel.Lat === "string"
              ? parseFloat(tunnel.Lat)
              : tunnel.Lat,
          Lng:
            typeof tunnel.Lng === "string"
              ? parseFloat(tunnel.Lng)
              : tunnel.Lng,
        }));
        setTunneldata(combinedData);
        setFilteredTunnelData(combinedData); // 初期値として全データを設定
      } catch (error) {
        console.error("トンネルデータの取得に失敗しました", error);
      }
    };

    fetchBridgeData();
    fetchTunnelData();
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const tabs = [
    {
      label: "橋梁健全度調査",
      content: (
        <Map bridgedata={filteredData} tunneldata={[]} trafficLayerVisible={isChecked} />
      ),
    },
    {
      label: "トンネル健全度調査",
      content: (
        <Map bridgedata={[]} tunneldata={filteredTunnelData} trafficLayerVisible={isChecked} />
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
      <div>
        <h2>API Keys</h2>
        <p>橋梁データ API Keys: {bridgeApiKeys.join(", ")}</p>
        <p>トンネルデータ API Keys: {tunnelApiKeys.join(", ")}</p>
      </div>
    </div>
  );
}
