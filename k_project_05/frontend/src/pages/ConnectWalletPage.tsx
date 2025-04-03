import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { ConnectWallet } from "../components/ConnectWallet";
import { SwitchAccount } from "../components/SwitchAccount";

const ConnectWalletPage = () => {
  const { signer, selectedAddress, setSigner, setSelectedAddress } = useWallet();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {!selectedAddress ? (
        <ConnectWallet
          onConnected={(newSigner, address) => {
            setSigner(newSigner);
            setSelectedAddress(address);
          }}
        />
      ) : (
        <>
          <p>Connected Wallet: <b>{selectedAddress}</b></p>
          <SwitchAccount onAccountSwitched={(newSigner, address) => {
            setSigner(newSigner);
            setSelectedAddress(address);
          }} />
          <button onClick={() => navigate("/add-product")} style={{ marginLeft: "10px" }}>
            Add Product
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectWalletPage;
