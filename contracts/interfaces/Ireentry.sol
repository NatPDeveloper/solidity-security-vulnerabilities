pragma solidity ^0.5.2;

interface Ireentry {
    function withdraw(
        uint _value
    ) external;

    function deposit() external payable;
}