import React, { useState } from 'react';
import { useZxing } from 'react-zxing';
import './qrScan.css';

const QrScan = () => {
  const [result, setResult] = useState('');
  const { ref } = useZxing({
    onResult(result) {
      setResult(result.getText());
    },
  });

  return (
    <>

    <div className='vidcen'>
        <video ref={ref}  className="vid"/>
        <div className="scanner-frame"></div>
    </div>


        
      <p>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </>
  );
};

export default QrScan;
