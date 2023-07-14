// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract SupplyChain {
    
    //event Added(uint256 index); 

    struct State{
        string description;
        address person;
    }
    
    struct Product{
        //mapping(string => string) public hash;
        address creator; //done
        address[] retailer;
        string productName; //done
        string productId; //done
        uint256 date; //done
        string source; //done
        string[] destinationDistributed;    
        string[] destinationReceived;  
        uint256 totalCount;   //done
        uint256 copyTotalCount; //done
        string[] retailers_id;
        string[] validated_retailers_id;
        uint256[] setCount; 
        //uint256[] receivedCount;
    }
    Product public prod;
    mapping(uint => Product) public allProducts;
    uint256 items=0;
    uint256 counter=0;
    uint256 index=0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
    uint256 index1=0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;


    function newItem(string memory _id,string memory _name, string memory _source, uint256 _totalCount) public returns (bool) {
        Product storage new_item = allProducts[items++];
        new_item.creator= msg.sender; 
        new_item.productId= _id;
        new_item.productName= _name;
        new_item.date= block.timestamp;
        new_item.source= _source;
        new_item.totalCount= _totalCount;
        new_item.copyTotalCount= _totalCount;
        //emit Added(items-1);
        return true;
    }

    function addDestinationbyManufacturer(string memory  _productId ,string memory _destination, uint256 _count, string memory ret_id) public {
        
        for(uint256 i=0;i<items;i++)
        {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId))))
            {
                index= i;
                break;
            }
        }
        require(index<items);

        require(_count<=allProducts[index].copyTotalCount);

        allProducts[index].destinationDistributed.push(_destination);
        allProducts[index].retailers_id.push(ret_id);
        allProducts[index].setCount.push(_count);
        //allProducts[index].receivedCount.push(0);
        allProducts[index].copyTotalCount=allProducts[index].copyTotalCount-_count;

    }
    
    

    // function searchProduct(string memory _productId) public returns (Product memory) {

    //     for(uint i=0; i<items; i++)
    //     {
    //         if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId))))
    //         {
    //             index= i;
    //             break;
    //         }
    //     }
    //     require(index<items);
    //     return allProducts[index];
    // }
    
    function getProductCreator(string memory _productId) public view returns (address) {
    for(uint i=0; i<items; i++) {
        if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
            return allProducts[i].creator;
        }
    }
    revert("Product not found");
}

    function getProductName(string memory _productId) public view returns (string memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].productName;
            }
        }
        revert("Product not found");
    }

    function getProductSource(string memory _productId) public view returns (string memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].source;
            }
        }
        revert("Product not found");
    }

     function getProductDate(string memory _productId) public view returns (uint256) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].date;
            }
        }
        revert("Product not found");
    }

     function getProductCount(string memory _productId) public view returns (uint256) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].totalCount;
            }
        }
        revert("Product not found");
    }

     function getProductDestinantions(string memory _productId) public view returns (string[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].destinationDistributed;
            }
        }
        revert("Product not found");
    }

    function getProductRetailers(string memory _productId) public view returns (address[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].retailer;
            }
        }
        revert("Product not found");
    }

    function getProductReceived(string memory _productId) public view returns (string[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].destinationReceived;
            }
        }
        revert("Product not found");
    }

    function getProductSetCount(string memory _productId) public view returns (uint256[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].setCount;
            }
        }
        revert("Product not found");
    }

    function getProductCopyofTotalCount(string memory _productId) public view returns (uint256) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].copyTotalCount;
            }
        }
        revert("Product not found");
    }

    function getRetailerId(string memory _productId) public view returns (string[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].retailers_id;
            }
        }
        revert("Product not found");
    }

    function getValidatedRetailerId(string memory _productId) public view returns (string[] memory) {
        for(uint i=0; i<items; i++) {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId)))) {
                return allProducts[i].validated_retailers_id;
            }
        }
        revert("Product not found");
    }


// Add similar getter functions for the other fields you want to retrieve

    
    function updateProduct(string memory _productId, string memory _location, uint256 _count, string memory retID) public{

       for(uint i=0; i<items; i++)
        {
            if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId))))
            {
                index= i;
                break;
            }
        }
        require(index<=items);
        
        for(uint i=0; i<allProducts[index].destinationDistributed.length; i++)
        {
            if(keccak256(abi.encodePacked((allProducts[index].destinationDistributed[i]))) == keccak256(abi.encodePacked((_location))))
            {
                index1= i;
                break;
            }
        }
        require(keccak256(abi.encodePacked((allProducts[index].retailers_id[index1]))) == keccak256(abi.encodePacked((retID))));
        require(index1<allProducts[index].destinationDistributed.length);
        require(allProducts[index].setCount[index1]==_count);
        allProducts[index].retailer.push(msg.sender);
        allProducts[index].destinationReceived.push(_location);
        allProducts[index].validated_retailers_id.push(retID);
        allProducts[index].retailer.push(msg.sender);
        //p.receivedCount[index1]=_count;   
    }

    // address public owner;
    // string public ipfsHash;

    // constructor(){
    //     ipfsHash="NoHashStoredYet";
    //     owner=msg.sender;
    // }

    // function changeHash(string memory newHash) public
    // {
    //     require(msg.sender==owner,"Not ALLOWED");
    //     ipfsHash=newHash;
    // }

    // function getHash() public view returns(string memory){
    //     return ipfsHash;
    // }


    // function mapHashToId(string memory id) public{
        
    //     for(uint i=0; i<items; i++)
    //     {
    //         if(keccak256(abi.encodePacked((allProducts[i].productId))) == keccak256(abi.encodePacked((_productId))))
    //         {
    //             index= i;
    //             break;
    //         }
    //     }

    //     string memory hashValue= getHash();
    //     allProducts[index].hash[id]=hashValue;
    //     hash[id]=hashValue;
    // }

}