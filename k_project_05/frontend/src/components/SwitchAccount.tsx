import React, { useState } from "react";
import { ethers } from "ethers";

interface SwitchAccountProps {
  onAccountSwitched: (signer: ethers.Signer, address: string) => void;
}

export const SwitchAccount: React.FC<SwitchAccountProps> = ({ onAccountSwitched }) => {
  const [loading, setLoading] = useState(false);

  const switchAccount = async () => {
    if (!window.ethereum) return;

    setLoading(true);
    try {
      // Yêu cầu MetaMask cấp quyền truy cập tài khoản
      const permissions = await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      if (!permissions) return;

      // Yêu cầu MetaMask mở hộp thoại chọn tài khoản
      const selectedAddresses = (await window.ethereum.request({ method: "eth_requestAccounts" })) as string[];
      if (selectedAddresses.length === 0) return;

      const newAddress = selectedAddresses[0];
      const provider = new ethers.BrowserProvider(window.ethereum);
      const newSigner = await provider.getSigner();

      console.log("🔄 Switched to:", newAddress);
      onAccountSwitched(newSigner, newAddress);
    } catch (error) {
      console.error("Lỗi khi đổi tài khoản:", error);
    }
    setLoading(false);
  };

  return (
    <button className="btn btn-sm btn-secondary ms-2" onClick={switchAccount} disabled={loading}>
      {loading ? "Switching..." : "Switch Account"}
    </button>
  );
};
