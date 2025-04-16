import { useEffect, useRef, useState, useCallback } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import bgImg from "../images/bg_qr_scan.jpg";
import { ethers } from "ethers";

const QrScanner: React.FC<{ passData: (data: string) => void }> = ({
  passData,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const codeReaderRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    const startScanner = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });

        codeReader.decodeFromVideoDevice(
          null,
          videoRef.current!,
          (result, err) => {
            if (result) {
              console.log("Scanned QR result: ", result);
              passData(result.getText());
            }
          }
        );
      } catch (err) {
        console.error("Camera access or video error: ", err);
      }
    };

    startScanner();

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
      codeReaderRef.current?.reset(); // Dừng và giải phóng camera
    };
  }, [passData]);

  return <video ref={videoRef} style={{ width: "100%" }} />;
};

interface ScanProductProps {
  signer: ethers.Signer | null;
  onBack: () => void;
}

export const ScanProduct: React.FC<ScanProductProps> = ({ signer, onBack }) => {
  const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [qrData, setQrData] = useState<string>("");
  const [lastScanned, setLastScanned] = useState<string>("");

  const passData = useCallback(
    (data: string) => {
      if (data !== lastScanned) {
        console.log("✅ Scanned QR Code:", data);
        setQrData(data);
        setLastScanned(data);
        alert(`QR Code Scanned: ${data}`); // Bật lại nếu cần test
      }
    },
    [lastScanned]
  );

  useEffect(() => {
    if (!qrData) return;

    console.log("qrdata updated: ", qrData);

    const [contractAddress] = qrData.split(",");

    if (contractAddress === CONTRACT_ADDRESS) {
      console.log("✅ Valid Contract Address!");
      // Xử lý dữ liệu quét thành công
    } else {
      console.warn("❌ Invalid Contract Address!");
    }
  }, [qrData]);

  return (
    <div
      style={{
        backgroundImage: `url(${bgImg})`,
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
