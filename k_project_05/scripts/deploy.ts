import { ethers } from "hardhat"; //Import Hardhat vào script và lấy thư viện ethers.js từ Hardhat.
import { initConfig, setConfig, updateConfig } from "./config"; // Import module config.

async function main() {

    //Đọc config.json vào bộ nhớ.
    await initConfig(); 

    //Tạo một factory cho smart contract. Hardhat tìm FoodTraceability.sol và compile nó.
    const FoodTraceability = await ethers.getContractFactory("FoodTraceability");

    //Khởi tạo một smart contract mới trên blockchain.
    const contract = await FoodTraceability.deploy();

    //Chờ cho đến khi contract được triển khai hoàn toàn lên blockchain.
    await contract.waitForDeployment();

    const contractAddress = contract.target as string;

    //Smart contract's address.
    console.log(`Contract deployed at: ${contract.target}`);

    //Cập nhật vào config.json (network hardhat -> contract FoodTraceability).
    setConfig("hardhat.FoodTraceability", contractAddress);

    //Ghi lại vào file config.json.
    await updateConfig();

    console.log("✅ Đã cập nhật vào config.json");
}

//Chạy hàm main, nếu deploy lỗi thì in ra.
main().catch((error) => {

    console.error(error);

    process.exitCode = 1;
});
