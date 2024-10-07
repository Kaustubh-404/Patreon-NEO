// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Neotron {
    struct Coffee {
        address sender;
        string message;
        uint256 timestamp;
    }
    
    uint256 totalNeo;
    address payable owner;
    
    event NewNeo (address indexed sender, string message, uint256 timestamp);


    constructor() {
        owner = payable(msg.sender);
    }

    function NeotronX(
        string memory _message
    ) payable public{
        require(msg.value > 0, "must be greater than 0");

        totalNeo += 1;
        payable(owner).transfer(msg.value);

        emit NewNeo(msg.sender,_message, block.timestamp);

    }

    function gettotalNeo() public view returns(uint256){
        return totalNeo;
    }
}
