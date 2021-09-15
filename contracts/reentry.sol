pragma solidity ^0.5.2;

contract reentry {
    mapping (address => uint) public balanceOf;

    function withdraw(uint _value) public {
        if(balanceOf[msg.sender] >= _value) {
            msg.sender.call.value(_value)("");
            balanceOf[msg.sender] -= _value;
        }
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }
}