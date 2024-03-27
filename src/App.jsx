import React, { useRef, useEffect, useState } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

function App() {
  const videoRef = useRef(null);
  const [scannedCode, setScannedCode] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader();
    codeReader
      .decodeFromInputVideoDevice(undefined, videoRef.current)
      .then((result) => {
        setScannedCode(result.getText());
      })
      .catch((err) => {
        console.error('Barcode scanning error:', err);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <h1>Barcode Scanner</h1>
      <video ref={videoRef} style={{ width: '100%', maxWidth: '300px' }}></video>
      {scannedCode && <p>Scanned Code: {scannedCode}</p>}
    </div>
  );
}

export default App;
