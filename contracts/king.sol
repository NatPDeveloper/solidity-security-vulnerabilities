pragma solidity ^0.7.0;

contract king {
    address payable kingAddress;
    uint public prize;

    constructor() public payable {
        kingAddress = payable(msg.sender);
        prize = msg.value;
    }

    function becomeKing() external payable {
        require(msg.value > prize);
        kingAddress.transfer(prize);
        kingAddress = payable(msg.sender);
        prize = msg.value;
    }

    function _king() public view returns (address) {
        return kingAddress;
    }
}