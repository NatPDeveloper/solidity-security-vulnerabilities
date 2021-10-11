pragma solidity ^0.7.0;

interface Icallee {
    function returnMsgSender() external pure returns (address);
    function returnTxOrigin() external pure returns (address);
}