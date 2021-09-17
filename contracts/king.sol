pragma solidity ^0.5.2;

contract king {
    address payable king;
    uint public prize;

    constructor() public payable {
        king = msg.sender;
        prize = msg.value;
    }

    function becomeKing() external payable {
        require(msg.value > prize);
        king.transfer(prize);
        king = msg.sender;
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return king;
    }
}