import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Thay bằng địa chỉ hợp đồng
  const contract = await ethers.getContractAt(
    "FoodTraceability",
    contractAddress
  );
  const productIds = await contract.getProductIds();
  // In trực tiếp productIds mà không dùng toNumber()
  console.log("Product IDs:", productIds);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
