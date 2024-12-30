import Button from "../components/Atoms/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

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
    <div className="container mt-5">
      <h1>Bootstrap Button Component Example</h1>
      <Button 
        text={isProcessing ? '処理中...' : 'クリック'} 
        onClick={handleClick} 
        disabled={isProcessing} 
      />
    </div>
  );
};

export default Components;