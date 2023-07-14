// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const { ethers } = require("hardhat");
// const hre = require("hardhat");
const { ethers } = require("hardhat");
const hre = require("hardhat");


async function getBalances(address)
  {
    const balanceBigInt=await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }

async function consoleBalances(addresses){
    let counter=0;
    for(const address of addresses){
      console.log(`Address ${counter} Balance`,await getBalances(address))
      counter++;
    }
}

// async function consoleMemos(memos){
//   for(const prod of memos)
//   {
//      const timestamp=prod.timestamp;
//      const name=prod.name;
//      const from=prod.from;
//      const message=prod.message;
//      console.log(`At ${timestamp},name ${name},address ${from},message ${message}`);
//   }
// }

// async function main() {

//   const[owner,from1,from2,from3]=await hre.ethers.getSigners();
//   const chai=await hre.ethers.getContractFactory("chai");
//   const contract = await chai.deploy();

//   await contract.deployed();
//   console.log("Address of contract",contract.address);

//   const addresses=[owner.address,from1.address,from2.address,from3.address];
//   console.log("Before Buying Chai");
//   await consoleBalances(addresses);

//   const amount={value:hre.ethers.utils.parseEther("1")}
//   await contract.connect(from1).byChai("From1","Naice",amount)
//   await contract.connect(from2).byChai("From2","Naice",amount)
//   await contract.connect(from3).byChai("From3","Naice",amount)

//   console.log("After Buying Chai");
//   await consoleBalances(addresses);

//   const memos=await contract.getMemos();
//   consoleMemos(memos);
// }


// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.



async function consoleproduct(prod){
  
     const timestamp=prod.date;
     const name=prod.productName;
     const id=prod.productId;
     const creator=prod.creator;
     const source=prod.source;
     const totalCount=prod.totalCount;
     const copy=prod.copyTotalCount;
    //  const retailertemp=[];
    //  const counter=0;
    //  for(const x of prod.retailer){   
    //   retailertemp[counter]=x;
    //  }
     const ret=prod.retailer;
    //  const destinationDistributedtemp=[];
    //  const counter1=0;
    //  for(const x of prod.destinationDistributed){
    //   destinationDistributedtemp[counter1]=x;
    //  }

    //  const destinationReceivedtemp=[];
    //  const counter2=0;
    //  for(const x of prod.destinationReceived){
    //   destinationReceivedtemp[counter2]=x;
    //  }

    //  const setCounttemp=[];
    //  const counter3=0;
    //  for(const x of prod.setCount){
    //   setCounttemp[counter3]=x;
    //  }

     //const message=prod.message;
     console.log(`At ${timestamp},Creator ${creator},id ${id},name ${name},Source ${source},totalCount ${totalCount},copyTotalCount ${copy},Retailer ${ret}`);
     
    // //  console.log("Destination Distributed");
    // //  for(const x of destinationDistributedtemp){
    // //   console.log(x," ");
    // //  }

    // //  console.log("Set Count");
    // //  for(const x of setCounttemp){
    // //   console.log(x," ");
    // //  }

    // //  console.log("Retailers");
    // //  for(const x of retailertemp){
    // //   console.log(x," ");
    // //  }

    // //  console.log("Destination Received");
    // //  for(const x of destinationReceivedtemp){
    // //   console.log(x," ");
    // //  }


  
}

async function main() {

  const[from1,from2,from3]=await hre.ethers.getSigners();
  const SupplyChain=await hre.ethers.getContractFactory("SupplyChain");
  const contract = await SupplyChain.deploy();

  await contract.deployed();
  console.log("Address of contract",contract.address);

  const addresses=[from1.address,from2.address,from3.address];
  console.log("Before Supply Chain");
  await consoleBalances(addresses);        //addDestinationbyManufacturer //searchproduct  //updateproduct

  //const amount={value:hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).newItem("Ab123","Pen","Ngp",50)
  await contract.connect(from1).addDestinationbyManufacturer("Ab123","Delhi",20);
  await contract.connect(from1).addDestinationbyManufacturer("Ab123","Pune",30);
  //await contract.connect(from3).byChai("From3","Naice",amount)
  //await contract.connect(from2).searchproduct("Ab123");
  await contract.connect(from2).updateProduct("Ab123","Delhi",20);
  
  //await contract.connect(from3).searchproduct("Ab123");
  await contract.connect(from3).updateProduct("Ab123","Pune",30);

  await contract.connect(from1).newItem("Ab1234","Pencil","Pune",100)
  await contract.connect(from1).addDestinationbyManufacturer("Ab1234","Delhi",50);
  await contract.connect(from1).addDestinationbyManufacturer("Ab1234","Ngp",50);

  await contract.connect(from2).updateProduct("Ab1234","Delhi",50);
  
  //await contract.connect(from3).searchproduct("Ab123");
  await contract.connect(from3).updateProduct("Ab1234","Ngp",50);


  console.log("After Transaction");
  await consoleBalances(addresses);

  const name= await contract.connect(from1).getProductName("Ab123");
  const creator= await contract.connect(from1).getProductCreator("Ab123");
  const source= await contract.connect(from1).getProductSource("Ab123");
  const date= await contract.connect(from1).getProductDate("Ab123");
  const totalCount=await contract.connect(from1).getProductCount("Ab123");
  console.log(name," ",creator," ",source," ",date," ",totalCount);

  let retailer=[];
   contract.getProductRetailers("Ab1234")
  .then(function(result) {
    retailer = result;
    console.log(retailer); // to check the returned array in console
  })
  .catch(function(error) {
    console.error(error);
  });

  let destinations=[];
   contract.getProductDestinantions("Ab1234")
  .then(function(result) {
    destinations = result;
    console.log(destinations); // to check the returned array in console
  })
  .catch(function(error) {
    console.error(error);
  });

  let destinationRec=[];
   contract.getProductReceived("Ab1234")
  .then(function(result) {
    destinationRec = result;
    console.log(destinationRec); // to check the returned array in console
  })
  .catch(function(error) {
    console.error(error);
  });

  let setCount=[];
   contract.getProductSetCount("Ab1234")
  .then(function(result) {
    setCount = result;
    console.log(setCount); // to check the returned array in console
  })
  .catch(function(error) {
    console.error(error);
  });
  
  // const prod=await contract.connect(from1).searchProduct("Ab123");
  // console.log(prod);
  // const myProduct={
  //    timestamp:prod.date,
  //    name:prod.productName,
  //    id:prod.productId,
  //    creator:prod.creator,
  //    source:prod.source,
  //    totalCount:prod.totalCount,
  //    copy:prod.copyTotalCount,
  //    ret:prod.retailer
  // }
  //console.log(myProduct);
  //console.log(`At ${timestamp},Creator ${creator},id ${id},name ${name},Source ${source},totalCount ${totalCount},copyTotalCount ${copy},Retailer ${ret}`);
  //consoleproduct(products);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Address of contract 0xe19f43449E51fAd689f27dC621E979F7d908979c