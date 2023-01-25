// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string transactionDescription, uint256 timestamp, string receiverName);
  
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string transactionDescription;
        uint256 timestamp;
        string receiverName;
    }

    TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory transactionDescription, string memory receiverName) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, transactionDescription, block.timestamp, receiverName));

        emit Transfer(msg.sender, receiver, amount, transactionDescription, block.timestamp, receiverName);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}