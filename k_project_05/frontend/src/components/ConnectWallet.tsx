import React, { useState } from "react";
import { ethers } from "ethers";
import { NetworkErrorMessage } from "./NetworkErrorMessage";
import "../css/ConnectWallet.css";

const HARDHAT_NETWORK_ID = "31337";
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface ConnectWalletProps {
  onConnected: (signer: ethers.Signer, selectedAddress: string) => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  onConnected,
}) => {
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Vui lòng cài đặt MetaMask!");
      return;
    }

    setLoading(true);
    try {
      const permissions = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      if (!permissions) return;

      const selectedAddresses = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[];
      if (selectedAddresses.length === 0) return;

      console.log("User selected:", selectedAddresses);
      const selectedAddress = selectedAddresses[0];

      await checkNetwork();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      console.log("✅ Wallet connected:", selectedAddress);
      onConnected(signer, selectedAddress);

      window.ethereum.removeAllListeners("accountsChanged");
      window.ethereum.on("accountsChanged", (newAddresses: string[]) => {
        if (newAddresses.length === 0) {
          return;
        }
        onConnected(signer, newAddresses[0]);
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setNetworkError("Lỗi khi kết nối ví.");
    }
    setLoading(false);
  };

  const checkNetwork = async () => {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== `0x${parseInt(HARDHAT_NETWORK_ID, 10).toString(16)}`) {
      await switchChain();
    }
  };

  const switchChain = async () => {
    try {
      const chainIdHex = `0x${parseInt(HARDHAT_NETWORK_ID, 10).toString(16)}`;
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainIdHex }],
      });
    } catch (error: any) {
      console.error("Lỗi khi chuyển mạng:", error);
      if (error.code === 4902) {
        setNetworkError("Mạng chưa được thêm vào MetaMask.");
      } else if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        setNetworkError("Bạn đã từ chối yêu cầu chuyển mạng.");
      }
    }
  };

  return (
    <div className="container">
      <div className="glass-card">
        {networkError && (
          <NetworkErrorMessage
            message={networkError}
            dismiss={() => setNetworkError(null)}
          />
        )}
        <p>Please connect to your wallet.</p>
        <button
          className="btn btn-warning"
          type="button"
          onClick={connectWallet}
          disabled={loading}
        >
          {loading ? "Connecting..." : "MetaMask"}
        </button>
      </div>
    </div>
  );
};
