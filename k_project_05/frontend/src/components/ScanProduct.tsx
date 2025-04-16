import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import bgImg from "../images/bg_qr_scan.jpg";
import { ethers } from "ethers";

const QrScanner: React.FC<{ passData: (data: string) => void }> = ({
  passData,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        codeReader
          .decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
            if (result) {
              passData(result.getText());
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error("Camera access denied: ", err));

    return () => {
      codeReader.reset();
    };
  }, [passData]); // Thêm `passData` vào dependency array để tránh cảnh báo

  return <video ref={videoRef} style={{ width: "100%" }} />;
};

interface ScanProductProps {
  signer: ethers.Signer | null;
  onBack: () => void;
}

export const ScanProduct: React.FC<ScanProductProps> = ({ signer, onBack }) => {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [qrData, setQrData] = useState<string>("");

  // Dùng useCallback để tránh re-render không cần thiết
  const passData = useCallback((data: string) => {
    alert(`QR Code Scanned: ${data}`); // Hiển thị thông báo khi quét thành công
    setQrData(data);
  }, []);

  useEffect(() => {
    console.log("qrdata updated: ", qrData);

    if (qrData) {
      const arr = qrData.split(",");
      const contractAddress = arr[0];

      if (contractAddress === CONTRACT_ADDRESS) {
        console.log("✅ Valid Contract Address!");
        // Xử lý dữ liệu quét thành công
      }
    }
  }, [qrData]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`, // Sửa lỗi không hiển thị ảnh nền
        minHeight: "80vh",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        zIndex: -2,
        overflowY: "scroll",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#e3eefc",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Gambetta",
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Scan QR Code
        </h2>

        <QrScanner passData={passData} />

        <button
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={onBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ScanProduct;
