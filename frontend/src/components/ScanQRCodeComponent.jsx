import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";
import { sendScan, sendScanEnd } from '../services/scan.service.js'; 
import '../styles/scanqrcomponent.css';

const ScanQRCodeComponent = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const storedUser = JSON.parse(sessionStorage.getItem('usuario'));

  useEffect(() => {
    // Configura el escáner QR con html5-qrcode
    const scanner = new Html5QrcodeScanner(
      "qr-reader", // ID del elemento DOM donde se renderiza
      { fps: 10, qrbox: { width: 250, height: 250 } } // Configuración de escaneo
    );

    // Maneja el resultado exitoso del escaneo
    scanner.render(
      (decodedText) => {
        handleScan(decodedText);
      },
      (error) => {
        console.error("Error de escaneo:", error);
        setErrorMessage("Hubo un problema al intentar escanear el código.");
      }
    );

    // Limpia el escáner cuando se desmonta el componente
    return () => {
      scanner.clear().catch((error) => {
        console.error("Error al limpiar el escáner:", error);
      });
    };
  }, []); // El escáner depende de los datos del usuario

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);


      const scanPayload = {
        qrContent: data,
        name: storedUser.nombreCompleto,
        email: storedUser.email,
        scanStartTime: new Date().toISOString(),
      };

      
      try {
        // Envía los datos al backend
        const response = await sendScan(scanPayload);
        localStorage.setItem('scanUser', JSON.stringify(response));
        alert('Escaneo exitoso y datos enviados.');
        setErrorMessage('');
      } catch (error) {
        console.error('Error al enviar datos de escaneo:', error);
        setErrorMessage('Hubo un problema al enviar los datos de escaneo.');
      }
    }
  };

  const handleSendScan = async () => {
    try {
        const scanSaved = JSON.parse(localStorage.getItem('scanUser')) || '';
        console.log("scanUser extraido: ", scanSaved)
        const scanId = scanSaved.id;
        const scanEndTime = new Date().toISOString();
        const response = await sendScanEnd(scanId, scanEndTime);
        console.log("Response en componente: ", response)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  return (
    <div className="qr-container">
      <h2>Escanear Código QR</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {scanResult ? (
        <>
        <p className="scan-result">Código escaneado: {scanResult}</p>
        <button className='button-salir' onClick={handleSendScan}>
        Salir del turno de trabajo
        </button>
        </>
      ) : (
        <div id="qr-reader" style={{ width: '100%' }}></div> 
      )}
    </div>
  );
};

export default ScanQRCodeComponent;
