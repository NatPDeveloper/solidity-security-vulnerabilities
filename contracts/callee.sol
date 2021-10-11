pragma solidity ^0.7.0;

contract callee {
    function returnMsgSender() external view returns (address) {
        return msg.sender;
    }

    // bad practice as tx.origin can be spoofed
    // https://ethereum.stackexchange.com/questions/28972/who-is-msg-sender-when-calling-a-contract-from-a-contract
    function returnTxOrigin() external view returns (address) {
        return tx.origin;
    }
}