pragma solidity ^0.7.0;

contract underflow {
    mapping (address => uint) public balanceOf;

    function transfer(address _to, uint _value) public {
        require(balanceOf[msg.sender] - _value >= 0);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
    }
}