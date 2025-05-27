import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Contract, JsonRpcProvider } from "ethers";
import "../css/ProductDetailPage.css";

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
      "name": "getProductIds",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
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
      "name": "productIds",
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

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const provider = new JsonRpcProvider("http://192.168.1.8:8545");
        const contract = new Contract(contractAddress, contractABI, provider);
        
        const id = parseInt(productId ?? "", 10);

        console.log("Đang lấy sản phẩm ID:", id);
        const data = await contract.getProduct(id);
        console.log("Dữ liệu:", data);

        setProduct({
          id,
          name: data[0],
          origin: data[1],
          productionDate: data[2],
          farmingProcess: data[3],
          transportation: data[4],
          storageInfo: data[5],
          salesInfo: data[6],
        });
      } catch (err: any) {
        setError("Không tìm thấy sản phẩm.");
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <div>{error}</div>;
  if (!product) return <div>Đang tải...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <div className="header-row">
          <button className="back-button" onClick={() => navigate(-1)}>
            Quay lại
          </button>
          <div className="title-container">
            <h2>Thông tin sản phẩm #{product.id}</h2>
          </div>
        </div>

        <table className="product-detail-table">
          <tbody>
            <tr>
              <th>Tên</th>
              <td>{product.name}</td>
            </tr>
            <tr>
              <th>Xuất xứ</th>
              <td>{product.origin}</td>
            </tr>
            <tr>
              <th>Ngày sản xuất</th>
              <td>{product.productionDate}</td>
            </tr>
            <tr>
              <th>Quy trình</th>
              <td>{product.farmingProcess}</td>
            </tr>
            <tr>
              <th>Vận chuyển</th>
              <td>{product.transportation}</td>
            </tr>
            <tr>
              <th>Bảo quản</th>
              <td>{product.storageInfo}</td>
            </tr>
            <tr>
              <th>Phân phối</th>
              <td>{product.salesInfo}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetailPage;
