import React, { useState, useRef } from "react";
import { ethers } from "ethers";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import "../css/AddProduct.css";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "productId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "productionDate",
        "type": "string"
      }
    ],
    "name": "ProductAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_origin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_productionDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_farmingProcess",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_transportation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_storageInfo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_salesInfo",
        "type": "string"
      }
    ],
    "name": "addProduct",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_productId",
        "type": "uint256"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "productCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "origin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "productionDate",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "farmingProcess",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "transportation",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "storageInfo",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "salesInfo",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

interface AddProductProps {
  signer: ethers.Signer | null;
}

export const AddProduct: React.FC<AddProductProps> = ({ signer }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    productionDate: "",
    farmingProcess: "",
    transportation: "",
    storageInfo: "",
    salesInfo: "",
  });
  const [productId, setProductId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    if (!signer) {
      return alert("Vui lòng kết nối ví trước!");
    }

    setLoading(true);
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await contract.addProduct(
        formData.name,
        formData.origin,
        formData.productionDate,
        formData.farmingProcess,
        formData.transportation,
        formData.storageInfo,
        formData.salesInfo
      );
      const receipt = await tx.wait();

      const event = receipt.logs.find((log: any) => {
        try {
          return contract.interface.parseLog(log)?.name === "ProductAdded";
        } catch {
          return false;
        }
      });

      if (event?.args?.productId) {
        const newProductId = event.args.productId.toString();
        setProductId(newProductId);
        alert(`Sản phẩm đã được thêm với ID: ${newProductId}`);
      } else {
        alert("Không lấy được productId từ event!");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Thêm sản phẩm thất bại!");
    }
    setLoading(false);
  };

  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      ctx?.drawImage(img, 0, 0);

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `product_${productId}.png`;
      a.click();
    };
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <button className="back-button" onClick={() => navigate(-1)}>
        Quay lại
      </button>

      <input
        name="name"
        value={formData.name}
        placeholder="Tên sản phẩm"
        onChange={handleChange}
      />
      <input
        name="origin"
        value={formData.origin}
        placeholder="Xuất xứ"
        onChange={handleChange}
      />
      <input
        name="productionDate"
        value={formData.productionDate}
        type="date"
        onChange={handleChange}
      />
      <input
        name="farmingProcess"
        value={formData.farmingProcess}
        placeholder="Quy trình sản xuất"
        onChange={handleChange}
      />
      <input
        name="transportation"
        value={formData.transportation}
        placeholder="Vận chuyển"
        onChange={handleChange}
      />
      <input
        name="storageInfo"
        value={formData.storageInfo}
        placeholder="Bảo quản"
        onChange={handleChange}
      />
      <input
        name="salesInfo"
        value={formData.salesInfo}
        placeholder="Phân phối, bán hàng"
        onChange={handleChange}
      />

      <button onClick={addProduct} disabled={loading}>
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>

      {productId && (
        <div className="qr-container">
          <h3>Mã QR sản phẩm</h3>
          <div ref={qrRef}>
            <QRCode
              value={`https://yourdapp.com/product/${productId}`}
              size={256}
            />
          </div>
          <button onClick={downloadQRCode}>Tải QR Code</button>
        </div>
      )}
    </div>
  );
};
