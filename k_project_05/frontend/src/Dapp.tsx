import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import AddProductPage from "./pages/AddProductPage";
import ScanProductPage from "./pages/ScanProductPage";
import { WalletProvider } from "./context/WalletContext";

export const Dapp = () => {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connect-wallet" element={<ConnectWalletPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/scan-product" element={<ScanProductPage />} />
      </Routes>
    </WalletProvider>
  );
};
