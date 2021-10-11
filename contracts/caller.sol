pragma solidity ^0.7.0;

import "./interfaces/Icallee.sol";

contract caller {
    Icallee public callee;
    constructor(address _callee) {
        callee = Icallee(_callee);
    }

    function callMsgSender() external view returns (address) {
        return callee.returnMsgSender();
    }

    function callTxOrigin() external view returns (address) {
        return callee.returnTxOrigin();
    }
}