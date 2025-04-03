import React from "react";
import ReactDOM from "react-dom/client";
import { Dapp } from "./Dapp";
import { BrowserRouter } from "react-router-dom";

// Import Bootstrap (nếu cần)
import "bootstrap/dist/css/bootstrap.min.css";

// Tìm thẻ <div id="root"> trong index.html
const rootElement = document.getElementById("root");

// Kiểm tra rootElement để tránh lỗi null
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Tạo root cho React
const root = ReactDOM.createRoot(rootElement as HTMLElement);

// Render ứng dụng
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Dapp />
    </BrowserRouter>
  </React.StrictMode>
);