import { useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { AddProduct } from "../components/AddProduct";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { signer } = useWallet(); // Lấy signer từ context

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Add New Product</h2>
      <AddProduct signer={signer} /> {/* Truyền signer vào component */}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default AddProductPage;