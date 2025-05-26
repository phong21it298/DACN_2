import { useWallet } from "../context/WalletContext";
import { useNavigate } from "react-router-dom";
import { ConnectWallet } from "../components/ConnectWallet";
import { SwitchAccount } from "../components/SwitchAccount";
import "../css/ConnectWallet.css";

const ConnectWalletPage = () => {
  const { selectedAddress, setSigner, setSelectedAddress } = useWallet();
  const navigate = useNavigate();

  return (
    <div className="connect-wallet-container">
      {!selectedAddress ? (
        <ConnectWallet
          onConnected={(newSigner, address) => {
            setSigner(newSigner);
            setSelectedAddress(address);
          }}
        />
      ) : (
        <div className="wallet-info">
          <p>
            Connected Wallet: <b>{selectedAddress}</b>
          </p>
          <div className="button-group">
            <SwitchAccount
              onAccountSwitched={(newSigner, newAddress) => {
                setSigner(newSigner);
                setSelectedAddress(newAddress);
              }}
            />
            <button
              className="add-product-button"
              onClick={() => navigate("/add-product")}
            >
              Add Product
            </button>
          </div>
          <button
            className="view-products-button"
            onClick={() => navigate("/products")}
          >
            View Product List
          </button>
        </div>
      )}
    </div>
  );
};

export default ConnectWalletPage;
