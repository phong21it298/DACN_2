import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const productId = 1; //ID sản phẩm cần truy xuất.

    //Kết nối tới smart contract.
    const FoodTraceability = await ethers.getContractAt("FoodTraceability", contractAddress);

    //Gọi hàm getProduct từ contract.
    try {
        const product = await FoodTraceability.getProduct(productId);

        console.log(`Sản phẩm ID ${productId}:`, {
            name: product[0],        
            origin: product[1],       
            productionDate: product[2],
            process: product[3],       
            transportation: product[4], 
            temperature: product[5],    
            store: product[6] 
        });
    } catch (error) {
        console.error("Lỗi khi truy xuất sản phẩm:", error);
    }
}

//Chạy script.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
