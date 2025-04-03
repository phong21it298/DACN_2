import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Blockchain DApp</h1>
      <button onClick={() => navigate("/connect-wallet")}>Connect Wallet</button>
      <button onClick={() => navigate("/scan-product")} style={{ marginLeft: "10px" }}>
        Scan Product
      </button>
    </div>
  );
};

export default HomePage;