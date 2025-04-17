import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Blockchain DApp</h1>
      <div className="home-buttons">
        <button
          className="home-button"
          onClick={() => navigate("/connect-wallet")}
        >
          Connect Wallet
        </button>
        <button
          className="home-button"
          onClick={() => navigate("/scan-product")}
        >
          Scan Product
        </button>
      </div>
    </div>
  );
};

export default HomePage;
