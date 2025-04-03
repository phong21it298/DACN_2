import React, { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

interface WalletContextProps {
  signer: ethers.Signer | null;
  selectedAddress: string | null;
  setSigner: (signer: ethers.Signer | null) => void;
  setSelectedAddress: (address: string | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <WalletContext.Provider value={{ signer, selectedAddress, setSigner, setSelectedAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within a WalletProvider");
  return context;
};