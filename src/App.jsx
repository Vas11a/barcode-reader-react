import React, { useRef, useEffect, useState } from 'react';
import { BrowserBarcodeReader } from '@zxing/library';

function App() {
  const videoRef = useRef('');
  const [scannedCode, setScannedCode] = useState('');
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    const codeReader = new BrowserBarcodeReader();
    codeReader
      .getVideoInputDevices()
      .then((devices) => {
        setVideoDevices(devices);
        if (devices.length > 0) {
          setSelectedDeviceId(devices[0].deviceId);
        }
      })
      .catch((error) => {
        console.error('Error getting video input devices:', error);
      });

    return () => {
      codeReader.reset();
    };
  }, []);

  const handleCameraChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };
  const startScanning = () => {
    setScannedCode('');
    const codeReader = new BrowserBarcodeReader();
    codeReader
      .decodeFromInputVideoDevice(selectedDeviceId, videoRef.current)
      .then((result) => {
        console.log('Scanned code:', result.getText());
        setScannedCode(result.getText());
      })
      .catch((err) => {
        console.error('Barcode scanning error:', err);
      });
  };

  return (
    <div className='wrapper'>
      <h1>Barcode Scanner</h1>
      <select value={selectedDeviceId} onChange={handleCameraChange}>
        {videoDevices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>{device.label}</option>
        ))}
      </select>
      <video ref={videoRef}></video>
      <button onClick={startScanning}>Scan</button>
      Scanned Code:{scannedCode && <p> {scannedCode}</p>}
    </div>
  );
}

export default App;
