// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "hardhat/console.sol";

contract FoodTraceability {

    struct Product {

        string name; 
        string origin;
        string productionDate;
        string farmingProcess; //Quy trinh san xuat.
        string transportation;
        string storageInfo;
        string salesInfo; //Phan phoi, ban hang.
    }

    mapping(uint256 => Product) public products;
    uint256 public productCount;

    event ProductAdded(uint256 indexed productId, string name, string origin, string productionDate);

    function addProduct(
        string memory _name,
        string memory _origin,
        string memory _productionDate,
        string memory _farmingProcess,
        string memory _transportation,
        string memory _storageInfo,
        string memory _salesInfo
    ) public returns (uint256) {

        console.log("Bat dau them san pham:", _name, _origin, _productionDate);

        productCount++;

        console.log("San pham ID:", productCount);

        products[productCount] = Product(
            _name, _origin, _productionDate, _farmingProcess, _transportation, _storageInfo, _salesInfo
        );

        emit ProductAdded(productCount, _name, _origin, _productionDate);

        console.log("Da tham san pham thanh cong!");

        return productCount;
    }

    function getProduct(uint256 _productId) public view returns (
        string memory, string memory, string memory, string memory, 
        string memory, string memory, string memory
    ) {

        Product memory p = products[_productId];

        return (p.name, p.origin, p.productionDate, p.farmingProcess, 
                p.transportation, p.storageInfo, p.salesInfo);
    }
}