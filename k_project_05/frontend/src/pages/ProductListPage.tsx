import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useProductList, Product } from "../components/ProductList";
import "../css/ProductListPage.css";

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleProductsFetched = useCallback((fetchedProducts: Product[]) => {
    setProducts(fetchedProducts);
  }, []);

  const { error } = useProductList({
    onProductsFetched: handleProductsFetched,
  });

  return (
    <div className="product-list-container">
      <div className="product-list-card">
        <div className="header-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <div className="title-container">
            <h2>Danh sách sản phẩm</h2>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        {products.length === 0 ? (
          <p className="no-products">Chưa có sản phẩm nào.</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Nguồn gốc</th>
                <th>Ngày sản xuất</th>
                <th>Quy trình sản xuất</th>
                <th>Vận chuyển</th>
                <th>Lưu trữ</th>
                <th>Phân phối</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.origin}</td>
                  <td>{product.productionDate}</td>
                  <td>{product.farmingProcess}</td>
                  <td>{product.transportation}</td>
                  <td>{product.storageInfo}</td>
                  <td>{product.salesInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
