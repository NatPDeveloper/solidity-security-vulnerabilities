const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Contract caller vulnerability", function() {
    this.timeout(100000);

    it("Should return msg.sender and tx.origin", async function() {
        // deploy callee
        let [caller, callee] = await ethers.getSigners();
        const calleeFactory = await ethers.getContractFactory("callee");
        const calleeContract = await calleeFactory.connect(callee).deploy();
        await calleeContract.deployed();

        // deploy caller
        const callerAttackerFactory = await ethers.getContractFactory("caller");
        const callerAttackerContract = await callerAttackerFactory.connect(caller).deploy(
            calleeContract.address
        );
        await callerAttackerContract.deployed();

        // expect msg.sender to be contract address and not caller
        expect((await callerAttackerContract.connect(caller).callMsgSender()).toString()).to.equal(callerAttackerContract.address);

        // expect tx.origin to be account that signed trx
        expect((await callerAttackerContract.connect(caller).callTxOrigin()).toString()).to.equal(caller.address);
    });
});