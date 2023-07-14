const hre = require("hardhat");
async function main() {

    const SupplyChain=await hre.ethers.getContractFactory("SupplyChain");
    const contract = await SupplyChain.deploy();
  
    await contract.deployed();
    console.log("Address of contract",contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});