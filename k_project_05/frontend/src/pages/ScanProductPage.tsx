import { useNavigate } from "react-router-dom";
import { ScanProduct } from "../components/ScanProduct";

const ScanProductPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Scan QR Code</h2>
      <ScanProduct signer={null} onBack={() => navigate(-1)} />
    </div>
  );
};

export default ScanProductPage;