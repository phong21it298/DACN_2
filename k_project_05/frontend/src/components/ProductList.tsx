import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";

export interface Product {
  id: number;
  name: string;
  origin: string;
  productionDate: string;
  farmingProcess: string;
  transportation: string;
  storageInfo: string;
  salesInfo: string;
}

const FoodTraceabilityABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "productId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "origin",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "productionDate",
        type: "string",
      },
    ],
    name: "ProductAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_origin",
        type: "string",
      },
      {
        internalType: "string",
        name: "_productionDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "_farmingProcess",
        type: "string",
      },
      {
        internalType: "string",
        name: "_transportation",
        type: "string",
      },
      {
        internalType: "string",
        name: "_storageInfo",
        type: "string",
      },
      {
        internalType: "string",
        name: "_salesInfo",
        type: "string",
      },
    ],
    name: "addProduct",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_productId",
        type: "uint256",
      },
    ],
    name: "getProduct",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProductIds",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "productCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "productIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "products",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "origin",
        type: "string",
      },
      {
        internalType: "string",
        name: "productionDate",
        type: "string",
      },
      {
        internalType: "string",
        name: "farmingProcess",
        type: "string",
      },
      {
        internalType: "string",
        name: "transportation",
        type: "string",
      },
      {
        internalType: "string",
        name: "storageInfo",
        type: "string",
      },
      {
        internalType: "string",
        name: "salesInfo",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

interface ProductListProps {
  onProductsFetched: (products: Product[]) => void;
}

export const useProductList = ({ onProductsFetched }: ProductListProps) => {
  const [error, setError] = useState<string | null>(null);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Thay bằng địa chỉ từ checkContract.ts
  const provider = ethers.getDefaultProvider("http://192.168.1.8:8545");
  const contract = new ethers.Contract(
    contractAddress,
    FoodTraceabilityABI,
    provider
  );

  const callbackRef = useRef(onProductsFetched);
  useEffect(() => {
    callbackRef.current = onProductsFetched;
  }, [onProductsFetched]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Calling getProductIds on contract:", contractAddress);
        const ids = await contract.getProductIds();
        // Xử lý BigInt
        const productIds = ids.map((id: any) => Number(id));
        console.log("Product IDs:", productIds);
        const productList: Product[] = [];

        if (productIds.length === 0) {
          console.log("No products found.");
          callbackRef.current(productList);
          return;
        }

        for (const id of productIds) {
          console.log(`Fetching product ${id}...`);
          const [
            name,
            origin,
            productionDate,
            farmingProcess,
            transportation,
            storageInfo,
            salesInfo,
          ] = await contract.getProduct(id);
          productList.push({
            id,
            name,
            origin,
            productionDate,
            farmingProcess,
            transportation,
            storageInfo,
            salesInfo,
          });
        }

        console.log("Products fetched:", productList);
        callbackRef.current(productList);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        let errorMsg = "Không thể tải danh sách sản phẩm.";
        if (err.code === "CALL_EXCEPTION") {
          errorMsg += ` Lý do: ${err.reason || "Không xác định"}`;
        } else {
          errorMsg += ` Lý do: ${err.message}`;
        }
        setError(errorMsg);
      }
    };

    fetchProducts();
  }, []);

  return { error };
};
