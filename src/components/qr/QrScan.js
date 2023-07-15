import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import { useNavigate } from 'react-router-dom';
import './qrScan.css';

const QrScan = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  const navigate = useNavigate();

  const navigateToDynamicPage = () => {
    navigate('/DataContent/' + result);
  };

  return (
    <>
      <div className='vidcen'>
        <video ref={ref} className="vid" />
        <div className="scanner-frame"></div>
      </div>

      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>

      <button onClick={navigateToDynamicPage}>Go to Dynamic Page</button>
    </>
  );
};

export default QrScan;
