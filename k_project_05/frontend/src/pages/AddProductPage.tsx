import React from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { useAddProduct } from "../components/AddProduct";
import QRCode from "react-qr-code";
import "../css/AddProduct.css";

const AddProductPage: React.FC = () => {
  const { signer } = useWallet();
  const navigate = useNavigate();
  const {
    formData,
    productId,
    loading,
    qrRef,
    handleChange,
    addProduct,
    downloadQRCode,
  } = useAddProduct({ signer });

  return (
    <div className="add-product-container">
      <div className="add-product-card">
        <div className="header-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <div className="title-container">
            <h2>Thêm sản phẩm mới</h2>
          </div>
        </div>
        <div className="form-container">
          <input
            name="name"
            value={formData.name}
            placeholder="Tên sản phẩm"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="origin"
            value={formData.origin}
            placeholder="Xuất xứ"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="productionDate"
            value={formData.productionDate}
            type="date"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="farmingProcess"
            value={formData.farmingProcess}
            placeholder="Quy trình sản xuất"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="transportation"
            value={formData.transportation}
            placeholder="Vận chuyển"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="storageInfo"
            value={formData.storageInfo}
            placeholder="Bảo quản"
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="salesInfo"
            value={formData.salesInfo}
            placeholder="Phân phối, bán hàng"
            onChange={handleChange}
            className="form-input"
          />
          <button
            className="submit-button"
            onClick={addProduct}
            disabled={loading}
          >
            {loading ? "Đang thêm..." : "Thêm sản phẩm"}
          </button>
        </div>
        {productId && (
          <div className="qr-container">
            <h3>Mã QR sản phẩm</h3>
            <div ref={qrRef}>
              <QRCode
                value={`http://192.168.1.8:3000/product/${productId}`}
                size={256}
              />
            </div>
            <button className="download-button" onClick={downloadQRCode}>
              Tải QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductPage;
