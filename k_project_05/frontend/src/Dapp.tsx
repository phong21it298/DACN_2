import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ConnectWalletPage from "./pages/ConnectWalletPage";
import AddProductPage from "./pages/AddProductPage";
import ScanProductPage from "./pages/ScanProductPage";
import { WalletProvider } from "./context/WalletContext";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";

export const Dapp = () => {
  return (
    <WalletProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/connect-wallet" element={<ConnectWalletPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/scan-product" element={<ScanProductPage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
      </Routes>
    </WalletProvider>
  );
};
