pragma solidity ^0.7.0;

interface Ireentry {
    function withdraw(
        uint _value
    ) external;

    function deposit() external payable;
}