import Button from "../components/Atoms/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Map from "../components/Atoms/Map";

function Components() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = async () => {
    setIsProcessing(true); // ボタンを無効化
    try {
      console.log('処理中...');
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 例として2秒待機
      console.log('処理が完了しました');
    } catch (error) {
      console.error('エラーが発生しました', error);
    } finally {
      setIsProcessing(false); // ボタンを再び有効化
    }
  };

  return (
    <><div className="container mt-5">
      <h1>Bootstrap Button Component Example</h1>
      <Button
        text={isProcessing ? '処理中...' : 'クリック'}
        onClick={handleClick}
        disabled={isProcessing} />
    </div><div className="container mt-5">
        <h1>Map Example</h1>
        <Map bridgedata={[{"ID":"","Office":"柳井土木建築事務所","Tel":"0820-22-0396","Lat":33.94505,"Lng":132.43749,"Name":"報国B橋","RoadType":"一般国道","Road":"４３７号","Address1":"周防大島町大字伊保田","Region":"周防大島町","Year":"不明","Rank1":"不明","Rank2":"○","Rank3":"不明","Rank4":"不明","Method":"RCボックス","Extension":2.69,"Width":13,"LatestYear1":2018,"Inspection1":"○","Inspection2":"不明","Inspection3":"不明","Inspection4":"不明","Inspection5":"不明","LatestYear2":"不明","Repair1":"不明","Repair2":"不明","Repair3":"不明","Repair4":"不明","Repair5":"不明"},{"ID":"83-01-000003","Office":"柳井土木建築事務所","Tel":"0820-22-0396","Lat":33.95079,"Lng":132.42896,"Name":"大橋","RoadType":"一般国道","Road":"４３７号","Address1":"周防大島町大字伊保田","Region":"周防大島町","Year":1968,"Rank1":"不明","Rank2":"○","Rank3":"不明","Rank4":"不明","Method":"PC床版橋","Extension":6.4,"Width":9.4,"LatestYear1":2022,"Inspection1":"不明","Inspection2":"不明","Inspection3":"不明","Inspection4":"不明","Inspection5":"○","LatestYear2":2021,"Repair1":"不明","Repair2":"不明","Repair3":"不明","Repair4":"不明","Repair5":"不明"}]}/>
      </div></>
  );
};

export default Components;